# Student Records Manager

A simple REST API to manage student records, built with Node.js, Express, and MongoDB.

---

## Project Overview

This project was built as part of industrial training (Project-3). The goal was to connect a backend with a MongoDB database and perform CRUD operations on student data.

---

## Features

- Add a new student
- View all students
- View a single student by ID
- Update student details
- Delete a student record
- Input validation and error handling

---

## Folder Structure

```
Full-Stack/
└── Project-3/
    ├── package.json
    ├── server.js
    ├── .env.example
    ├── README.md
    │
    ├── config/
    │   └── db.js
    │
    ├── models/
    │   └── Student.js
    │
    ├── controllers/
    │   └── studentController.js
    │
    ├── routes/
    │   └── studentRoutes.js
    │
    └── assets/
```

---

## Installation Steps

1. Clone or download the project

2. Navigate into the project folder:
   ```
   cd Full-Stack/Project-3
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file by copying the example:
   ```
   cp .env.example .env
   ```

5. Update the `.env` file with your MongoDB connection string.

6. Start the server:
   ```
   npm start
   ```

The server will start on `http://localhost:5000`

---

## Environment Variables

Create a `.env` file in the root of the project:

```
MONGO_URI=mongodb://localhost:27017/student-records
PORT=5000
```

> If you are using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

---

## API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | /students        | Create a student     |
| GET    | /students        | Get all students     |
| GET    | /students/:id    | Get student by ID    |
| PUT    | /students/:id    | Update a student     |
| DELETE | /students/:id    | Delete a student     |

---

## Sample Requests

### Create a Student
```
POST /students
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Full Stack Development"
}
```

Response (201):
```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Full Stack Development",
  "createdAt": "2024-06-10T10:30:00.000Z"
}
```

---

### Get All Students
```
GET /students
```

Response (200):
```json
[
  {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "course": "Full Stack Development",
    "createdAt": "2024-06-10T10:30:00.000Z"
  }
]
```

---

### Get Student by ID
```
GET /students/665f1a2b3c4d5e6f7a8b9c0d
```

Response (200):
```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Full Stack Development",
  "createdAt": "2024-06-10T10:30:00.000Z"
}
```

---

### Update a Student
```
PUT /students/665f1a2b3c4d5e6f7a8b9c0d
Content-Type: application/json

{
  "course": "Data Science"
}
```

Response (200):
```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Data Science",
  "createdAt": "2024-06-10T10:30:00.000Z"
}
```

---

### Delete a Student
```
DELETE /students/665f1a2b3c4d5e6f7a8b9c0d
```

Response (200):
```json
{
  "message": "Student deleted successfully"
}
```

---

### Error Responses

Missing fields (400):
```json
{ "message": "Name, email, and course are required" }
```

Student not found (404):
```json
{ "message": "Student not found" }
```

Duplicate email (400):
```json
{ "message": "Email already exists" }
```
