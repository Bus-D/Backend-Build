# Project TODO

## Week 1 - Setup
- [ ] Initialize Project
- [ ] Install dependencies
    - [ ] express
    - [ ] ejs
    - [ ] pg
    - [ ] bcrypt
    - [ ] express-session
    - [ ] connect-pg simple
    - [ ] dotenv
- [ ] Create /src folder strucure
    - [ ] model/
    - [ ] controller/
    - [ ] view/
        ### replace html files with ejs files
        - [X] home
        - [X] about
        - [X] contact
        - [X] thank-you
        - [ ] project/
            - [ ] list
            - [ ] detail
        ### partials
        - [X] add header
        - [X] add footer
    - [ ] middleware/
- [ ] create server.js
- [ ] set up basic express sever
- [ ] configure EJS as view engine
- [ ] set up static folder
- [ ] add .env file
- [ ] add .gitignore

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
    