## To get project running

```sql
CREATE TABLE "users" (
	"id" serial primary key,
	"username" varchar(50) not null,
	"password" varchar (120) not null
);

CREATE TABLE "profile" (
	"id" serial primary key,
  "current_week" date,
	"current_day" date,
	 "trips_this_week" integer DEFAULT 0,
	 "avg_trip" integer DEFAULT 0,
	 "goal_date" date,
	  "total_cravings" integer DEFAULT 0,
	  "user_id" integer,
	 "week_trips" integer DEFAULT 0,
	 "motivation" text,
	 "start_date" date,
	 "completed_registration" boolean DEFAULT FALSE
);

CREATE TABLE "cravings" (
	"id" serial primary key,
	"user_id" integer REFERENCES "users",
	"strength_of_desire" integer,
	"location" varchar (200),
	"notes" varchar (500),
	"date" date
);
```
