# Job Application Tracker

A full-stack MERN application that enables users to organize and manage their job and internship applications in one place. The application provides secure authentication and allows users to create, view, update, and delete their own application records.

## Features

- Secure user authentication using JWT
- Password encryption with bcryptjs
- User-specific application management
- Create, update, delete, and view applications
- Track application details including:
  - Company Name
  - Application Type (Placement/Internship)
  - Applied Date
  - Important Notes
  - Application Result/Status
- Protected routes for authenticated users
- Responsive and intuitive user interface

## Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```
Job-Application-Tracker
│
├── frontend
│   ├── src
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
```

## Application Workflow

1. Users register with a name, email, and password.
2. Users log in to receive a JWT token.
3. Authenticated users can:
   - Add new job or internship applications.
   - View all previously added applications.
   - Edit application details.
   - Delete applications.
4. Each user can only access and manage their own application records.

## CRUD Operations

- **Create:** Add a new application.
- **Read:** View all saved applications.
- **Update:** Modify existing application details.
- **Delete:** Remove applications that are no longer needed.

## Security Features

- JWT-based authentication
- Password hashing using bcryptjs
- Protected backend routes
- User authorization for update and delete operations
- User-specific database queries to prevent unauthorized access