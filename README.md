# FixMate — Service Request Board

A full-stack web application that connects **homeowners** with **tradespeople**. Homeowners can post service requests, and tradespeople can browse, view, and manage job statuses in real time.

Built as a technical assessment for the Full-Stack Developer Intern role at GlobalTNA.

---

## 🌐 Live Demo

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | https://your-frontend.vercel.app               |
| Backend API | https://globaltna-assessment-t9sk.onrender.com |

> Replace the above URLs after deployment.

---

## 📸 Features

### Homeowner

- Register and log in as a homeowner
- Post a new service request with title, description, category, location and contact details
- Edit your own job request — only while it is **Open** and **untouched** by a tradesperson
- Delete your own job request at any time
- Browse all job listings with filters

### Tradesperson

- Register and log in as a tradesperson
- Browse all open service requests
- Filter by category and status, or search by keyword
- View full job details
- Update job status to **In Progress** or **Closed**

### General

- Role-based access control (homeowner / tradesperson)
- JWT authentication with protected routes
- Client-side and server-side validation
- Toast notifications for all key actions
- Fully responsive UI

---

## 🗂️ Project Structure

globaltna-assessment/
├── backend/ # Node.js + Express REST API
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js # MongoDB connection
│ │ ├── controllers/
│ │ │ ├── jobController.js
│ │ │ └── authController.js
│ │ ├── middleware/
│ │ │ ├── authMiddleware.js # JWT protect + authorizeRoles
│ │ │ ├── errorHandler.js
│ │ │ └── validate.js
│ │ ├── models/
│ │ │ ├── JobRequest.js
│ │ │ └── User.js
│ │ ├── routes/
│ │ │ ├── jobRoutes.js
│ │ │ └── authRoutes.js
│ │ ├── validators/
│ │ │ └── jobValidators.js
│ │ ├── tests/
│ │ │ └── jobs.test.js
│ │ ├── seed.js
│ │ └── app.js
│ ├── server.js
│ └── package.json
│
├── frontend/ # Next.js 15 App Router
│ ├── app/
│ │ ├── auth/
│ │ │ ├── login/page.jsx
│ │ │ └── register/page.jsx
│ │ ├── jobs/
│ │ │ ├── new/page.jsx
│ │ │ └── [id]/
│ │ │ ├── page.jsx
│ │ │ └── edit/page.jsx
│ │ ├── layout.js
│ │ ├── page.js
│ │ └── globals.css
│ ├── components/
│ │ ├── JobCard.jsx
│ │ └── StatusBadge.jsx
│ ├── context/
│ │ └── AuthContext.js
│ ├── lib/
│ │ └── api.js
│ └── package.json
│
└── README.md

---

## 🧰 Tech Stack

### Backend

| Technology                    | Version | Purpose                         |
| ----------------------------- | ------- | ------------------------------- |
| Node.js                       | 20.x    | JavaScript runtime              |
| Express.js                    | 5.x     | REST API framework              |
| MongoDB Atlas                 | Cloud   | NoSQL database                  |
| Mongoose                      | 8.x     | MongoDB ODM                     |
| JSON Web Token (jsonwebtoken) | 9.x     | Authentication tokens           |
| bcryptjs                      | 2.x     | Password hashing                |
| express-validator             | 7.x     | Server-side input validation    |
| cors                          | 2.x     | Cross-origin resource sharing   |
| morgan                        | 1.x     | HTTP request logger             |
| dotenv                        | 16.x    | Environment variable management |
| nodemon                       | 3.x     | Development auto-restart        |

### Frontend

| Technology          | Version | Purpose                         |
| ------------------- | ------- | ------------------------------- |
| Next.js             | 15.x    | React framework (App Router)    |
| React               | 19.x    | UI library                      |
| Tailwind CSS        | 4.x     | Utility-first styling           |
| react-hook-form     | 7.x     | Form state management           |
| zod                 | 3.x     | Schema validation               |
| @hookform/resolvers | 3.x     | Connects Zod to react-hook-form |
| react-hot-toast     | 2.x     | Toast notifications             |
| lucide-react        | 0.x     | Icon library                    |

### Architecture Patterns

- **MVC** — Models, Controllers, Routes separated on the backend
- **Role-Based Access Control** — homeowner and tradesperson roles enforced on both frontend and backend
- **Centralized API Layer** — all fetch calls live in `lib/api.js`
- **Context API** — global auth state managed via `AuthContext`
- **Protected Routes** — JWT middleware on all write operations

---

## ⚙️ Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/globaltna
NODE_ENV=development
JWT_SECRET=your_secure_secret_here
CLIENT_URL=http://localhost:3000
```

### Frontend — `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Local Setup — Step by Step

### Prerequisites

Make sure you have these installed:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://cloud.mongodb.com) account (free tier)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/globaltna-assessment.git
cd globaltna-assessment
```

---

### 2. Set Up MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free **M0** cluster
3. Under **Database Access** — create a user with read/write permissions
4. Under **Network Access** — add `0.0.0.0/0` to allow all IPs
5. Click **Connect → Drivers** and copy your connection string

---

### 3. Set Up the Backend

```bash
cd backend
npm install
```

Create your environment file:

```bash
# Windows PowerShell
New-Item -ItemType File -Force -Path .env

# Mac / Linux
touch .env
```

Add your variables to `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/globaltna
NODE_ENV=development
JWT_SECRET=your_secure_secret_here
CLIENT_URL=http://localhost:3000
```

Start the backend:

```bash
npm run dev
```

You should see:

---

### 4. (Optional) Seed Sample Data

```bash
npm run seed
```

This inserts 10 sample job requests into your database.

---

### 5. Set Up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create your environment file:

```bash
# Windows PowerShell
New-Item -ItemType File -Force -Path .env.local

# Mac / Linux
touch .env.local
```

Add your variable to `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

---

### 6. Run Tests

```bash
cd backend
npm test
```

---

## 📡 API Reference

### Auth Routes

| Method | Endpoint             | Access | Description                               |
| ------ | -------------------- | ------ | ----------------------------------------- |
| POST   | `/api/auth/register` | Public | Register with name, email, password, role |
| POST   | `/api/auth/login`    | Public | Login and receive JWT                     |

### Job Routes

| Method | Endpoint        | Access            | Description                                                  |
| ------ | --------------- | ----------------- | ------------------------------------------------------------ |
| GET    | `/api/jobs`     | Public            | List all jobs (filter by `?category=` `?status=` `?search=`) |
| GET    | `/api/jobs/:id` | Public            | Get single job                                               |
| POST   | `/api/jobs`     | Homeowner         | Create a job request                                         |
| PUT    | `/api/jobs/:id` | Homeowner (owner) | Edit job — only if Open and untouched                        |
| PATCH  | `/api/jobs/:id` | Tradesperson      | Update job status                                            |
| DELETE | `/api/jobs/:id` | Homeowner (owner) | Delete own job                                               |

---

## 🔐 Role Permissions

| Action            | Homeowner | Tradesperson | Guest |
| ----------------- | --------- | ------------ | ----- |
| Browse jobs       | ✅        | ✅           | ✅    |
| View job detail   | ✅        | ✅           | ✅    |
| Post a job        | ✅        | ❌           | ❌    |
| Edit own job      | ✅        | ❌           | ❌    |
| Delete own job    | ✅        | ❌           | ❌    |
| Update job status | ❌        | ✅           | ❌    |

> Edit is only available when the job status is **Open** and no tradesperson has updated the status yet.

---

## 🌍 Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select the `backend/` folder
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add all environment variables from `backend/.env`
7. Deploy

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo → set **Root Directory** to `frontend/`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL
4. Deploy

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

Tests cover:

- `GET /api/jobs` — returns all jobs
- `GET /api/jobs?category=Plumbing` — filters by category
- `GET /api/jobs?status=Open` — filters by status
- `POST /api/jobs` — creates a valid job
- `POST /api/jobs` — rejects missing title
- `POST /api/jobs` — rejects missing description
- `POST /api/jobs` — rejects invalid email
- `GET /api/jobs/:id` — returns 404 for invalid ID

---

## 👤 Author

**Sithija Geeganage**
Full-Stack Developer Intern Candidate
[GitHub](https://github.com/SithijaSankalpa)

---

_Built with ❤️ for the GlobalTNA technical assessment — May 2026_
