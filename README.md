<div align="center">
  <img src="https://rent-iitp.vercel.app/logo.png" alt="RentIITP Logo" width="120" />
  <h1>RentIITP</h1>
  <p>
    <strong>Campus rental platform for IIT Patna students.<br>
    Borrow, lend, and manage items securely and efficiently.</strong>
  </p>
  <a href="https://rent-iitp.vercel.app/">🌐 Live Demo</a>
</div>

---

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-setup">Environment Setup</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 🚀 Features

- 🔐 **Secure Authentication** (JWT)
- 🏷️ **Item Listing & Management** (images, categories, status)
- 🔎 **Smart Search & Filters**
- ⭐ **Wishlist**
- 🔄 **Rental Workflow** (request, approve, track, complete)
- 🔔 **Real-time Notifications**
- 📱 **Responsive UI**

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Railway)
- **Authentication:** JWT
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🏁 Getting Started

<details>
<summary><strong>1. Clone & Install</strong></summary>

git clone https://github.com/Krishal23/RentIITP.git
cd RentIITP

Backend
npm install

Frontend
cd client
npm install

text
</details>

<details>
<summary><strong>2. Database Setup</strong></summary>

- Ensure your MySQL database is running (see `.env` setup below).
- Run SQL scripts in `/database` to create tables and seed data.

</details>

<details>
<summary><strong>3. Environment Variables</strong></summary>

#### Backend (`.env`)
Create a `.env` file in the root of your backend directory with the following keys:
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
DB_CONNECTION_LIMIT=10

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

text

#### Frontend (`client/.env`)
Create a `.env` file in the `client` directory with:
For production
NEXT_PUBLIC_API_URL=https://your-production-api-url/api
REACT_APP_API_URL=https://your-production-api-url/api
For local development
REACT_APP_API_URL=http://localhost:3000/api

text
</details>

<details>
<summary><strong>4. Run the App</strong></summary>

Backend
npm start

Frontend (in /client)
npm start

text
</details>

---

## 🗂️ Project Structure

RentIITP/
├── server/ # Express backend
├── client/ # React frontend
├── database/ # SQL schema & seed scripts
└── README.md

text

---

## 🤝 Contributing

We welcome contributions! Please open an issue or submit a pull request.

---

## 📣 Contact

Questions or feedback? [Open an issue](https://github.com/Krishal23/RentIITP/issues).

---

**Let’s build a smarter, more sustainable IIT Patna together!**