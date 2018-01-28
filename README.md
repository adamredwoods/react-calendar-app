# Summary
 A full-stack MERN Calendar App

# Demo

TBD

# Live Site

TBD

# Technologies Used
* Mongodb
* Express
* React
* Node.js
* [React Flexbox Grid](https://roylee0704.github.io/react-flexbox-grid/)
* [Cloudinary](https://cloudinary.com/)
* [Material UI](http://www.material-ui.com/#/)
* [Unsplash](https://unsplash.com/)
* [FontAwesome](http://fontawesome.io/)

# React Components
* Home
* Profile

# Backend Routes
METHOD | URL | Purpose
--- | --- | ---
POST | /auth/signup | Adds new user to user database
POST | /auth/login | Authenticates login details
POST | /auth/me/from/token | Checks if token is present on browser refresh

# Frontend Routes
METHOD | URL | Purpose
--- | --- | ---


# Next Steps
* TBD

# Getting Started
* Fork and clone this repository
* Run `npm install` in both the parent folder and in the client folder to install dependencies
** Use nodemon to run the whole app (or npm start from the client folder for only the front end)
** Create a .env file in the parent directory with: 
*** JWT_SECRET for authentification
*** API keys