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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

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
         "c"."name" as "countryName",
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

app.post('/api/trips', uploadsMiddleware, (req, res, next) => {
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
  const url = '/images/' + req.file.filename;
  const sql = `
              insert into "trips" ("countryId","userId","cityName","mainPhotoUrl","review","thingsTodoScore","foodScore","peopleScore","transportScore","safetyScore")
              values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
              returning *
              `;
  const params = [countryId, req.user.userId, city, url, review, thingsTodoScore, foodScore, peopleScore, transportScore, safetyScore];
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

app.put('/api/reviews/:tripId', (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { userId } = req.user;
  if (!Number.isInteger(tripId) || tripId < 1) {
    res.status(400).json({
      error: 'tripId must be a positive integer'
    });
    return;
  }
  const { review, thingsTodoScore, foodScore, peopleScore, transportScore, safetyScore } = req.body;
  if (!review || !thingsTodoScore || !foodScore || !peopleScore || !transportScore || !safetyScore) {
    res.status(400).json({
      error: 'All fields are required'
    });
    return;
  }
  const sql = `
  update "trips"
     set "review" = $1,
         "thingsTodoScore" = $2,
         "foodScore" = $3,
         "peopleScore" = $4,
         "transportScore" = $5,
         "safetyScore" = $6
   where "tripId" = $7 AND "userId" = $8
   returning *
  `;
  const params = [review, thingsTodoScore, foodScore, peopleScore, transportScore, safetyScore, tripId, userId];
  db.query(sql, params)
    .then(result => {
      const [updatedTrip] = result.rows;
      if (!updatedTrip) {
        res.status(404).json({
          error: `Cannot find trip with id: ${tripId}`
        });
      } else {
        res.json(updatedTrip);
      }
    })
    .catch(err => next(err));

});

app.get('/api/my-reviews', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid userId');
  }
  const sql = `
    select  "tripId",
            "cityName",
            "mainPhotoUrl",
            "review",
            "thingsTodoScore",
            "foodScore",
            "peopleScore",
            "transportScore",
            "safetyScore",
            "c"."name" as "countryName",
            "u"."username"
        from "trips"
        join "countries" as "c" using ("countryId")
        join "users" as "u" using ("userId")
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
