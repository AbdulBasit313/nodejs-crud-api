# Node.js CRUD API with File System

This is a simple CRUD (Create, Read, Update, Delete) API built with Node.js using Express and the `fs` module for file system operations.

The API allows you to manage a list of students stored in a JSON file.

## Branch: `crud-api-with-file-system`

## Getting Started

Follow the steps below to get the project up and running on your local machine.

### Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)

### Installation

### 1. **Clone the repository**

```
git clone https://github.com/AbdulBasit313/nodejs-crud-api
```

### 2. Navigate to the project directory

```
cd nodejs-crud-api
```

### 3. Install the dependencies

```
npm install
```

Install nodemon globally

```
npm i -g nodemon
```

### 4. Run the server

```
nodemon server.js
```

**Verify the server is running**

You should see the message in your terminal:

```
server is running on port 4000
```

## API Endpoints

Now you can visit the following URL to interact with the API:

**Base URL:**

```
http://localhost:4000/api/v1/students
```

**Endpoints**

```
GET /api/v1/students
```

Now you can perform the following operations on this API:

### 1. Retrieve a list of all students

GET /api/v1/students

### 2. Retrieve a student by ID

GET /api/v1/students/:id

### 3. Add a new student

POST /api/v1/students

### 4. Update a student's details

PATCH /api/v1/students/:id

### 5. Delete a student by ID

DELETE /api/v1/students/:id
