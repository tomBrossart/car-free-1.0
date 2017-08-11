## To get project running

CREATE TABLE "users" (
	"id" serial primary key,
	"username" varchar(50) not null,
	"password" varchar (120) not null,
     "start_date" date,
	"current_usage" integer,
	 "current_need" varchar(80),
	 "motivation" varchar(80),
	 "goal_date" date,
	 "goal_usage" integer,
   "last_login" date
);

-- VERIFY ALL UPDATES ARE IN HERE
CREATE TABLE "usage" (
	"id" serial primary key,
     "current_week" date,
	"current_day" date,
	 "trips_this_week" integer,
	 "total_trips" integer,
	 "goal_trips_this_week" integer,
	 "goal_date" date,
	 "cravings_this_week" integer
);

CREATE TABLE "motivation" (
	"id" serial primary key,
	"img" varchar (120),
	"msg" varchar (120),
);

INSERT INTO "motivation" ("img", "msg")
VALUES ('http://lorempixel.com/400/200', 'Keep going!');


----------EVERYTHING AS OF 08/11---------------

CREATE TABLE "users" (
	"id" serial primary key,
	"username" varchar(50) not null,
	"password" varchar (120) not null,
     "start_date" date,
	"current_usage" integer,
	 "current_need" varchar(80),
	 "motivation" varchar(80),
	 "goal_date" date,
	 "goal_usage" integer
);

CREATE TABLE "usage" (
	"id" serial primary key,
     "current_week" date,
	"current_day" date,
	 "trips_this_week" integer,
	 "total_trips" integer,
	 "goal_trips_this_week" integer,
	 "goal_date" date,
	 "cravings_this_week" integer
);

UPDATE "usage"
SET total_trips = total_trips + 1,
trips_this_week = trips_this_week + 1
WHERE id = 1;

INSERT INTO "usage" ("trips_this_week", "total_trips")
VALUES (5, 10);

UPDATE usage SET total_trips = total_trips + 1, trips_this_week = trips_this_week + 1 WHERE user_id = 2 RETURNING *;

CREATE TABLE "motivation" (
	"id" serial primary key,
	"img" varchar (120),
	"msg" varchar (200)
);

INSERT INTO "motivation" ("img", "msg")
VALUES ('http://lorempixel.com/400/200', 'Keep going!');

SELECT "msg", "img" FROM motivation JOIN users
ON "users"."motivation" = "motivation"."selection"
WHERE "users"."id" = 2;



SELECT completed_registration FROM users WHERE id = 2;

UPDATE "usage" SET "current_usage" = $1, "core_need" = $2  WHERE user_id = $3;

INSERT INTO "profile" ("user_id", "motivation", "start_date") VALUES (2, 'test', '01/02/0303');
