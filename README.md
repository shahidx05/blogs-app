# 📝 Full-Stack Blog Application (MPA & SPA)

<div align="center">

**A complete, full-stack blog application featuring a secure Node.js REST API and two distinct frontends: a classic Multi-Page Application (MPA) and a modern, deployed Single Page Application (SPA).**

</div>

---

## 🚀 Live Demo

**Click the image below to experience the live Single Page Application:**

<a href="https://blogs-app-shahidx05.vercel.app/" target="_blank">
  <img src="frontend%20MPA/images/home.png" alt="Project Home Page Preview" width="100%">
</a>

**Or visit the direct link:**
### [https://blogs-app-shahidx05.vercel.app/](https://blogs-app-shahidx05.vercel.app/)

---

## ✨ About This Project

This repository showcases the evolution of a full-stack project. It begins with a secure Node.js backend and includes two frontend implementations:

1.  **Multi-Page Application (MPA):** The original frontend, built with separate HTML files for each page (`index.html`, `profile.html`, etc.). This version demonstrates a classic and robust approach to web development.
2.  **Single Page Application (SPA):** The modern, deployed version. It provides a seamless and fluid user experience with no page reloads, all powered by a custom-built vanilla JavaScript router.

---

## 🎯 Key Features

### Backend (REST API)
-   ✅ **Secure Authentication**: Full user registration and login system using **JWT (JSON Web Tokens)**.
-   ✅ **Password Hashing**: Passwords are securely hashed with `bcrypt`.
-   ✅ **Protected Routes**: Custom middleware ensures only authenticated users can perform sensitive actions.
-   ✅ **Full CRUD for Posts**: Complete API endpoints to Create, Read, Update, and Delete blog posts.
-   ✅ **Like/Unlike System**: A dedicated endpoint to toggle a "like" on any post.

### Frontend (Single Page Application)
-   ✅ **Seamless SPA Navigation**: A custom hash-based router provides instant page transitions with **no full-page reloads**.
-   ✅ **User Dashboard**: A dedicated profile page showing user details and a list of their own posts.
-   ✅ **Full Post Management**: Users can create, edit, and delete their own posts from the UI.
-   ✅ **Interactive Actions**: Like or unlike any post with instant UI feedback without leaving the page.
-   ✅ **Dynamic Navigation**: The navigation bar intelligently shows the correct links and active state based on login status.
-   ✅ **Auth Guarding**: Protected pages automatically redirect to the login page if the user is not authenticated.
-   ✅ **Responsive Design**: The UI is fully responsive and looks great on all devices.

---

## 🛠️ Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)

### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)

---

## 📸 Project Preview

| Profile Page / Dashboard | All Posts (Home) |
| :---: | :---: |
| ![Profile Page Screenshot](frontend%20MPA/images/profile.png) | ![Home Page Screenshot](frontend%20MPA/images/home.png) |
| **Login Page** | **Edit Post Page** |
| ![Login Page Screenshot](frontend%20MPA/images/login.png) | ![Edit/Create Post Screenshot](frontend%20MPA/images/create.png) |


---

## 📂 Installation & Setup

This project uses a monorepo structure with three main folders: `backend`, `frontend MPA`, and `frontend SPA`.

### **Backend Setup**

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/shahidx05/blogs-app](https://github.com/shahidx05/blogs-app)
    cd blogs-app
    ```
2.  **Navigate to the Backend Directory**
    ```bash
    cd backend
    ```
3.  **Install Dependencies**
    ```bash
    npm install
    ```
4.  **Set Up Environment Variables**
    Create a `.env` file in the `/backend` folder and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    JWT_SECRET=a_very_long_and_secret_key
    ```
5.  **Run the Server**
    ```bash
    npm start
    ```
    The API will now be running on `http://localhost:3000`.

---
### **Frontend Setup**

You can run either the modern SPA or the original MPA.

#### **1. Frontend (Single Page Application - Deployed Version)**

1.  **Navigate to the SPA Directory**
    ```bash
    cd ../frontend-SPA 
    ```
2.  **Run with a Live Server**
    * The `js/api.js` file is already configured to automatically switch between the local and live backends.
    * In VS Code, right-click `index.html` and select "Open with Live Server".

#### **2. Frontend (Multi-Page Application - Original Version)**

1.  **Navigate to the MPA Directory**
    ```bash
    cd ../"frontend MPA"
    ```
2.  **Run with a Live Server**
    * In VS Code, right-click `index.html` and select "Open with Live Server".

---

## 👨‍💻 Author

**Shahid Khan**

🚀 Learning in public | #WebDev #BuildInPublic

🔗 [LinkedIn](https://www.linkedin.com/in/shahidx05) • [X (Twitter)](https://twitter.com/shahidx_05)