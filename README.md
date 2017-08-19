# carFree --

One Paragraph of project description goes here. Link to the live version of the app if it's hosted on Heroku.

## Built With

CSS3
HTML5
AngularJS
Angular Material (mdDialog, mdSideNav, mdToast, mdIcons)
PostgreSQL
Express
Node.js
Passport

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- npm install --save


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

[Original scope] document.(https://docs.google.com/document/d/10Wff1AJMEjwTdhBk4UB5Cv-XMMN9Q2u2USDkaogekW4/edit?usp=sharing) -- Note current app has evolved significantly from initial plan.


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

* [Smoke Free app] (https://smokefreeapp.com/) -- beautiful quite smoking app, inspired much of the design and functionality of carFree.
* Prime Digital Academy and my fantastic Antares cohort, thanks for teaching me to see and create the Matrix.
* [AAA Report] (https://www.usatoday.com/story/news/nation/2013/04/16/aaa-car-ownership-costs/2070397/) -- Avg cost of car ownership
