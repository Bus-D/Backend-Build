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
- [ ] create database
- [ ] create users table
- [ ] set up databse file (config/db.js)
- [ ] test db connection

## Session Configuration
- [ ] configure 'express-session'
- [ ] store sessions in PostgreSQL 'connect-pg-simple'
- [ ] set secure cookies
- [ ] test sessions persistence

## Authentication System
### Registration (client only) 
- [ ] create register route
- [ ] hash password with bcrypt
- [ ] store new clinet in database
- [ ] prevent duplicate email registration
- [ ] redirect after success

### Login
- [ ] create login route
- [ ] validate credentials
- [ ] compare password hash
- [ ] make sure password is deleted
- [ ] store user ID + role in session
- [ ] redirect based on role

### Logout
- [ ] destroy session
- [ ] redirect to home/login

## Middleware
- [ ] requireAuth
    - blocks unauthenticated users
- [ ] requireAdmin
    - Allows only admin role
- [ ] attach logged-in user to req.user
- [ ] add global error handler

## Basic Dashboards
- [ ] create admin dashboard route + view
- [ ] create client dashboard route + view
- [ ] role-base redirect

## Later tasks
- [ ] add validation to contact form
- [ ] update all img tags to work
- [ ]