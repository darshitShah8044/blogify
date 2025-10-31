# 📰 Blogify

A modern and responsive blogging web application built with **React + Redux + Tailwind CSS**, designed to provide a social platform where users can explore blogs, manage todos, upload images, and more — all in one place!

🌐 **Live Demo:** [https://blogify-darshit.netlify.app/login](https://blogify-darshit.netlify.app/login)  
💾 **GitHub Repository:** [https://github.com/darshitShah8044/blogify](https://github.com/darshitShah8044/blogify)

---

## 🔐 Admin Login Credentials

| Email                | Password  |
|----------------------|-----------|
| `admin@example.com`  | `admin123` |

Use these credentials to log in as the admin and access all sections of the app.

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Image Gallery API:** Pexels API
- **Storage:** LocalStorage (for user uploads and comments)
- **Animations:** CSS transitions + custom shimmer effect
- **Environment Variables:** `.env` for API keys

---

## ✨ Features Overview

### 🏠 Dashboard
- Displays summary of app modules — Todos, Explore, Albums, etc.
- Add/Edit/Delete blogs
- Navigation between pages with React Router.

### ✅ Todo Manager
- Add, delete, and mark todos as **Pending** or **Completed**.
- Filter todos by status using **Pending** and **Completed** buttons.
- Data persisted in **LocalStorage**.
- Built as a separate reusable component and integrated into Dashboard.

### 🌍 Explore Tab
- Displays **blogs** in a social-media-like feed.
- Reads data from a **static JSON file**.
- Allows users to **comment** on each blog.
- Comments are stored in **LocalStorage**, so they persist after reload.

### 🖼️ Albums (Gallery)
- Fetches high-quality images from **Pexels API**.
- Implements **Lazy Loading** and a custom **Shimmer effect** for smooth UX.
- Users can **upload their own images** — saved locally and displayed alongside fetched images.
- Fully responsive layout with Tailwind grid system.

### 🌗 Responsive Design
- Built with **Tailwind CSS utility classes** for responsiveness.
- Automatically adapts to mobile, tablet, and desktop viewports.

### ⚡ Performance & State Management
- Uses **Redux Toolkit** for global state (Todos, User Auth, etc.).
- React state hooks (`useState`, `useEffect`) for component-level control.
- API data and UI state are decoupled, ensuring reusability and maintainability.

---

## 🧱 Folder Structure

