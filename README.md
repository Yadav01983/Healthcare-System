# 🏥 Healthcare Management System

A full-stack Healthcare Management System built using **Angular, Node.js, Express, and MongoDB**.
This project allows management of patients, doctors, and appointments with authentication and role-based access.

---

## 🚀 Features

* 👤 User Authentication (Login / Register)
* 🔐 JWT-based Authorization
* 🧑‍⚕️ Doctor Management (CRUD)
* 🧑‍🤝‍🧑 Patient Management (CRUD)
* 📅 Appointment Scheduling
* 📊 Dashboard Overview
* 🌙 Clean UI with Angular

---

## 🛠️ Tech Stack

### Frontend

* Angular
* TypeScript
* HTML, CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (MongoDB Atlas)

### Authentication

* JWT (JSON Web Token)

---

## 📂 Project Structure

```
Healthcare-System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── angular.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Yadav01983/Healthcare-System.git
cd Healthcare-System
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file in backend folder:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
ng serve
```

Frontend will run on:

```
http://localhost:4200
```

---

## 🔐 Environment Variables

Create `.env` file in backend:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

⚠️ Never upload `.env` to GitHub.

---

## 📸 Screenshots 
<img width="1873" height="895" alt="image" src="https://github.com/user-attachments/assets/8fcaf95b-b4d7-4cd0-a009-e548fead1d2f" />



---

## 🚀 Future Improvements

* Payment integration
* Email notifications
* Doctor availability scheduling

---

## 👨‍💻 Author

**Anurag Yadav**

* GitHub: https://github.com/Yadav01983

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
