# Blog Website

## Project Overview

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite as the build tool. The application allows users to create, read, update, and delete blog posts, with features such as user authentication, image uploads, and responsive design.

## Features

- **User Authentication**: Register, login, and manage user sessions with JWT tokens.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **Image Upload**: Upload images for each blog post.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Dynamic Routing**: Implemented with React Router for seamless navigation.
- **State Management**: Managed with React's Context API.

## Tech Stack

- **Frontend**: 
  - React with Vite
  - Tailwind CSS/Sass for styling
  - React Router for routing
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose for data modeling
- **Authentication**:
  - JWT for token-based authentication
  - bcrypt for password hashing

## Installation

   ```
   git clone https://github.com/Ram1008/ZuAi_blog-app.git
   
   cd backend 
   npm install

   cd ..

   cd frontend
   npm install

   ```
## Set up

    Create a file in root directory named '.env'
    write in file

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

    ```
## Start the app

    ```
    cd backend
    npm start
    
    cd ..

    cd frontend
    npm run dev

    ```