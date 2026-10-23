# Beyond The Bar

Marketing site and client portal for **Beyond The Bar**, a mobile bartending service for weddings, corporate events and private parties in Jacksonville & Northeast Florida.

Built with React (Create React App), React Router and React Bootstrap.

## Project structure

```
beyond-the-bar/
├── client/   React frontend (run everything from here)
│   ├── public/
│   └── src/
│       ├── components/          Site sections, layout, shared UI
│       ├── features/dashboard/  Client dashboard widgets + mock data
│       └── pages/               Login, dashboards, legal, 404
└── server/   Backend scaffolding (not implemented yet)
```

## Running locally

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

### 1. Install dependencies (first time only)

```bash
cd client
npm install
```

Run this again after a fresh clone or whenever `package.json` changes.

### 2. Start the dev server

```bash
cd client
npm start
```

Your browser opens [http://localhost:3000](http://localhost:3000). Saved changes in `client/src` reload automatically.

Press `Ctrl + C` in the terminal to stop the server.

### Pages

| Page | URL |
| --- | --- |
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Client dashboard | http://localhost:3000/dashboard/client |
| Admin dashboard | http://localhost:3000/dashboard/admin |
| Terms of Use | http://localhost:3000/terms |
| Privacy Policy | http://localhost:3000/privacy |

**Demo login:** on the login page, any email logs you in as a client. Include `admin` in the email (for example `admin@test.com`) to open the admin dashboard.

> The site runs entirely on demo data. There is no backend to start, and forms like the quote request don't send anything yet.

## Other scripts

All scripts run from the `client` folder.

| Command | What it does |
| --- | --- |
| `npm start` | Starts the dev server on port 3000 |
| `npm run build` | Creates an optimized production build in `client/build` |
| `npm test` | Runs tests in watch mode |

## Troubleshooting

- **"Something is already running on port 3000"**: another dev server is still open. Close it, or press `Y` to use a different port.
- **`'react-scripts' is not recognized`**: you're not in the `client` folder, or you haven't run `npm install` yet.

---

Built by [CodeBox LLC](https://codeboxllc.net/).
