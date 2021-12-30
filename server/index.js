require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const express = require('express');
const errorMiddleware = require('./error-middleware');

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

app.get('/api/countries/', (req, res, next) => {
  const { country } = req.body;
  if (!trips) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  select "mainPhotoUrl",
         "cityId",
         "c"."name" as "cityName,
         "co"."name" as "countryName"
    from "trips"
    join "cities" as "c" using ("cityId")
    join "countries" as "co" using ("countryId")
   where "co"."name" = '$1
  `;

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
