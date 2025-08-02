Here’s your content converted into a clean **`README.md`** format with proper markdown styling:

````markdown
# 📦 Store Rating Full-Stack Application

This is a complete full-stack web application designed to allow users to rate and review stores. It features a robust, role-based access control system that provides different functionalities for **System Administrators**, **Normal Users**, and **Store Owners**.

The application is built with a modern tech stack, featuring a **React** frontend that communicates with a **Node.js & Express.js** backend API, with data persisted in a **MySQL** database.

---

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
- **ORM:** Sequelize
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
JWT_SECRET=a-very-strong-and-secret-key-for-jwt

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

## 📜 License

This project is licensed under the MIT License.

```

---

Do you want me to **also add screenshots & badges** in this `README.md` so it looks more professional on GitHub? That would make it stand out a lot more.
```
