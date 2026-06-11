# Feedback Collection API

A simple full-stack web application built with **Node.js** and **Express.js** that allows users to submit and view feedback through a clean web interface.

---

## Features

- Submit feedback with name, email, and message
- View all submitted feedback
- Server-side input validation with descriptive error messages
- In-memory data storage (no database required)
- Clean, responsive frontend built with vanilla HTML, CSS, and JavaScript
- RESTful API design with proper HTTP status codes

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Runtime  | Node.js                 |
| Framework| Express.js              |
| Frontend | HTML, CSS, JavaScript   |
| Storage  | In-memory (JS Array)    |

---

## Folder Structure

```
Project-2/
├── package.json
├── server.js
├── README.md
│
├── routes/
│   └── feedbackRoutes.js       # Route definitions
│
├── controllers/
│   └── feedbackController.js   # Request handlers
│
├── middleware/
│   └── validateFeedback.js     # Input validation
│
├── data/
│   └── feedbackStore.js        # In-memory data store
│
└── public/
    ├── index.html              # Frontend UI
    ├── style.css               # Styles
    └── app.js                  # Frontend JavaScript
```

---

## Installation

**Prerequisites:** Node.js v16 or higher

```bash
# 1. Navigate to the project folder
cd Project-2

# 2. Install dependencies
npm install
```

---

## How to Run

```bash
npm start
```

Open your browser and visit: **http://localhost:3000**

For development with auto-reload:

```bash
npm run dev
```

---

## API Endpoints

### GET /api/feedback

Returns all submitted feedback entries.

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great project!"
  }
]
```

---

### POST /api/feedback

Submits a new feedback entry.

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Really enjoyed using this."
}
```

**Success Response:** `201 Created`

```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

**Error Response:** `400 Bad Request`

```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

## Sample Requests (curl)

**Submit feedback:**

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Looks great!"}'
```

**Get all feedback:**

```bash
curl http://localhost:3000/api/feedback
```

---

## Screenshots

> _Add screenshots here after running the project locally._

| View             | Screenshot |
|------------------|------------|
| Feedback Form    | _(screenshot)_ |
| Feedback List    | _(screenshot)_ |
| Validation Error | _(screenshot)_ |

---

## Future Improvements

- Persist feedback to a database (e.g., MongoDB or PostgreSQL)
- Add pagination to the feedback list
- Allow users to delete their own feedback
- Add timestamps to each feedback entry
- Rate limiting to prevent spam submissions
- Unit tests for controllers and middleware
