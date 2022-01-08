require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');
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
  select "cityName",
         "tripId",
         "mainPhotoUrl",
         "u"."username",
         "c"."name" as "countryName"
    from "trips"
    join "countries" as "c" using ("countryId")
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

app.get('/api/countries', (req, res, next) => {
  const sql = `
    select *
    from "countries"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/trips/:tripId', (req, res, next) => {
  const trip = req.params.tripId;
  if (!trip) {
    throw new ClientError(401, 'invalid tripId');
  }
  const sql = `
  select "userId",
         "cityName",
         "mainPhotoUrl",
         "review",
         "thingsTodoScore",
         "foodScore",
         "peopleScore",
         "transportScore",
         "safetyScore",
         "c"."name",
         "u"."username"
    from "trips"
    join "countries" as "c" using ("countryId")
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
  const {
    countryId,
    city,
    review,
    thingsTodoScore,
    foodScore,
    peopleScore,
    transportScore,
    safetyScore
  } = req.body;
  const sql = `
              insert into "trips" ("countryId","userId","cityName","review","thingsTodoScore","foodScore","peopleScore","transportScore","safetyScore")
              values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
              returning *
              `;
  const params = [countryId, req.user.userId, city, review, thingsTodoScore, foodScore, peopleScore, transportScore, safetyScore];
  return db.query(sql, params)
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

app.post('/api/uploads', uploadsMiddleware, (req, res, next) => {
  const { caption } = req.body;
  if (!caption) {
    throw new ClientError(400, 'caption is a required field');
  }
  const url = '/images' + req.file.filename;
  const sql = `
    insert into "images" ("caption", "url")
    values ($1, $2)
    returning *
  `;
  const params = [caption, url];
  db.query(sql, params)
    .then(result => {
      const [image] = result.rows;
      res.status(201).json(image);
    })
    .catch(err => console.error(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
