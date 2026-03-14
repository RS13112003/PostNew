# PostNest
Node.js • Express • MySQL • EJS
CRUD Micro Blogging Application
Secure Post Editing with Password Verification

PostNest is a **mini micro-posting web application** where users can share short posts and manage them securely.
It is a simplified version of a **micro-blogging platform** similar to Twitter or Threads, built using **Node.js, Express, MySQL, and EJS**.

The project demonstrates **full CRUD operations, password verification, and backend-database integration**.

---

# Features

### Create Post

Users can create a new post by providing:

* Username
* Email
* Password
* Post Content

Once submitted, the post appears on the main page.

### View Post

Users can view the full content of any post without authentication.

### Edit Post

Users can edit their post details including:

* Username
* Email
* Content

Editing requires entering the correct password.

### Delete Post

Posts can be deleted by entering the correct password for verification.

### Post Ordering

New posts appear at the **top of the feed**, ensuring the latest content is displayed first.

---

# Tech Stack

Frontend

* HTML
* CSS
* EJS Template Engine

Backend

* Node.js
* Express.js

Database

* MySQL

Other Tools

* Faker.js (for generating sample data)
* Method Override

---

# Project Structure

```
PostNest
│
├── views
│   ├── home.ejs
│   ├── show.ejs
│   ├── new.ejs
│   ├── edit.ejs
│   └── view.ejs
│
├── public
│   ├── style.css
│   ├── script.js
│   └── PostNest.png
|   ├── 286.jpg
|   ├── new.css 
│
├── schema.sql
├── index.js
└── package.json
```

---

# Database Schema

```
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    content VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Installation

Clone the repository

```
git clone https://github.com/RS13112003/postnest.git
```

Navigate into the project folder

```
cd postnest
```

Install dependencies

```
npm install
```

Start the server

```
node index.js
```

Open the application in your browser

```
http://localhost:8080/postnest
```

---

# Future Improvements

Possible enhancements for the project:

* User authentication system
* Password hashing using bcrypt
* Separate tables for users and posts
* Real-time updates using WebSockets
* Improved UI/UX design
* Search functionality for posts

---

# Learning Outcomes

This project helped in understanding:

* Express routing
* CRUD operations
* Database interaction with MySQL
* EJS templating
* Password verification logic
* Full stack development workflow

---
