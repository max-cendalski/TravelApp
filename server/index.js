require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const ClientError = require('./client-error');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "password")
        values ($1, $2)
        returning *
    `;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const { userId, username, createdAt } = result.rows[0];
          res.status(201).json({ userId, username, createdAt });
        })
        .catch(err => next(err));
    });
});
app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "password"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  return db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!username) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, password: hashedPassword } = user;
      argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/api/countries/:country', (req, res, next) => {
  const country = req.params.country;
  if (!country) {
    throw new ClientError(401, 'invalid input');
  }
  const sql = `
  select "m"."name" as "cityName",
         "c"."name" as "countryName",
         "t"."mainPhotoUrl",
         "u"."username",
         "t"."tripId"
    from "cities" as "m"
    join "countries" as "c" using ("countryId")
    join "trips" as "t" using ("cityId")
    join "users" as "u" using ("userId")
   where "c"."name" = $1
  `;
  const params = [country];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/trips/:tripId', (req, res, next) => {
  const trip = req.params.tripId;
  if (!trip) {
    throw new ClientError(401, 'invalid tripId');
  }
  const sql = `
  select "userId",
         "cityId",
         "mainPhotoUrl",
         "review",
         "thingsTodoScore",
         "foodScore",
         "peopleScore",
         "transportScore",
         "safetyScore",
         "t"."name" as "countryName",
         "c"."name" as "cityName",
         "u"."username"
    from "trips"
    join "cities" as "c" using ("cityId")
    join "countries" as "t" using ("countryId")
    join "users" as "u" using ("userId")
   where "tripId" = $1
  `;
  const params = [trip];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/trips', (req, res, next) => {
  const { country, city, review } = req.body;
  const sql = `
  insert into "countries" ("name")
      values ($1)
      returning "countryId"
  `;
  const params = [country];
  db.query(sql, params)
    .then(result => {
      const countryId = result.rows[0].countryId;
      const sql1 = `
                insert into "cities" ("name","countryId")
                values ($1,$2)
                returning "cityId"
              `;
      const params1 = [city, countryId];
      return db.query(sql1, params1)
        .then(result => {
          const cityId = result.rows[0].cityId;
          const sql2 = `
          insert into "trips" ("userId","cityId","review")
              values ($1,$2,$3)
              returning *
          `;
          const params2 = [req.user.userId, cityId, review];
          return db.query(sql2, params2)
            .then(result => {
              const [review] = result.rows;

              res.status(201).json({ review });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({
                error: 'an unexpected error occurred'
              });
            });
        });
    });
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
