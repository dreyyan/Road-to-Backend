# Prisma Cheat Sheet for Express.js Backend Development

## 1. Setup and Installation
### Initialize a new Express.js project
```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

### Install Prisma
```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

### Configure Prisma
- Update `schema.prisma` with your database connection (e.g., PostgreSQL, MySQL, SQLite):
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  generator client {
    provider = "prisma-client-js"
  }
  ```
- Set `DATABASE_URL` in `.env`:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
  ```

### Generate Prisma Client
```bash
npx prisma generate
```

### Run Migrations
```bash
npx prisma migrate dev --name init
```

## 2. Prisma Schema Basics
### Define a Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

### Common Schema Attributes
- `@id`: Marks a field as the primary key.
- `@default(autoincrement())`: Auto-increments the field.
- `@unique`: Ensures unique values.
- `@relation`: Defines relationships between models.
- `?`: Makes a field optional.

## 3. Prisma Client Usage
### Initialize Prisma Client in Express.js
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

### Basic CRUD Operations
#### Create
```javascript
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    posts: {
      create: { title: 'My first post', content: 'Hello, world!' },
    },
  },
});
```

#### Read
```javascript
// Find one
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  include: { posts: true },
});

// Find many
const users = await prisma.user.findMany({
  where: { name: { contains: 'Alice' } },
});
```

#### Update
```javascript
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Smith' },
});
```

#### Delete
```javascript
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});
```

### Query Modifiers
- `select`: Choose specific fields.
  ```javascript
  const user = await prisma.user.findUnique({
    where: { id: 1 },
    select: { email: true, name: true },
  });
  ```
- `include`: Include related data.
  ```javascript
  const userWithPosts = await prisma.user.findUnique({
    where: { id: 1 },
    include: { posts: true },
  });
  ```
- `where`: Filter results.
  ```javascript
  const posts = await prisma.post.findMany({
    where: { authorId: 1, title: { startsWith: 'My' } },
  });
  ```

## 4. Express.js Integration
### Example Express.js Server with Prisma
```javascript
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

// Create a user
app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: { email, name },
  });
  res.json(user);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Error Handling
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Disconnect Prisma Client on shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

## 5. Common Prisma CLI Commands
- `npx prisma init`: Set up Prisma in your project.
- `npx prisma generate`: Generate Prisma Client.
- `npx prisma migrate dev --name <migration-name>`: Create and apply migrations.
- `npx prisma db pull`: Introspect an existing database.
- `npx prisma db seed`: Run a seed script.
- `npx prisma studio`: Open a visual database browser.

## 6. Tips for Express.js + Prisma
- **Environment Variables**: Store sensitive data like `DATABASE_URL` in `.env`.
- **Middleware**: Use `express.json()` for parsing JSON request bodies.
- **Async/Await**: Always use `try/catch` with Prisma queries to handle errors.
  ```javascript
  try {
    const user = await prisma.user.findUnique({ where: { id: 1 } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  ```
- **Relations**: Use `include` or `connect` for handling relationships.
  ```javascript
  const post = await prisma.post.create({
    data: {
      title: 'New Post',
      content: 'Content here',
      author: { connect: { id: 1 } },
    },
  });
  ```
- **Performance**: Use `select` to fetch only needed fields to reduce query overhead.
- **Transactions**: Use `prisma.$transaction` for atomic operations.
  ```javascript
  const result = await prisma.$transaction([
    prisma.user.create({ data: { email: 'bob@example.com', name: 'Bob' } }),
    prisma.post.create({ data: { title: 'Post', content: 'Content', authorId: 1 } }),
  ]);
  ```

## 7. Useful Resources
- Prisma Docs: https://www.prisma.io/docs/
- Express.js Docs: https://expressjs.com/
- Example Project: https://github.com/prisma/prisma-examples