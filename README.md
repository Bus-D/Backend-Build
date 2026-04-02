# Bus-D Designs Client Dashboard

A full-stack freelance project management and client portal built with Node.js, Express, PostgreSQL, and EJS. This application enables freelance designers and agencies to securely manage projects, track progress, request approvals, and communicate with clients through a role-based dashboard system.

**Author:** Brandon Garrett  
**Status:** Active Development  
**License:** ISC

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Routes & API](#routes--api)
- [Authentication & Authorization](#authentication--authorization)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## Overview

This is a **portfolio-quality backend application** designed to demonstrate real-world Node.js development practices. It serves as both a functional project management tool for freelancers and a showcase of modern backend architecture.

### Use Cases

**For Freelancers:**
- Securely manage multiple client projects in one place
- Track project progress with percentage completion
- Publish updates and request client approvals
- Organize work into milestones
- Maintain client communication through built-in comments

**For Clients:**
- Log in to view assigned projects
- Track real-time progress updates
- Approve or comment on project milestones
- Receive notifications for updates
- Access project case studies and deliverables

---

## Features

### ✅ Core Features (Implemented)

#### Authentication & Authorization
- **User Registration** - Client self-signup with email validation
- **Secure Login** - Password hashing with bcrypt, session-based authentication
- **Role-Based Access Control** - Admin and Client roles with distinct capabilities
- **Session Management** - PostgreSQL-backed session persistence
- **Logout** - Secure session termination

#### Admin Dashboard
- **Project Overview** - Stats dashboard showing total, active, and archived projects with average completion
- **Add Project Modal** - Create new projects with name, description, deadline, and client assignment
- **Add Case Study Modal** - Generate branded case study pages for projects
- **Project Table** - View all projects with status, progress, deadline, and case study indicators
- **Recent Clients** - Quick view of latest registered clients
- **Project Cards** - Visual project preview cards with progress bars

#### Client Dashboard
- **Project List** - View all assigned projects with status and progress
- **Progress Tracking** - Visual progress bars showing completion percentage
- **Deadline Visibility** - See project deadlines and milestones
- **Project Detail Navigation** - Access full project details and case studies

#### Project Management
- **Project Creation** - Admin can create projects with optional case study pages
- **Project Details** - Comprehensive project view with description, progress, deadline, and assigned users
- **Case Study Pages** - Auto-generated project case study pages with professional templates
- **User Assignment** - Link clients to projects with permission levels

#### User Interface
- **Shared Dashboard CSS** - Consistent, reusable styling for admin and client dashboards
- **Responsive Modals** - Modal forms for project and case study creation
- **Dynamic Forms** - Auto-populated fields with intelligent defaults
- **Flash Messages** - Real-time notifications for success/error states
- **Navigation** - Easy role-based navigation between dashboards

### 🔜 Planned Features

- Milestone creation and tracking
- Progress updates with approval workflow
- Comment system for client collaboration
- Notification system for updates
- Project archive functionality
- Advanced permissions management
- File upload/attachment support
- Project timeline/Gantt charts

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web application framework
- **PostgreSQL** - Relational database
- **EJS** (v4.0.1) - Server-side templating engine

### Database & Sessions
- **pg** (v8.19.0) - PostgreSQL client for Node.js
- **connect-pg-simple** (v10.0.0) - PostgreSQL session store
- **express-session** (v1.19.0) - Session middleware

### Security & Utilities
- **bcrypt** (v6.0.0) - Password hashing
- **dotenv** (v17.3.1) - Environment variable management
- **express-validator** (v7.3.1) - Input validation

### Development Tools
- **nodemon** (v3.1.14) - Auto-reload development server
- **pnpm** (v10.27.0) - Package manager
- **ws** (v8.19.0) - WebSocket support for dev hot-reload

---

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- pnpm (v10.27.0) or npm/yarn
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/bus-d-designs.git
cd Bus-D_Designs/BackEnd-Build
```

### Step 2: Install Dependencies

```bash
pnpm install
```

Or with npm:
```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### Step 4: Set Up Database

#### Create PostgreSQL Database

```bash
createdb bus_d_designs
```

Or using psql:
```bash
psql -U postgres
CREATE DATABASE bus_d_designs;
```

#### Initialize Schema

```bash
psql -U postgres -d bus_d_designs -f src/models/sql/schema.sql
```

To seed with example data:
```bash
psql -U postgres -d bus_d_designs -f src/models/sql/seed.sql
```

### Step 5: Verify Certificate (Production)

Place your PostgreSQL SSL certificate at:
```
bin/byuicse-psql-cert.pem
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Node Environment
NODE_ENV=development

# Database Connection
DB_URL=postgresql://username:password@localhost:5432/bus_d_designs

# Session Configuration
SESSION_SECRET=your_secret_key_here_at_least_32_characters

# Server
PORT=3000

# Development
ENABLE_SQL_LOGGING=true
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Execution environment | `development`, `production` |
| `DB_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost/db` |
| `SESSION_SECRET` | Secret for session encryption | Use `openssl rand -base64 32` |
| `PORT` | Server port | `3000` |
| `ENABLE_SQL_LOGGING` | Log SQL queries in dev mode | `true`, `false` |

---

## Running the Application

### Development Mode

Start with automatic reload on file changes:

```bash
pnpm dev
```

Server runs at `http://localhost:3000`

In development, a WebSocket server on port 3001 enables auto-refresh.

### Production Mode

```bash
pnpm start
```

### Testing Database Connection

```bash
node -e "import('./src/models/db.js').then(m => console.log('DB connection OK'))"
```

---

## Project Structure

```
.
├── server.js                          # Express app entry point
├── package.json                       # Dependencies and scripts
├── .env                              # Environment variables (not in git)
├── .gitignore                        # Git ignore rules
│
├── bin/                              # Binary files
│   └── byuicse-psql-cert.pem        # PostgreSQL SSL certificate
│
├── public/                           # Static assets (served as-is)
│   ├── css/
│   │   ├── base.css                 # Global styles, colors, typography
│   │   ├── layout.css               # Header, footer, main layout
│   │   ├── components.css           # Reusable component styles
│   │   ├── dashboard.css            # Admin/client dashboard styles
│   │   ├── home.css                 # Homepage-specific styles
│   │   ├── portfolio.css            # Portfolio page styles
│   │   ├── contact.css              # Contact form styles
│   │   ├── faq.css                  # FAQ page styles
│   │   └── main.css                 # CSS import manifest
│   ├── script/
│   │   ├── main.js                  # Global JavaScript (menu toggle, etc)
│   │   └── dashboard.js             # Dashboard modal behavior
│   ├── images/
│   │   ├── favicon/                 # Favicon files
│   │   ├── logo/                    # Logo images
│   │   └── portfolio/               # Portfolio project images
│
├── src/                              # Application source code
│   ├── controllers/                  # Route handlers
│   │   ├── index.js                 # Home and about page handlers
│   │   ├── routes.js                # All route definitions
│   │   ├── dashboard/
│   │   │   └── dashboard.js         # Dashboard controller
│   │   ├── forms/
│   │   │   ├── registration.js      # Registration flow
│   │   │   ├── login.js             # Login flow
│   │   │   └── contact.js           # Contact form
│   │   ├── projects/
│   │   │   └── project-details.js   # Project and case study handlers
│   │   └── client/                  # Client-specific handlers
│   │
│   ├── models/                       # Database access layer
│   │   ├── db.js                    # PostgreSQL connection pool
│   │   ├── setup.js                 # Database setup/migration
│   │   ├── sql/
│   │   │   ├── schema.sql           # Database schema
│   │   │   └── seed.sql             # Sample data
│   │   ├── authentication/
│   │   │   └── login.js             # Login queries
│   │   ├── projects/
│   │   │   ├── projectModels.js     # Project queries
│   │   │   ├── userModels.js        # User queries
│   │   │   ├── commentModel.js      # Comment queries
│   │   │   ├── updateModel.js       # Update queries
│   │   │   ├── milestoneModel.js    # Milestone queries
│   │   │   ├── dashboardModel.js    # Dashboard queries
│   │   │   └── data/
│   │   │       └── portfolio.json   # Portfolio data
│   │   └── contact/                 # Contact queries
│   │
│   ├── middleware/                   # Express middleware
│   │   ├── auth.js                  # Authentication/authorization
│   │   ├── global.js                # Global helpers (renderStyles, renderScripts)
│   │   └── flash.js                 # Flash message support
│   │
│   ├── utils/                        # Utility functions
│   │   └── session-cleanup.js       # Periodic session cleanup
│   │
│   └── views/                        # EJS templates
│       ├── partials/
│       │   ├── header.ejs           # Global header
│       │   └── footer.ejs           # Global footer
│       ├── home.ejs                 # Homepage
│       ├── about.ejs                # About page
│       ├── services.ejs             # Services page
│       ├── thank-you.ejs            # Thank you page
│       ├── admin/
│       │   └── dashboard.ejs        # Admin dashboard
│       ├── client/
│       │   └── dashboard.ejs        # Client dashboard
│       ├── forms/
│       │   ├── contact.ejs          # Contact form
│       │   ├── login.ejs            # Login form
│       │   └── register.ejs         # Registration form
│       ├── projects/
│       │   └── project-details.ejs  # Project detail view
│       ├── errors/
│       │   ├── 404.ejs              # 404 error page
│       │   └── 500.ejs              # 500 error page
│       └── legal/
│           └── privacy.html         # Privacy policy
│
└── README.md                         # This file
```

---

## Database Schema

### users
Stores system users (admins and clients)

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'client')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### projects
Represents freelance projects

```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    progress_mode VARCHAR(20) DEFAULT 'auto' CHECK (progress_mode IN ('auto', 'manual')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### project_users
Links clients to projects with permission levels

```sql
CREATE TABLE project_users (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    permission_level VARCHAR(20) NOT NULL CHECK (permission_level IN ('viewer', 'approver')),
    UNIQUE(project_id, user_id)
);
```

### milestones
Project milestones/phases

```sql
CREATE TABLE milestones (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### updates
Progress updates posted by admins

```sql
CREATE TABLE updates (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id INTEGER REFERENCES milestones(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    update_type VARCHAR(20) DEFAULT 'progress',
    body TEXT,
    requires_approval BOOLEAN DEFAULT false,
    approval_status VARCHAR(20) DEFAULT 'pending',
    approval_comment TEXT,
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP,
    created_by INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### comments
Client comments on updates

```sql
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    update_id INTEGER REFERENCES updates(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### contact_messages
Portfolio contact form submissions

```sql
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Routes & API

### Public Routes

| Method | Route | Description | View |
|--------|-------|-------------|------|
| GET | `/` | Homepage | `home.ejs` |
| GET | `/about` | About page | `about.ejs` |
| GET | `/register` | Registration form | `register.ejs` |
| POST | `/register` | Register new client | Redirect to `/login` |
| GET | `/login` | Login form | `login.ejs` |
| POST | `/login` | Authenticate user | Redirect to dashboard |
| GET | `/logout` | Destroy session | Redirect to `/` |

### Admin Routes

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/admin/dashboard` | Admin dashboard | Admin |
| POST | `/admin/projects/create` | Create new project | Admin |
| POST | `/admin/case-studies/create` | Generate case study page | Admin |
| GET | `/admin/users` | Manage users | Admin |
| GET | `/admin/projects` | View all projects | Admin |
| GET | `/admin/settings` | Admin settings | Admin |

### Client Routes

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/client/dashboard` | Client dashboard | Client |
| GET | `/projects/:id` | Project details | Login |
| GET | `/projects/case-study/:slug` | Case study page | Public |

---

## Authentication & Authorization

### User Roles

**Admin Role:**
- Create and manage projects
- Generate case study pages
- Manage clients and permissions
- Post updates
- Access admin dashboard

**Client Role:**
- View assigned projects
- View project details
- Access case studies
- View client dashboard

### Session Flow

```
1. User submits login form
   ↓
2. Password hashed and compared with database
   ↓
3. Session created and stored in PostgreSQL
   ↓
4. Session ID sent to client as secure cookie
   ↓
5. On each request, middleware validates session
   ↓
6. User's role checked against route requirements
   ↓
7. Access granted or denied
```

### Middleware

**`requireLogin`** - Ensures user is authenticated

**`requireRole(role)`** - Ensures user has specific role

Both block unauthorized access with flash message and redirect to login.

---

## Usage Guide

### For Admins

#### Creating a Project

1. Navigate to Admin Dashboard (`/admin/dashboard`)
2. Click "Add Project" button
3. Fill in project details:
   - **Project Name** (required)
   - **Deadline** (optional date picker)
   - **Description** (optional)
   - **Assign Client** (select from dropdown)
4. Click "Create Project"
5. Project appears in dashboard overview

#### Creating a Case Study Page

1. Click "Add Case Study" button on admin dashboard
2. Either:
   - Select existing project from dropdown, OR
   - Enter custom project name
3. Fill in case study details:
   - **URL Slug** (auto-generated from project name, customizable)
   - **Page Title** (optional)
   - **Summary** (required)
   - **Content** (optional)
4. Click "Create Case Study"
5. Page accessible at `/projects/case-study/{slug}`

#### Managing Projects

- View project overview table with all key metrics
- Click project name to view full details
- See case study status in "Case Study" column
- View assigned clients for each project

### For Clients

#### Logging In

1. Go to `/login`
2. Enter email and password
3. Redirected to Client Dashboard

#### Viewing Projects

1. From Client Dashboard (`/client/dashboard`):
   - See all assigned projects
   - View project status and progress
   - See project deadlines
2. Click "View Project Details" to see full information
3. Click "Open Case Study" link if available

---

## Development

### Project Initialization

```bash
npm install express ejs pg bcrypt express-session connect-pg-simple dotenv
npm install --save-dev nodemon ws
```

### Database Setup Commands

```bash
# Connect to database
psql -U postgres -d bus_d_designs

# View schema
\dt

# View users
SELECT * FROM users;

# Clear database
DROP DATABASE bus_d_designs;
```

### Running Tests

Database connection test:
```bash
node -e "import('./src/models/db.js').then(m => console.log('OK'))"
```

### Code Standards

- **Naming:** camelCase for variables/functions, PascalCase for classes/exports
- **Comments:** Document complex logic and configuration
- **Error Handling:** Always catch async errors and flash user-friendly messages
- **Security:** Hash passwords, sanitize EJS output, validate inputs
- **Middleware Order:** Session → Auth → Routes → Error handler

### Adding New Routes

1. Create controller in `src/controllers/`
2. Add route handler function with `(req, res)` or `async (req, res)`
3. Import in `src/controllers/routes.js`
4. Add route definition: `router.get('/path', requireAuth, handler);`
5. Create view in `src/views/` if needed
6. Test with Postman or browser

---

## Troubleshooting

### Common Issues

**Problem: Database connection fails**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
Solution: 
- Ensure PostgreSQL is running
- Verify `DB_URL` in `.env`
- Check database exists: `psql -l | grep bus_d_designs`
- Verify credentials: `psql -U postgres` should work without password if your setup allows it

---

**Problem: renderStyles is undefined**
```
Error: renderStyles is not a function
```
Solution:
- Header template now has safety check: `typeof renderStyles === 'function'`
- Ensure `src/middleware/global.js` is applied before routes
- Verify middleware order in `server.js`

---

**Problem: Sessions not persisting**
```
Session lost after page reload
```
Solution:
- Verify PostgreSQL session table exists
- Check `SESSION_SECRET` is set (not empty)
- Ensure cookies are enabled in browser
- Check `ENABLE_SQL_LOGGING=true` to see queries

---

**Problem: Password hashing errors**
```
Error: $2b$ is not in the table
```
Solution:
- Update bcrypt: `pnpm add bcrypt@latest`
- Use Node.js 16+
- For older projects: `bcrypt@3.0.0`

---

**Problem: EJS template not found**
```
Error: Failed to lookup view
```
Solution:
- Check route renders correct view path
- Verify file exists in `src/views`
- Check EJS file extensions (`.ejs`)
- Verify `app.set('views', path.join(__dirname, 'src/views'))`

---

**Problem: Flash messages not showing**
```
Messages appear but disappear on next request
```
Solution:
- Flash messages auto-clear after display (this is expected)
- Verify flash middleware is applied before routes
- Check EJS template includes flash message partial in header

---

### Debug Mode

Enable SQL logging:
```bash
ENABLE_SQL_LOGGING=true NODE_ENV=development npm run dev
```

This logs all database queries with timing information, useful for:
- Identifying slow queries
- Debugging query construction
- Understanding data flow

---

## Contributing

This is a portfolio project, but contributions and feedback are welcome.

### Setup for Development

```bash
git clone <repo>
cd Bus-D_Designs/BackEnd-Build
pnpm install
cp .env.example .env
# Configure .env with your database
pnpm dev
```

### Guidelines

- Keep commits focused and descriptive
- Test changes locally before pushing
- Update documentation for new features
- Follow existing code style and conventions

---

## License

ISC - See package.json for details

---

## Author

**Brandon Garrett** - [Bus-D Designs](https://bus-d-designs.com)  
Portfolio backend showcasing Node.js, Express, and PostgreSQL expertise.

---

## Last Updated

April 2026 - Admin Dashboard Rework (project & case study modals, shared styling, dashboard.css) 
