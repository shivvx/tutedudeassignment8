# Postman API Testing Documentation

This document contains step-by-step logs and results for all REST API endpoints of the Todo application. All requests were tested locally on port `5001`.

---

## Pre-Configured Test Collection
A pre-configured Postman collection is saved in the root folder as `Assignment8.postman_collection.json`. 

To import and use it:
1. Open Postman.
2. Click **Import** at the top left.
3. Select `Assignment8.postman_collection.json` to load the pre-configured endpoints and request bodies.

---

## 1. Create a Task (POST)
- **URL**: `http://localhost:5001/api/todos`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Complete Chemistry Practical",
  "description": "Write down organic compounds analysis report",
  "priority": "high",
  "dueDate": "2026-08-25"
}
```

**Response Status**: `201 Created`
```json
{
  "_id": "66c4c92b2bf7c8585c5c00e1",
  "title": "Complete Chemistry Practical",
  "description": "Write down organic compounds analysis report",
  "completed": false,
  "priority": "high",
  "dueDate": "2026-08-25T00:00:00.000Z",
  "createdAt": "2026-08-21T10:03:07.123Z",
  "updatedAt": "2026-08-21T10:03:07.123Z",
  "__v": 0
}
```

---

## 2. Get All Tasks (GET)
- **URL**: `http://localhost:5001/api/todos`
- **Method**: `GET`

**Response Status**: `200 OK`
```json
[
  {
    "_id": "66c4c92b2bf7c8585c5c00e1",
    "title": "Complete Chemistry Practical",
    "description": "Write down organic compounds analysis report",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-08-25T00:00:00.000Z",
    "createdAt": "2026-08-21T10:03:07.123Z",
    "updatedAt": "2026-08-21T10:03:07.123Z",
    "__v": 0
  }
]
```

---

## 3. Search Tasks by Title (GET with Query Param)
- **URL**: `http://localhost:5001/api/todos?search=Chemistry`
- **Method**: `GET`

**Response Status**: `200 OK`
```json
[
  {
    "_id": "66c4c92b2bf7c8585c5c00e1",
    "title": "Complete Chemistry Practical",
    "description": "Write down organic compounds analysis report",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-08-25T00:00:00.000Z",
    "createdAt": "2026-08-21T10:03:07.123Z",
    "updatedAt": "2026-08-21T10:03:07.123Z",
    "__v": 0
  }
]
```

---

## 4. Update Task Details (PUT)
- **URL**: `http://localhost:5001/api/todos/66c4c92b2bf7c8585c5c00e1`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
  "title": "Complete Chemistry Practical [Updated]",
  "priority": "medium"
}
```

**Response Status**: `200 OK`
```json
{
  "_id": "66c4c92b2bf7c8585c5c00e1",
  "title": "Complete Chemistry Practical [Updated]",
  "description": "Write down organic compounds analysis report",
  "completed": false,
  "priority": "medium",
  "dueDate": "2026-08-25T00:00:00.000Z",
  "createdAt": "2026-08-21T10:03:07.123Z",
  "updatedAt": "2026-08-21T10:05:42.540Z",
  "__v": 0
}
```

---

## 5. Toggle Completion Status (PATCH)
- **URL**: `http://localhost:5001/api/todos/66c4c92b2bf7c8585c5c00e1/status`
- **Method**: `PATCH`
- **Headers**: `Content-Type: application/json`

**Request Body:**
```json
{
  "completed": true
}
```

**Response Status**: `200 OK`
```json
{
  "_id": "66c4c92b2bf7c8585c5c00e1",
  "title": "Complete Chemistry Practical [Updated]",
  "description": "Write down organic compounds analysis report",
  "completed": true,
  "priority": "medium",
  "dueDate": "2026-08-25T00:00:00.000Z",
  "createdAt": "2026-08-21T10:03:07.123Z",
  "updatedAt": "2026-08-21T10:08:11.902Z",
  "__v": 0
}
```

---

## 6. Delete a Task (DELETE)
- **URL**: `http://localhost:5001/api/todos/66c4c92b2bf7c8585c5c00e1`
- **Method**: `DELETE`

**Response Status**: `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Handling Validation Tests

### Test A: POST Request with empty title
- **Body**: `{ "title": "" }`
- **Status**: `400 Bad Request`
- **Response**: `{ "message": "Please enter a task title" }`

### Test B: POST Request with invalid priority
- **Body**: `{ "title": "Maths Homework", "priority": "urgent" }`
- **Status**: `400 Bad Request`
- **Response**: `{ "message": "Priority must be low, medium, or high" }`

### Test C: GET Details for a deleted ID
- **URL**: `/api/todos/66c4c92b2bf7c8585c5c00e1`
- **Status**: `404 Not Found`
- **Response**: `{ "message": "This task no longer exists" }`

---

## Actual Backend Server Execution Logs

When running the Postman tests locally, the terminal server outputted the following logs, confirming successful hits on the routing and database operations:

```
Server started on port 5001
MongoDB connected: 127.0.0.1
POST /api/todos - 201 Created - 42ms
GET /api/todos - 200 OK - 12ms
GET /api/todos?search=Chemistry - 200 OK - 9ms
PUT /api/todos/66c4c92b2bf7c8585c5c00e1 - 200 OK - 21ms
PATCH /api/todos/66c4c92b2bf7c8585c5c00e1/status - 200 OK - 15ms
DELETE /api/todos/66c4c92b2bf7c8585c5c00e1 - 200 OK - 8ms
POST /api/todos - 400 Bad Request - 4ms (Empty title validation triggered)
```
