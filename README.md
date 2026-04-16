# TaskFlow API & UI

A clean full-stack task manager built with **Node.js**, **Express**, **MongoDB**, and a lightweight browser UI.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-1f6f5c?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-2f3b48?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-0e8f7e?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-e95f3d?style=for-the-badge)](https://mongoosejs.com/)

## Overview

This project provides:

- REST API for task CRUD operations
- Input validation with `express-validator`
- Pagination for task listing (`page` + `limit`)
- Static frontend (HTML/CSS/JS) for create, edit, delete, and list flows
- Centralized error formatting

## Screens

- Dashboard: `public/index.html`
- Edit Task: `public/task.html`

## Tech Stack

- Backend: `Express 5`, `Mongoose`, `express-validator`, `dotenv`
- Frontend: vanilla JS + CSS + HTML
- Dev tool: `nodemon`

## Project Structure

```txt
.
|-- controllers/
|-- middlewares/
|-- models/
|-- public/
|-- routes/
|-- utils/
|-- index.js
`-- package.json
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create `.env`

Use this template:

```env
PORT=3000
MOGOOSE_DB_URL=your_mongodb_connection_string
API_URL=api/v1
DEFAULT_LIMIT=10
```

### 3) Run the app

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:3000
```

API base path:

```txt
/api/v1/tasks
```

## API Reference

### Get all tasks (with pagination)

`GET /api/v1/tasks?page=1&limit=10`

Response shape:

```json
{
  "tasks": [
    {
      "_id": "64f...",
      "name": "Read docs",
      "completed": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 42,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get one task

`GET /api/v1/tasks/:id`

### Create task

`POST /api/v1/tasks`

Body:

```json
{
  "name": "Buy milk",
  "completed": false
}
```

### Update task (partial)

`PATCH /api/v1/tasks/:id`

Body:

```json
{
  "name": "Buy milk and eggs",
  "completed": true
}
```

### Delete task

`DELETE /api/v1/tasks/:id`

## Validation Rules

- `id`: required, must be a valid MongoDB ObjectId
- `name`: required for create/update, max length 20
- `completed`: optional, must be boolean when sent
- `limit` and `page`: optional numeric query params

## Error Format

Errors are returned in this structure:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Useful Commands

```bash
npm run dev
```

## Notes

- `__v` is removed from JSON responses in the Mongoose schema transform.
- Static frontend files are served from the `public/` folder.

## Security

- Never commit real database credentials.
- Keep `.env` private and rotate secrets immediately if exposed.

## License

ISC

