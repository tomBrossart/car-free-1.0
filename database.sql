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
