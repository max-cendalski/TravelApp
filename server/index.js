require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
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
app.use(errorMiddleware);

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
          const [newUser] = result.rows;
          res.status(201).json({ newUser });
        })
        .catch(err => next(err));
    });

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
