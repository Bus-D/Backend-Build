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
- [X] validate credentials
- [X] compare password hash
- [X] make sure password is deleted
- [X] store user ID + role in session
- [X] redirect based on role

### Logout
- [X] destroy session
- [X] redirect to home/login

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

---

## Week 2 - Dashboards & Project Views

### Bug Fixes
- [ ] Fix `requireRole` logic error in `auth.js` (missing `!` before `req.session.user`)
- [ ] Fix `requireAdmin` logic error in `auth.js` (`&&` -> `||`) and add missing `next()` call
- [ ] Fix admin routes in `routes.js` - `requireAdmin` is a factory but called without invoking it
- [ ] Fix `requireRole` call on `/dashboard` route - missing role argument
- [ ] Fix `dashboardController.js` import path (`../../models/projects.js` does not exist)

### Admin Dashboard
- [ ] Create `src/views/admin/` directory and `dashboard.ejs` view
- [ ] Wire `/admin` route to `dashboardController.showDashboard`
- [ ] Complete `showClients` handler in `dashboardController.js`
- [ ] Write admin dashboard model queries in `dashboardModel.js` (currently empty)
    - [ ] get all projects with status summary
    - [ ] get all clients / users

### Client Dashboard
- [ ] Add `/client` route in `routes.js` with `requireLogin`
- [ ] Create client dashboard controller
- [ ] Create `src/views/client/dashboard.ejs` view
- [ ] Write client dashboard model queries
    - [ ] get projects assigned to current user
    - [ ] get milestones by project
    - [ ] get updates by project

### Role-Based Redirect (Full Flow)
- [ ] Confirm `/admin` route renders view correctly after login
- [ ] Confirm `/client` route renders view correctly after login
- [ ] Mark off `role-base redirect` in Basic Dashboards above once both routes work

### Project Views
- [ ] Create `src/views/projects/list.ejs`
- [ ] Create `src/views/projects/detail.ejs`
- [ ] Add project list route + controller (client-facing)
- [ ] Add project detail route + controller (client-facing)

### Admin Project Management
- [ ] Create project routes: create, edit, delete
- [ ] Create milestone management routes + controllers
- [ ] Create update/progress-posting routes + controllers
- [ ] Create `src/views/admin/projects/` views (create, edit forms)

### Session & Validation
- [ ] Test session persistence across requests
- [ ] Add server-side validation to contact form (express-validator)
