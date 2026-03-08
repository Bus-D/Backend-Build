# Project State Document

## Bus-D Designs Backend Build

**Client Project Portal / Freelance Client Dashboard**

---

# 1. Purpose of This Project

This project is a **full-stack backend-focused application** designed to manage freelance client projects and provide a secure portal where clients can track project progress.

The primary goals are:

* Build a **real-world backend architecture**
* Practice **Node.js, Express, and PostgreSQL**
* Implement **authentication, sessions, and role-based access**
* Provide a **client-facing dashboard** where clients can see project updates
* Serve as a **portfolio-quality backend system**

This project is intentionally designed to mimic the type of system a freelance developer or small agency might use to manage client work.

---

# 2. Core Concept

The system allows an **admin (developer)** to manage projects and provide **clients access to view progress**.

Clients can log in and see:

* Their projects
* Progress updates
* Milestones
* Comments and discussions
* Approval requests

The developer/admin can:

* Create and manage projects
* Post updates
* Assign milestones
* Request approvals
* Manage client access

---

# 3. Technology Stack

## Backend

* Node.js
* Express.js
* PostgreSQL

## Database Access

* `pg` (PostgreSQL driver)

## Sessions & Authentication

* `express-session`
* `connect-pg-simple` (PostgreSQL session store)

## Template Engine

* EJS

## Environment Configuration

* dotenv

---

# 4. Architecture Style

The application follows an **MVC-inspired architecture**.

```
project-root
│
├── server.js
├── package.json
│
├── src
│   ├── controllers
│   ├── models
│   ├── middleware
│   ├── utils
│   └── views
│
├── public
│
└── sql
    ├── schema.sql
    └── seed.sql
```

### Responsibilities

**Models**

* Database access
* SQL queries
* Data operations

**Controllers**

* Route logic
* Request/response handling

**Middleware**

* Authentication
* Global helpers
* Flash messages
* Validation

**Views**

* EJS templates
* UI rendering

---

# 5. Database Structure

The database models a **freelance project management system**.

## Core Tables

### users

Stores system users.

Roles:

* `admin`
* `client`

Fields include:

* name
* email
* password_hash
* role
* active status
* timestamps

---

### projects

Represents projects managed by the developer.

Fields include:

* name
* description
* status
* progress tracking
* deadline
* timestamps

---

### project_users

Join table linking users to projects.

Purpose:

* Assign clients to projects
* Define permission levels

Permissions:

* `viewer`
* `approver`

---

### milestones

Represents project milestones.

Used to break projects into progress steps.

Fields include:

* title
* description
* order_index
* completion status

---

### updates

Progress updates posted by the developer.

Updates can:

* reference a milestone
* require client approval
* include comments

Approval statuses:

* `pending`
* `approved`
* `rejected`

---

### comments

Discussion comments attached to updates.

Used for:

* client feedback
* clarification
* approval discussions

---

### contact_messages

Stores messages from the portfolio contact form.

Purpose:

* Capture inquiries
* Track potential clients

---

# 6. Key Features

## Authentication

* Login system
* Password hashing
* Session-based authentication

## Role-Based Access

### Admin

* Manage projects
* Create updates
* Assign milestones
* Manage clients

### Client

* View assigned projects
* Comment on updates
* Approve updates when required

---

# 7. Client Dashboard

Clients can view:

* Project progress
* Milestone completion
* Update history
* Approval requests
* Comment threads

---

# 8. Admin Tools

Admin users can:

* Create projects
* Assign clients to projects
* Create milestones
* Post project updates
* Request client approvals

---

# 9. Session Management

Sessions are stored in PostgreSQL using:

`connect-pg-simple`

Session cookies are configured with:

* `httpOnly`
* `secure` in production
* 24-hour expiration

---

# 10. Database Initialization

The project includes an automated setup process.

On server startup:

1. Test database connection
2. Check if core tables exist
3. If not, run `schema.sql`
4. Optionally run `seed.sql`

This ensures the project can initialize automatically in new environments.

---

# 11. Development Goals

This project is intended to demonstrate:

* Backend architecture design
* Database modeling
* Secure authentication systems
* Session management
* MVC-style project structure
* Production-style organization

The focus is **backend engineering**, not complex UI design.

---

# 12. Development Philosophy

This project is being built with the following goals:

## 1. Learn Real Backend Architecture

Not just small tutorials.

The project aims to simulate real backend structure used in production systems.

---

## 2. Build Something Portfolio-Ready

The goal is to demonstrate:

* Clean architecture
* Thoughtful database design
* Secure authentication
* Maintainable structure

---

## 3. Avoid Overengineering

The system should remain:

* Understandable
* Maintainable
* Realistic for a solo developer

---

# 13. Future Expansion Ideas

Potential improvements include:

### File Uploads

Allow clients to download deliverables.

### Notifications

Email notifications for updates or approvals.

### Activity Logs

Track project activity history.

### Real-Time Updates

WebSocket-based live update feeds.

### Admin Dashboard Analytics

Project statistics and summaries.

---

# 14. Intended Outcome

The final result should be a **working backend application** where:

* Admin manages projects
* Clients log in to view progress
* Updates and milestones track work
* Clients can comment and approve deliverables

This project serves both as:

* a **portfolio project**
* a **learning platform for backend development**

---

# 15. Purpose of This Document

This document exists to:

* Provide **clear project context**
* Avoid repeatedly explaining the system
* Maintain **consistent understanding across discussions**

When starting new conversations about this project, this document can be shared to ensure:

* The architecture is understood
* The goals are clear
* Suggestions stay aligned with the intended system

---

**End of State Document**
