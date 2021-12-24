set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"content" TEXT NOT NULL,
	"userId" int NOT NULL,
	"tripId" int NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."additionalPhotos" (
	"photoId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"tripId" int NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "additionalPhotos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."trips" (
	"tripId" serial NOT NULL,
	"userId" int NOT NULL,
	"cityId" int NOT NULL,
	"mainPhotoUrl" TEXT NOT NULL,
	"review" TEXT NOT NULL,
	"thingsTodoScore" int NOT NULL,
	"foodScore" int NOT NULL,
	"peopleScore" int NOT NULL,
	"transportScore" int NOT NULL,
	"safetyScore" int NOT NULL,
	"createdAt" timestamptz NOT NULL,
	CONSTRAINT "trips_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."countries" (
	"countryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "countries_pk" PRIMARY KEY ("countryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cities" (
	"cityId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"countryId" int NOT NULL,
	CONSTRAINT "cities_pk" PRIMARY KEY ("cityId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tripScores" (
	"userId" int NOT NULL,
	"tripId" int NOT NULL,
	"score" int NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("tripId") REFERENCES "trips"("tripId");

ALTER TABLE "additionalPhotos" ADD CONSTRAINT "additionalPhotos_fk0" FOREIGN KEY ("tripId") REFERENCES "trips"("tripId");

ALTER TABLE "trips" ADD CONSTRAINT "trips_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "trips" ADD CONSTRAINT "trips_fk1" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId");


ALTER TABLE "cities" ADD CONSTRAINT "cities_fk0" FOREIGN KEY ("countryId") REFERENCES "countries"("countryId");

ALTER TABLE "tripScores" ADD CONSTRAINT "tripScores_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "tripScores" ADD CONSTRAINT "tripScores_fk1" FOREIGN KEY ("tripId") REFERENCES "trips"("tripId");
