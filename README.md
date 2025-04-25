server site run: nodemon index.js <br/>


# 🛠️ Galaxy Blogger - Server Side

This is the **backend API** for the Galaxy Blogger web application. It’s built using **Node.js**, **Express.js**, and **MongoDB**, providing secure and scalable endpoints for blog creation, user interaction, authentication, and wishlist features.

---

## 🔗 Project Repositories

| Part         | Repository Link                                                                 |
|--------------|----------------------------------------------------------------------------------|
| Client Side  | [blogging-client-site](https://github.com/wptasmina/blogging-client-site)       |
| Server Side  | [blogging-server-site](https://github.com/wptasmina/blogging-server-site)       |

---

## 🌟 Key Features

| Feature                 | Description                                                             |
|------------------------|-------------------------------------------------------------------------|
| 🔐 JWT Authentication   | Secure login and route protection using JSON Web Tokens                |
| 📝 Blog CRUD API        | Add, update, delete, and fetch blogs                                    |
| 🧾 Wishlist Management  | Add and remove blogs from a personal wishlist                           |
| 💬 Comments API         | Add comments to blogs (optional integration)                           |
| 🔍 Filter/Search Support| Blogs can be filtered by category or searched by title                 |
| 🌐 CORS Enabled         | Cross-origin resource sharing for frontend interaction                 |
| 🔒 Secure Routes        | Middleware-protected endpoints requiring valid tokens                  |

---

## 📦 Tech Stack

| Layer        | Tech Used         |
|--------------|-------------------|
| Runtime      | Node.js           |
| Framework    | Express.js        |
| Database     | MongoDB (Mongoose)|
| Auth         | Firebase, JWT     |
| Environment  | dotenv            |
| Deployment   | Vercel            |

---

## 🛠️ API Endpoints Overview

| Method  | Endpoint             | Description                          |
|---------|----------------------|--------------------------------------|
| GET     | `/blogs`             | Get all blogs                        |
| GET     | `/blogs/:id`         | Get a single blog by ID              |
| POST    | `/blogs`             | Add a new blog                       |
| PUT     | `/blogs/:id`         | Update a blog                        |
| DELETE  | `/blogs/:id`         | Delete a blog                        |
| GET     | `/wishlist/:email`   | Get wishlist by user email           |
| POST    | `/wishlist`          | Add blog to wishlist                 |
| DELETE  | `/wishlist/:id`      | Remove blog from wishlist            |
| POST    | `/jwt`               | Generate a JWT token                 |

> 🔐 Some routes are protected and require a valid JWT token in the `Authorization` header.

---

## 🧪 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/wptasmina/blogging-server-site.git
cd blogging-server-site

