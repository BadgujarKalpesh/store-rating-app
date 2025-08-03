# 📦 Store Rating Full-Stack Application

This is a complete full-stack web application designed to allow users to rate and review stores. It features a robust, role-based access control system that provides different functionalities for **System Administrators**, **Normal Users**, and **Store Owners**.

The application is built with a modern tech stack, featuring a **React** frontend that communicates with a **Node.js & Express.js** backend API, with data persisted in a **MySQL** database.

---

## Screenshort 

### Sign Up Page

<img width="1917" height="906" alt="Screenshot 2025-08-03 004737" src="https://github.com/user-attachments/assets/f75d50d0-05b2-4fb9-84db-af0639b2a555" />


### Login Page

<img width="1917" height="902" alt="Screenshot 2025-08-03 004715" src="https://github.com/user-attachments/assets/62dd9896-68da-420e-bc1e-f80a3e0571c0" />

### Admin Dashboard 

<img width="1895" height="904" alt="Screenshot 2025-08-03 004806" src="https://github.com/user-attachments/assets/64a5eece-2084-481e-8296-f3520e8cb26f" />

<img width="1888" height="900" alt="Screenshot 2025-08-03 004843" src="https://github.com/user-attachments/assets/b6bbc458-8099-4b12-a002-fd1728bbc2dd" />

<img width="1892" height="904" alt="Screenshot 2025-08-03 004903" src="https://github.com/user-attachments/assets/ef9b6351-ef4c-4dce-a276-b550bebb4344" />

<img width="1886" height="902" alt="Screenshot 2025-08-03 004927" src="https://github.com/user-attachments/assets/4af2562f-0e8f-4465-9122-d21254d4bfe6" />

### Reset Password for all user (System Administrator, Store Owner, Normal User)

<img width="1908" height="897" alt="Screenshot 2025-08-03 005026" src="https://github.com/user-attachments/assets/a8dc8e85-d1bd-4fd4-b79d-55254bd8ddb5" />

### Store Owner Dashboard

<img width="1896" height="905" alt="Screenshot 2025-08-03 005306" src="https://github.com/user-attachments/assets/969f4613-07de-42c3-b59e-ce9ee82ab94a" />

### Normal User Dashboard

<img width="1896" height="905" alt="Screenshot 2025-08-03 005306" src="https://github.com/user-attachments/assets/361d18d8-71e8-4ec4-b63d-a3f33a95333a" />


## 🚀 Features

### 👤 **User Roles & Permissions**
The application has three distinct user roles:

- **System Administrator** – Full control over the application.
- **Store Owner** – Manage assigned store(s) and view customer feedback.
- **Normal User** – Browse and rate stores.

---

## ✨ **Key Functionalities by Role**

### 🛡 System Administrator
- **Dashboard** – View total users, total stores, and total ratings.
- **User Management** – Create, view, and filter all users.
- **Store Management** – Create new stores and assign them to Store Owners.
- **Data Control** – Filter & sort users/stores by name, email, and role.

### 👥 Normal User
- **Authentication** – Sign up and log in.
- **Profile Management** – Update password.
- **Store Discovery** – View all registered stores.
- **Search & Filter** – Search by name or address.
- **Rating System**  
  - Submit/modify a rating (1–5) for any store.
  - View overall average rating.
  - See own rating persist after logout/login.

### 🏪 Store Owner
- **Authentication** – Log in and update password.
- **Multi-Store Dashboard** – View all assigned stores.
- **Store Analytics** – For each store:
  - Average rating.
  - Detailed list of user ratings (name, email, date).

---

## 🛠 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT)

---

## ⚙️ Setup & Installation

### 📋 Prerequisites
- Node.js (v14 or later)
- NPM or Yarn
- MySQL Server

---

### **1️⃣ Backend Setup (`store-rating-backend`)**
```bash
cd store-rating-backend
npm install
````

Create `.env` file in backend root:

```env
# MySQL Database Configuration
DB_HOST=127.0.0.1
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_db

# JWT Secret Key
JWT_SECRET=kjdfdsfkjdwfewpofjpow

# Server Port
PORT=8080
```

**Database Setup**

* Create a MySQL database named `store_rating_db`.

**Start Backend**

```bash
npm start
```

Backend runs at: [http://localhost:8080](http://localhost:8080)
First run will create an initial **System Administrator** account.

---

### **2️⃣ Frontend Setup (`store-rating-frontend`)**

```bash
cd store-rating-frontend
npm install
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 📋 Usage Workflow

1. **Log In as Admin**

   ```
   Email: admin@example.com
   Password: AdminPassword1!
   ```

2. **Create Users and Stores**

   * Create a **Store Owner**.
   * Create a **Normal User**.
   * Create stores and assign to Store Owner.

3. **Test Roles**

   * Log in as Store Owner → View dashboard.
   * Log in as Normal User → Browse & rate stores.
   * Log back in as Store Owner → See ratings in dashboard.

---
