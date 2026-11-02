# Beyond The Bar

Marketing site and booking portal for **Beyond The Bar**, a mobile bartending service for weddings, corporate events and private parties in Jacksonville & Northeast Florida.

- **Client portal:** event details, booking timeline, messages, add-ons, documents, invoices, referral rewards
- **Admin console:** quote requests, bookings, payments & refunds, messages, users, account requests

Built with React (Create React App), React Router and React Bootstrap on the frontend, and Express + MongoDB (Mongoose) on the backend.

## Project structure

```
beyond-the-bar/
├── client/                      React frontend
│   ├── public/
│   ├── .env.development         Login mode: mock or api
│   └── src/
│       ├── components/          Site sections, layout, shared UI
│       │   └── common/          ThemeToggle, StatusPill, ProtectedRoute, CookieConsent
│       ├── context/             AuthContext, CookieConsentContext
│       ├── features/dashboard/  Client dashboard widgets + mock data
│       ├── pages/               Login, dashboards, legal, 404
│       ├── services/            API client, auth service, cookie consent storage
│       └── utils/               Local-time date helpers
└── server/                      Express + MongoDB API
    ├── config/                  Environment variables, database connection
    ├── controllers/             Auth + event (booking) handlers
    ├── middleware/              Login/role checks, error handling
    ├── models/                  User, Event
    ├── routes/                  /api/auth, /api/events
    ├── scripts/                 seedAdmin.js (creates the first admin)
    ├── services/                Email (logs to console for now)
    ├── utils/                   JWT cookies, validators
    └── .env.example             Template for server/.env
```

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

### Option A — Demo mode (no database needed)

This is the default. Logins are stored in your browser so you can use the whole site before MongoDB is connected.

```bash
cd client
npm install    # first time only
npm start
```

Your browser opens [http://localhost:3000](http://localhost:3000). Use the demo buttons on the login page, or:

| Account | Email | Password |
| --- | --- | --- |
| Client | `client@demo.com` | `password123` |
| Admin | `admin@demo.com` | `password123` |

You can also create new client accounts with **Create an account**.

### Option B — Real logins with MongoDB

1. **Configure the server.** Copy `server/.env.example` to `server/.env` and fill in:
   - `MONGODB_URI`: your MongoDB Atlas or local connection string
   - `JWT_SECRET`: a long random string. Generate one with
     `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
   - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`: your first admin account

2. **Install, create the admin and start the API** (terminal 1):

   ```bash
   cd server
   npm install
   npm run seed:admin
   npm run dev
   ```

   The API runs on http://localhost:5000. Check http://localhost:5000/api/health; it should say `"database": "connected"`.

3. **Point the frontend at the API.** In `client/.env.development`, set:

   ```
   REACT_APP_AUTH_MODE=api
   ```

4. **Start the frontend** (terminal 2):

   ```bash
   cd client
   npm start
   ```

   The React dev server forwards `/api` requests to port 5000, so no extra setup is needed.

Admin accounts can only be created with `npm run seed:admin`. Public sign-up always creates client accounts.

Press `Ctrl + C` in a terminal to stop that server.

### Pages

| Page | URL | Access |
| --- | --- | --- |
| Home | http://localhost:3000 | Public |
| Login | http://localhost:3000/login | Public |
| Client dashboard | http://localhost:3000/dashboard/client | Logged-in clients |
| Admin dashboard | http://localhost:3000/dashboard/admin | Logged-in admins |
| Terms of Use | http://localhost:3000/terms | Public |
| Privacy Policy | http://localhost:3000/privacy | Public |

Logged-out visitors who open a dashboard are sent to the login page. Clients can't open the admin dashboard.

## API

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | API and database status |
| POST | `/api/auth/register` | Public | Create a client account |
| POST | `/api/auth/login` | Public | Log in (sets an httpOnly cookie) |
| POST | `/api/auth/logout` | Public | Log out |
| GET | `/api/auth/me` | Logged in | Current user |
| POST | `/api/auth/forgot-password` | Public | Request a password reset |
| GET | `/api/events` | Logged in | Clients: own bookings · Admins: all |
| POST | `/api/events` | Logged in | Create a booking |
| GET | `/api/events/:id` | Owner or admin | Booking details |
| PATCH | `/api/events/:id` | Owner or admin | Update a booking (status, pricing and staffing are admin-only) |

Without `MONGODB_URI`, the API still starts and database routes return `503`.

## What's still demo data

- Dashboard content (bookings, invoices, messages, admin lists) comes from mock data in the client. The `/api/events` endpoints are ready for it.
- The quote form and password reset don't send email yet (`server/services/emailService.js` logs to the console).

## Other scripts

| Folder | Command | What it does |
| --- | --- | --- |
| `client` | `npm start` | Dev server on port 3000 |
| `client` | `npm run build` | Production build in `client/build` |
| `client` | `npm test` | Tests in watch mode |
| `server` | `npm run dev` | API on port 5000, restarts on file changes |
| `server` | `npm start` | API without auto-restart |
| `server` | `npm run seed:admin` | Create or update the admin account from `server/.env` |

## Troubleshooting

- **"Something is already running on port 3000"**: another dev server is still open. Close it, or press `Y` to use a different port.
- **`'react-scripts' is not recognized`**: you're not in the `client` folder, or you haven't run `npm install` yet.
- **"Database is not connected"** when logging in: you're in `api` mode but `MONGODB_URI` is missing or wrong in `server/.env`, or the API isn't running.
- **Login changes don't take effect**: restart `npm start` after editing `client/.env.development`.

---

Built by [CodeBox LLC](https://codeboxllc.net/).
