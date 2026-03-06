# Project TODO

## Week 1 - Setup
- [X] Initialize Project
- [X] Install dependencies
    - [X] express
    - [X] ejs
    - [X] pg
    - [X] bcrypt
    - [X] express-session
    - [X] connect-pg simple
    - [X] dotenv
- [X] Create /src folder strucure
    - [X] model/
    - [X] controller/
    - [X] view/
        ### replace html files with ejs files
        - [X] home
        - [X] about
        - [X] contact
            Will need to add validation to form
        - [X] thank-you
        - [X] services
            Will need to update services to be in line with furthered niche ideas
        - [ ] project/
            - [ ] list
            - [ ] detail
        ### partials
        - [X] add header
        - [X] add footer
    - [X] middleware/
- [X] create server.js
- [X] set up basic express sever
- [X] configure EJS as view engine
- [X] set up static folder
- [X] add .env file
- [X] add .gitignore

## Database Setup
- [X] create database
- [X] create users table
- [X] create project table
- [X] set up databse file (db.js)
- [X] test db connection

## Session Configuration
- [X] configure 'express-session'
- [X] store sessions in PostgreSQL 'connect-pg-simple'
- [X] set secure cookies
- [ ] test sessions persistence

## Authentication System
### Registration (client only) 
- [X] create register route
- [X] hash password with bcrypt
- [X] store new clinet in database
- [X] prevent duplicate email registration
- [X] redirect after success

### Login
- [X] create login route
- [ ] validate credentials
- [ ] compare password hash
- [ ] make sure password is deleted
- [ ] store user ID + role in session
- [ ] redirect based on role

### Logout
- [ ] destroy session
- [ ] redirect to home/login

## Middleware
- [X] requireAuth
    - blocks unauthenticated users
- [X] requireAdmin
    - Allows only admin role
- [X] attach logged-in user to req.user
- [X] add global error handler

## Basic Dashboards
- [ ] create admin dashboard route + view
- [ ] create client dashboard route + view
- [ ] role-base redirect

## Later tasks
- [ ] add validation to contact form
- [ ] update all img tags to work
- [ ] refactor registration model for user/project based models