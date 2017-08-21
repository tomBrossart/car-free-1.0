# carFree

carFree is a full-stack mobile web application to support people who choose to live carFree by helping them track/visualize their experience. It provides the user with a dashboard showing a variety of data to help them stay connected to the progress, including: their total time carFree, the money they’ve saved, as well as modules to help the user Track/Analyze their cravings and Save up for a Purchase.

Link to [carFree page](https://carfreeapp.herokuapp.com/#/home)

## Built With

- CSS3
- HTML5
- AngularJS
- Angular Material (mdDialog, mdSideNav, mdToast, mdIcons)
- PostgreSQL
- Express
- Node.js
- Heroku for web deployment
- Passport for user authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Angular Material](https://material.angularjs.org/latest/)
- [Material Icons](https://fonts.googleapis.com/icon?family=Material+Icons)



### Installing

- npm install --save angular, angular-animate, angular-aria, angular-material, angular-messages, angular-material-icons, angular-route, bcrypt, body-parser, express, passport, passport-local

Steps to get the development environment running.

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

## Screen Shot
carFree Dashboard:
![carFree Dashboard](https://github.com/tomBrossart/car-free-1.0/blob/master/server/public/images/carFree_dash.png?raw=true)
![carFree Motivation Page](https://github.com/tomBrossart/car-free-1.0/blob/master/server/public/images/carFree_motivation.png?raw=true)
![carFree Resources](https://github.com/tomBrossart/car-free-1.0/blob/master/server/public/images/carFree_resources.png?raw=true)

## Documentation

[Original scope document](https://docs.google.com/document/d/10Wff1AJMEjwTdhBk4UB5Cv-XMMN9Q2u2USDkaogekW4/edit?usp=sharing) -- Note current app has evolved significantly from initial plan.


### Completed Features

High level list of items completed.

- [x] Login and Register with Passport
- [x] Build Profile feature - Post/Put routes
- [x] Dashboard page dispalying calculations extrapolating from data captured during Build Profile
- [x] Add cravings feature -- mdDialog
- [x] Update/Delete cravings feature -- mdDialog
- [x] CRUD routes wiring from client to server
- [x] multi-table SQL data model created and implemented
- [x] Stay motivated page with Material Grid
- [x] Added mvp for Resources Page, Account Page, and About carFree
- [x] Added mdSideNav as main navigation

### Next Steps

- [ ] Add "Save Up" feature
- [ ] Finish adding "Edit" and "Delete" for account and resources
- [ ] Improve validation during buildProfile process
- [ ] Improve social sharing features throughout app
- [ ]  Add analyze cravings feature to allow users to drill down on patterns
- [ ] Create a tab with missions (both fun and pragmatic) to complete as part of the carFree experience
- [ ]  Refine UX and Deploy app to app stores via Ionic


## Deployment

This app is not currently being updated or supported but I will get back to any questions or feedback as quick as I can.

## Authors

* Tom Brossart


## Acknowledgments

* [Smoke Free app](https://smokefreeapp.com/) -- beautiful quite smoking app, inspired much of the design and functionality of carFree.
* Prime Digital Academy and my fantastic Antares cohort, thanks for teaching me to see and create the Matrix.
* [AAA Report](https://www.usatoday.com/story/news/nation/2013/04/16/aaa-car-ownership-costs/2070397/) -- Avg cost of car ownership
