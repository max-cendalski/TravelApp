require("dotenv/config");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const AWS = require("aws-sdk");
const staticMiddleware = require("./static-middleware");
const pg = require("pg");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const express = require("express");
const errorMiddleware = require("./error-middleware");
const authorizationMiddleware = require("./authorization-middleware");
const uploadsMiddleware = require("./uploads-middleware");
const ClientError = require("./client-error");
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.get("/api/locations", (req, res, next) => {
  const sql = `
  select "country",
         "city"
    from "trips"
              `;
  db.query(sql)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.get("/api/images", (req, res, next) => {
  const sql = `
  select "mainPhotoUrl",
         "country",
         "city"
    from "trips"
         `;
  db.query(sql)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.post("/api/auth/sign-up", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, "username and password are required fields");
  }

  argon2.hash(password).then((hashedPassword) => {
    const sql = `
        insert into "users" ("username", "password")
        values ($1, $2)
        on conflict ("username") do nothing
        returning *
    `;
    const params = [username, hashedPassword];
    db.query(sql, params)
      .then((result) => {
        const { userId, username, createdAt } = result.rows[0];
        res.status(201).json({ userId, username, createdAt });
      })
      .catch((err) => next(err));
  });
});

app.post("/api/auth/sign-in", (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, "invalid login");
  }
  const sql = `
    select "userId",
           "password"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  return db
    .query(sql, params)
    .then((result) => {
      const [user] = result.rows;
      if (!username) {
        throw new ClientError(401, "invalid login");
      }
      const { userId, password: hashedPassword } = user;
      argon2
        .verify(hashedPassword, password)
        .then((isMatching) => {
          if (!isMatching) {
            throw new ClientError(401, "invalid login");
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

app.get("/api/countries/:country", (req, res, next) => {
  const country = req.params.country;
  if (!country) {
    throw new ClientError(401, "invalid input");
  }

  const sql = `
  select "city",
         "country",
         "tripId",
         "mainPhotoUrl",
         "u"."username"
    from "trips"
    join "users" as "u" using ("userId")
   where "country" = $1
  `;
  const params = [country];
  db.query(sql, params)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.get("/api/countries", (req, res, next) => {
  const sql = `
    select "country"
    from "trips"
  `;
  db.query(sql).then((result) => {
    res.json(result.rows);
  });
});

app.use(authorizationMiddleware);

app.get("/api/trips/:tripId", (req, res, next) => {
  const trip = Number(req.params.tripId);
  if (!trip) {
    throw new ClientError(401, "invalid tripId");
  }
  const sql = `
  select "city",
         "country",
         "mainPhotoUrl",
         "review",
         "thingsTodoScore",
         "foodScore",
         "peopleScore",
         "transportScore",
         "safetyScore",
         "created",
         "u"."username"
    from "trips"
    join "users" as "u" using ("userId")
   where "tripId" = $1
  `;
  const params = [trip];
  db.query(sql, params)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((err) => next(err));
});

app.get("/api/comments/:tripId", (req, res, next) => {
  const trip = Number(req.params.tripId);
  if (!trip) {
    throw new ClientError(401, "invalid tripId");
  }
  const sql = `
  select "commentId",
         "content",
         "u"."username"
    from "comments"
    join "users" as "u" using ("userId")
   where "tripId" = $1
  `;
  const params = [trip];
  db.query(sql, params)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.post("/api/trips", uploadsMiddleware, (req, res, next) => {
  const {
    country,
    city,
    review,
    thingsTodoScore,
    foodScore,
    peopleScore,
    transportScore,
    safetyScore,
    created
  } = req.body;
  const image = req.file.location;
  const sql = `
  insert into "trips"
            (
             "userId",
              "country",
              "city",
              "mainPhotoUrl",
              "review",
              "thingsTodoScore",
              "foodScore",
              "peopleScore",
              "transportScore",
              "safetyScore",
              "created"
            )
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            returning *
            `;
  const params = [
    req.user.userId,
    country,
    city,
    image,
    review,
    thingsTodoScore,
    foodScore,
    peopleScore,
    transportScore,
    safetyScore,
    created
  ];
  return db
    .query(sql, params)
    .then((result) => {
      const [review] = result.rows;
      res.status(201).json({ review });
    })
    .catch((err) => next(err));
});

app.post("/api/trips/comments/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { userId } = req.user;
  if (!Number.isInteger(tripId) || tripId < 1) {
    res.status(400).json({
      error: "tripId must be a positive integer",
    });
    return;
  }
  const { content } = req.body;
  if (!content) {
    res.status(400).json({
      error: "missing content",
    });
    return;
  }
  const sql = `
  insert into "comments"
            (
              "content",
              "userId",
              "tripId"
            )
            values ($1,$2,$3)
            returning *
            `;
  const params = [content, userId, tripId];
  return db
    .query(sql, params)
    .then((result) => {
      const [comment] = result.rows;
      res.status(201).json({ comment });
    })
    .catch((err) => next(err));
});

app.post("/api/trips/score/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { userId } = req.user;
  if (!Number.isInteger(tripId) || tripId < 1) {
    res.status(400).json({
      error: "tripId must be a positive number",
    });
    return;
  }
  const { score } = req.body;
  if (!score) {
    res.status(400).json({
      error: "missing score",
    });
    return;
  }
  const sql = `
  insert into "tripScores"
            (
              "score",
              "userId",
              "tripId"
            )
            values ($1,$2,$3)
            returning *
  `;
  const params = [score, userId, tripId];
  return db
    .query(sql, params)
    .then((result) => {
      const [score] = result.rows;
      res.status(201).json({ score });
    })
    .catch((err) => next(err));
});

app.get("/api/trips/score/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId < 1) {
    res.status(400).json({
      error: "tripId must be a positive number",
    });
    return;
  }
  const sql = `
  select  *
    from "tripScores"
   where "tripId" = $1
  `;
  const params = [tripId];
  db.query(sql, params)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.patch("/api/edit/trip/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { userId } = req.user;
  if (!Number.isInteger(tripId) || tripId < 1) {
    res.status(400).json({
      error: "tripId must be a positive integer",
    });
    return;
  }
  const {
    city,
    review,
    thingsTodoScore,
    foodScore,
    peopleScore,
    transportScore,
    safetyScore
  } = req.body;
  if (
    !city ||
    !review ||
    !thingsTodoScore ||
    !foodScore ||
    !peopleScore ||
    !transportScore ||
    !safetyScore
  ) {
    res.status(400).json({
      error: "missing data",
    });
    return;
  }
  const sql = `
  update "trips"
     set "city" = $1,
         "review" = $2,
         "thingsTodoScore" = $3,
         "foodScore" = $4,
         "peopleScore" = $5,
         "transportScore" = $6,
         "safetyScore" = $7
   where "tripId" = $8 AND "userId" = $9
   returning *
  `;
  const params = [
    city,
    review,
    thingsTodoScore,
    foodScore,
    peopleScore,
    transportScore,
    safetyScore,
    tripId,
    userId
  ];
  db.query(sql, params)
    .then((result) => {
      const [updatedTrip] = result.rows;
      if (!updatedTrip) {
        res.status(404).json({
          error: `Cannot find trip with id: ${tripId}`,
        });
      } else {
        res.json(updatedTrip);
      }
    })
    .catch((err) => next(err));
});

app.get("/api/my-reviews", (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, "invalid userId");
  }
  const sql = `
    select  "tripId",
            "city",
            "country",
            "mainPhotoUrl",
            "review",
            "thingsTodoScore",
            "foodScore",
            "peopleScore",
            "transportScore",
            "safetyScore",
            "created",
            "u"."username"
        from "trips"
        join "users" as "u" using ("userId")
      where "userId" = $1
      `;
  const params = [userId];
  db.query(sql, params)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => next(err));
});

app.delete("/api/my-reviews/:tripId/:fileToRemove", (req, res, next) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_S3_BUCKET,
  });
  const tripId = Number(req.params.tripId);
  const fileToRemove = req.params.fileToRemove;

  (function deleteFile() {
    s3.deleteObject(
      { Bucket: "travelappmaxcenbucket", Key: fileToRemove },
      (err, data) => {
        console.error("Error: ", err);
      }
    );
  })();

  if (!Number.isInteger(tripId) || tripId <= 0) {
    res.status(400).json({ error: "tripId must be positive integer" });
    return;
  }
  const sql = `
    DELETE from "trips"
    WHERE "tripId" = $1
    `;
  const params = [tripId];
  db.query(sql, params).then((result) => {
    const trip = result.rows[0];
    if (!trip) {
      res.status(404).json({
        error: `Cannot find trip with that Id ${tripId}`,
      });
    } else {
      res.status(204).send("success");
    }
  });
});

app.delete("/api/trips/:commentId", (req, res, next) => {
  const commentId = Number(req.params.commentId);
  if (!Number.isInteger(commentId) || commentId <= 0) {
    res.status(400).json({ error: "commentId must be positive integer" });
    return;
  }
  const sql = `
    DELETE from "comments"
    WHERE "commentId" = $1
    `;
  const params = [commentId];
  db.query(sql, params).then((result) => {
    const [comment] = result.rows;
    if (!comment) {
      res.status(404).json({
        error: `Cannot find comment with that id ${commentId}`,
      });
    } else {
      res.status(204).send("success");
    }
  });
});

app.use(errorMiddleware);
