set client_min_messages to warning;

-- `drop schema` INSTANTLY ERASES EVERYTHING.
/* drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
  "createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"content" TEXT NOT NULL,
	"userId" int NOT NULL,
	"tripId" int NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."additionalPhotos" (
	"photoId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"tripId" int NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "additionalPhotos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."trips" (
	"tripId" serial NOT NULL,
	"userId" int NOT NULL,
  "country" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"mainPhotoUrl" TEXT NOT NULL default 'url',
  "title" TEXT NOT NULL,
	"review" TEXT NOT NULL,
	"thingsTodoScore" int NOT NULL default 0,
	"foodScore" int NOT NULL default 0,
	"peopleScore" int NOT NULL default 0,
	"transportScore" int NOT NULL default 0,
	"safetyScore" int NOT NULL default 0,
	"created" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
  CONSTRAINT "trips_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);




CREATE TABLE "public"."tripScores" (
	"userId" int NOT NULL,
	"tripId" int NOT NULL,
	"score" int NOT NULL,
  CONSTRAINT "tripScores_fk0" FOREIGN KEY("tripId") REFERENCES "trips"("tripId") ON DELETE CASCADE,
  CONSTRAINT "tripScores_fk1" FOREIGN KEY("userId") REFERENCES "users"("userId") ON DELETE CASCADE
) WITH (
  OIDS=FALSE
);



ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE;
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("tripId") REFERENCES "trips"("tripId") ON DELETE CASCADE;

ALTER TABLE "trips" ADD CONSTRAINT "trips_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId"); */


/*ALTER TABLE "additionalPhotos" ADD CONSTRAINT "additionalPhotos_fk0" FOREIGN KEY ("tripId") REFERENCES "trips"("tripId")*/
