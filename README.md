<h1 align="center">Blog Platform API</h1>

---

# Prequisites
- Node.js (v24 or later)
- npm (v11 or later)
- MongoDB (v8.0 or later)

# Setup
1. Clone the repository:
```bash
git clone https://github.com/Bhabishworgrg/blog-platform-api.git
cd blog-api
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file and edit it as needed:
```bash
cp .env.example .env
```

# Usage
1. Start the development server:
```bash
npm run dev
```

2. Access the API at `HOST:PORT` you set in the `.env` file.
> The default is `http://localhost:3000`.

---

# Endpoints

## Authentication
### POST `/api/v1/auth/register`: Register a new user

Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Validation:
- Username, email and password are required and must be string values.
- Username: min 5 characters, max 30 characters and unique.
- Email: Must be unique and a valid email format (e.g. `example@email.com`).
- Password: min 8 characters. 

Response:
```json
{
  "message": "User registered successfully."
}
```

### POST `/api/v1/auth/login`: Login a user

Body:
```json
{
  "email": "string",
  "password": "string"
}
```

Validation:
- Email and password are required and must be string values.

Response:
```json
{
  "message": "Login successful."
  "token": "string"
}
```


## Tags
### POST `/api/v1/tags`: Create a new tag

Authentication required. (Bearer token in headers)

Body:
```json
{
  "name": "string"
}
```

Validation:
- Name is required and must be a string value.
- min 1 character, max 50 characters and unique.

Response:
```json
{
  "message": "Tag #<id> created successfully.",
  "data": {
    "name": "string",
    "blogs": [],
    "_id": "string",
    "__v": 0
  }
}
```

### GET `/api/v1/tags`: Get all tags
Response:
```json
{
  "message": "Tags retrieved successfully.",
  "data": [
    {
      "_id": "string",
      "name": "string",
      "blogs": [],
      "__v": 0
    }
  ]
}
```

### PATCH `/api/v1/tags/:id`: Update a tag by ID

Authentication required. (Bearer token in headers)

Body:
```json
{
  "name": "string"
}
```

Validation:
- Name is required and must be a string value.
- min 1 character, max 50 characters and unique.

Response:
```json
{
  "message": "Tag #<id> updated successfully.",
  "data": {
    "_id": "string",
    "name": "string",
    "blogs": [],
    "__v": 0
  }
}
```

### DELETE `/api/v1/tags/:id`: Delete a tag by ID

Authentication required. (Bearer token in headers)

Response:
```json
{
  "message": "Tag #<id> deleted successfully."
}
```


## Blogs
### POST `/api/v1/blogs`: Create a new blog post

Authentication required. (Bearer token in headers)

Body:
```json
{
  "title": "string",
  "description": "string"
  "tags": ["string1", "string2"]
}
```

Validation:
- Title and description are required and must be string values.
- Title: min 10 characters, max 100 characters.
- Description: min 100 characters, max 10,000 characters.
- Tags: optional, must be an array of strings.

Response:
```json
{
  "message": "Blog #<id> created successfully.",
  "data": {
    "title": "string",
    "description": "string",
    "tags": ["string1", "string2"],
    "user": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
    "__v": 0
  }
}
```

### GET `/api/v1/blogs?search=<searchTerm>&sortBy=<field>&sortOrder=<desc|asc>`: Get blogs

Query:
- `search`: To filter blogs by title or description.
- `sortBy`: To sort by `createdAt`, `updatedAt` or `title` (Default is `createdAt`).
- `sortOrder`: `desc` or `asc`.

Response:
```json
{
  "message": "Blogs retrieved successfully.",
  "data": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "tags": [
        {
            "_id": "string",
            "name": "string"
        }
      ],
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
      "__v": 0
    }
  ]
}
```

### GET `/api/v1/blogs/:id`: Get a blog by ID

Response:
```json
{
  "message": "Blog #<id> retrieved successfully.",
  "data": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "tags": [
      {
        "_id": "string",
        "name": "string"
      }
    ],
    "user": {
      "_id": "string",
      "username": "string",
      "email": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
    "__v": 0
  }
}
```

### PATCH `/api/v1/blogs/:id`: Update a blog by ID

Authentication required. (Bearer token in headers)

Body:
```json
{
  "title": "string",
  "description": "string",
  "tags": ["string1", "string2"]
}
```

Validation:
- Title and description are required and must be string values.
- Title: min 10 characters, max 100 characters.
- Description: min 100 characters, max 10,000 characters.
- Tags: optional, must be an array of strings.

Response:
```json
{
  "message": "Blog #<id> updated successfully.",
  "data": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "tags": ["string1", "string2"],
    "user": "string",
    "createdAt": "string",
    "updatedAt": "string"
    "__v": 0
  }
}
```

### DELETE `/api/v1/blogs/:id`: Delete a blog by ID

Authentication required. (Bearer token in headers)

Response:
```json
{
  "message": "Blog #<id> deleted successfully."
}
```


## Comments
### POST `/api/v1/blogs/:blogId/comments`: Create a comment to a blog post

Authentication required. (Bearer token in headers)

Body:
```json
{
  "content": "string"
}
```

Validation:
- Content is required and must be a string value.
- min 1 character, max 500 characters.

Response:
```json
{
  "message": "Comment #<id> created successfully.",
  "data": {
    "blog": "string",
    "content": "string",
    "user": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
    "__v": 0
  }
}
```

### GET `/api/v1/blogs/:blogId/comments?search=<searchTerm>&sortBy=<field>&sortOrder=<desc|asc>`: Get comments for a blog post

Query:
- `search`: To filter comments by `content`.
- `sortBy`: To sort by `createdAt`, `updatedAt` or `content` (Default is `createdAt`).
- `sortOrder`: `desc` or `asc`.

Response:
```json
{
  "message": "Comments retrieved successfully.",
  "data": [
    {
      "_id": "string",
      "blog": "string",
      "content": "string",
      "user": {
        "_id": "string",
        "username": "string",
        "email": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
      "__v": 0
    }
  ]
}
```

### PATCH `/api/v1/comments/:id`: Update a comment by ID

Authentication required. (Bearer token in headers)

Body:
```json
{
  "content": "string"
}
```

Validation:
- Content is required and must be a string value.
- min 1 character, max 500 characters.

Response:
```json
{
  "message": "Comment #<id> updated successfully.",
  "data": {
    "_id": "string",
    "blog": "string",
    "content": "string",
    "user": "string",
    "createdAt": "string",
    "updatedAt": "string"
    "__v": 0
  }
}
```

### DELETE `/api/v1/comments/:id`: Delete a comment by ID

Authentication required. (Bearer token in headers)

Response:
```json
{
  "message": "Comment #<id> deleted successfully."
}
```

---

# Possible Future Improvements
- Add pagination to endpoints of blogs, comments.
- Implement authorization to restrict users to only create, update, or delete their own blogs and comments. (Currently, users can perform this by merely being authenticated)
- Implement admin role to manage tags. (Currently, any authenticated user can create, update, or delete tags)
- Implement rate limiting to prevent abuse of the API.

---
