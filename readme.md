# Blog Project API with TypeScript, Express, and MongoDB

## Overview

The Blog Project API is a backend service for a blogging platform. It provides secure authentication, role-based access control, and features for managing blogs and users. The platform distinguishes between Admin and User roles, ensuring functionality and security for both roles.

---

## Technologies

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Zod for request validation**
- **Authentication:** JSON Web Tokens (JWT)
- **Formatting and Linting:** Prettier, ESLint
- **Version Control:** Git

---

## Installation

### 1. Clone the Repository

git clone

```bash
git clone https://github.com/IshtyMahin/Assignment-3-blogProject.git
cd Assignment-3-blogProject
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. Then, run:

```bash
npm install
```

This will install all required dependencies listed in the package.json.

### 3. Environment Variables

Create a .env file in the root directory and add your MongoDB connection string and any other required configurations.

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/mydatabase?retryWrites=true&w=majority
```

### 4. Build and Run

- For development, run:

```bash
npm run start:dev
```

```bash
npm run build
npm run start:prod
```

### 5. Lint and Format

- To lint the code:

```bash
npm run lint
```

```bash
npm run lint:fix
```

```bash
npm run prettier
```

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

####

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

- `search=technology`: Filters blogs containing the term "technology" in the title or content.
- `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
- `sortOrder=desc`: Sorts in descending order (newest blogs first).
- `filter=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

## Admin Actions

### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:** `Authorization: Bearer

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

####

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

---
