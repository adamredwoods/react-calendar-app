# Calendar App

## Summary
 A full-stack MERN Calendar App

## Live Site
TBD

## Technical Requirements
* MERN App (front end and backend, using MongoDB, React, and Node.js)
* CRUD functionality
* Implement thoughtful user stories
* Have a visually impressive design
* Be deployed online so it's publicly accessible
* A `readme.md` file with:
    * A screenshot of the site
    * Explanations of the technologies used
    * Explanation of general approach you took
    * Installation instructions for any dependencies
    * Link to your user stories – who are your users, what do they want, and why?
    * Link to your wireframes – sketches of major views / interfaces in your application
    * Descriptions of any unsolved problems or major hurdles your team had to overcome

## User Stories
* When I look at my calendar, I want to be able to see not only if I have events on a particular day but also how many events I have that day. For easier visiblity, I want to be able to assign colors to my events and have those colors show up on the month view. I'd also like to be able to see a snapshot of my day or week (the ability to choose) below my monthly view so that I can see general AND more specific. 
* I have multiple day events and I don't want to have multiple, single dots denoting singular events. Rather, I'd like multiple day events to be denoted by a line or something continuous so that I know that what I see on my calendar is longer than a day rather than a single-day event. 

## Our Process
### Sprint 1:
![Trello Board](/public/images/sprint-1.png)
* We started by trello-boarding, working on wireframes for the different views, and discussing user stories/what we wanted in terms of functionality.

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