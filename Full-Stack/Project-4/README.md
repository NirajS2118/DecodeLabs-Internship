# Student Course Enrollment System

A full-stack web application that demonstrates frontend-backend integration using Fetch API, Express.js, and MongoDB.

---

## Project Overview

This is Project-4 of my industrial training. The goal was to build a complete full-stack application where the frontend communicates with the backend using the Fetch API. All student data is stored in MongoDB and displayed dynamically on the UI.

---

## Features

- Add a new student (name, email, course)
- View all enrolled students in a table
- Edit student details
- Delete a student record
- Dashboard with live stats (total students, unique courses, added today)
- Success and error messages
- Loading state while fetching data
- Empty state when no students exist
- Network error handling
- Input validation on frontend and backend

---

## Folder Structure

```
Full-Stack/
└── Project-4/
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
    ├── public/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    └── assets/
```

---

## Installation Steps

1. Clone or download the project

2. Go into the project folder:
   ```bash
   cd Full-Stack/Project-4
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

5. Edit `.env` with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/student-enrollment
   PORT=5000
   ```

6. Start the server:
   ```bash
   npm start
   ```

7. Open your browser and visit:
   ```
   http://localhost:5000
   ```

---

## Environment Variables

| Variable   | Description                          | Example                                        |
|------------|--------------------------------------|------------------------------------------------|
| MONGO_URI  | MongoDB connection string            | mongodb://localhost:27017/student-enrollment   |
| PORT       | Port the server runs on              | 5000                                           |

---

## API Endpoints

| Method | Endpoint              | Description           | Status Codes         |
|--------|-----------------------|-----------------------|----------------------|
| POST   | /api/students         | Create a student      | 201, 400, 500        |
| GET    | /api/students         | Get all students      | 200, 500             |
| GET    | /api/students/:id     | Get student by ID     | 200, 404, 500        |
| PUT    | /api/students/:id     | Update a student      | 200, 404, 500        |
| DELETE | /api/students/:id     | Delete a student      | 200, 404, 500        |

---

## Sample Requests

### Create a Student
```
POST /api/students
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
  "_id": "665abc123def456",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Full Stack Development",
  "createdAt": "2024-06-10T10:00:00.000Z"
}
```

---

### Get All Students
```
GET /api/students
```

Response (200):
```json
[
  {
    "_id": "665abc123def456",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "course": "Full Stack Development",
    "createdAt": "2024-06-10T10:00:00.000Z"
  }
]
```

---

### Update a Student
```
PUT /api/students/665abc123def456
Content-Type: application/json

{
  "course": "Data Science"
}
```

Response (200):
```json
{
  "_id": "665abc123def456",
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "course": "Data Science",
  "createdAt": "2024-06-10T10:00:00.000Z"
}
```

---

### Delete a Student
```
DELETE /api/students/665abc123def456
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

Duplicate email (400):
```json
{ "message": "Email already exists" }
```

Student not found (404):
```json
{ "message": "Student not found" }
```

---

## Frontend Usage

The frontend is served automatically by Express from the `public/` folder.

Just open `http://localhost:5000` in your browser.

- Fill the form at the top to add a student
- Click **Edit** on any row to update a student
- Click **Delete** to remove a student
- All data loads automatically from MongoDB on page open

---

## Screenshots Section

> Add screenshots here after running the project locally.

- `assets/dashboard.png` — Dashboard with stats
- `assets/form.png` — Add student form
- `assets/table.png` — Student list table
- `assets/edit.png` — Edit mode with orange highlight
