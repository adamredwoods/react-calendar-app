# Calendar App

## Summary
 A full-stack MERN Calendar App

## Live Site
TBD

## User Stories

## Our Process

## Technologies Used
* Mongodb
* Express
* React
* Node.js

## React Components
* Home
* Profile

## Backend Routes
METHOD | URL | Purpose
--- | --- | ---
POST | /auth/signup | Adds new user to user database
POST | /auth/login | Authenticates login details
POST | /auth/me/from/token | Checks if token is present on browser refresh

## Frontend Routes
METHOD | URL | Purpose
--- | --- | ---


## Next Steps
* TBD

## Getting Started
* Fork and clone this repository
* Run `npm install` in both the parent folder and in the client folder to install dependencies
    * Use nodemon to run the whole app (or npm start from the client folder for only the front end)
    * Create a .env file in the parent directory with: 
        * JWT_SECRET for authentification
        * API keys