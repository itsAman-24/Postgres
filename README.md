# Full-Stack Authentication System with Google reCAPTCHA

## Overview
This is a full-stack authentication system built using **Node.js, Express, PostgreSQL, and EJS**. It features user **registration, login, profile management**, and **Google reCAPTCHA** protection for security. The app also implements **JWT-based authentication** and **rate-limiting** to prevent brute-force attacks.

## Features
- **User Registration** with input validation and hashed passwords.
- **Login with Google reCAPTCHA v2** for bot protection.
- **JWT Authentication** for secure session management.
- **Profile Page** displaying user details.
- **Rate Limiting** to prevent brute-force attacks.
- **Logout Functionality** with session clearing.
- **Error Handling & Flash Messages** for better user experience.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** bcrypt for password hashing, JWT for session management
- **Security:** Google reCAPTCHA v2, express-rate-limit
- **Template Engine:** EJS
- **Environment Management:** dotenv

## Prerequisites
Before running this application, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone 
cd auth-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=auth_system
PORT=3000

RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```
Replace the placeholders with your actual credentials.

### 4️⃣ Set Up PostgreSQL Database
#### Open PostgreSQL CLI:
```sh
psql -U your_db_username
```
#### Create Database & Table:
```sql
CREATE DATABASE auth_system;
\c auth_system;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5️⃣ Start the Server
```sh
npm run dev
```
Server runs at: **http://localhost:3000**

## API Routes
### 🔹 Authentication Routes
| Method | Route        | Description                  |
|--------|-------------|------------------------------|
| GET    | `/register`  | Render registration page    |
| POST   | `/register`  | Register a new user         |
| GET    | `/login`     | Render login page           |
| POST   | `/login`     | Authenticate user & set JWT |
| GET    | `/logout`    | Logout & clear session      |

### 🔹 User Routes
| Method | Route       | Description                     |
|--------|------------|---------------------------------|
| GET    | `/dashboard` | View user dashboard           |
| GET    | `/profile`  | View user profile              |

## Usage
1. Open **http://localhost:3000/register** and create an account.
2. Login at **http://localhost:3000/login** with reCAPTCHA verification.
3. Access your profile at **http://localhost:3000/profile**.
4. Logout via **http://localhost:3000/logout**.

## Security Features
- **Password Hashing:** Secure storage using bcrypt.
- **JWT Authentication:** Protects user sessions.
- **Google reCAPTCHA:** Prevents bot attacks.
- **Rate Limiting:** Restricts multiple login attempts.

## Deployment (Optional)
For deploying the app, you can use **Heroku, Render, or Railway**. Ensure:
- Update `.env` variables.
- Use a cloud-hosted PostgreSQL database.
- Set `secure: true` for JWT cookies in `app.js`.

## License
This project is **MIT licensed**.

## Contributors
Developed by **Your Name**. Feel free to contribute!

---
### 🎯 Need Help?
Open an issue or reach out at **your_email@example.com**.
