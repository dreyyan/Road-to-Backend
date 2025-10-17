# Mongoose Cheat Sheet for Express.js Backend Development

## 1. Setup and Installation
### Initialize a new Express.js project
```bash
mkdir my-app && cd my-app
npm init -y
npm install express mongoose
```

### Connect to MongoDB
```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
```

### Configure Environment Variables
- Install `dotenv`:
  ```bash
  npm install dotenv
  ```
- Create `.env` file:
  ```env
  MONGODB_URI=mongodb://localhost:27017/mydb
  ```
- Load in your app:
  ```javascript
  require('dotenv').config();
  mongoose.connect(process.env.MONGODB_URI);
  ```

## 2. Mongoose Schema Basics
### Define a Schema
```javascript
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
```

### Common Schema Options
- `type`: Specifies the data type (e.g., String, Number, Date, ObjectId).
- `required`: Enforces that a field is mandatory.
- `unique`: Ensures unique values for the field.
- `default`: Sets a default value.
- `ref`: References another model for relationships.

## 3. Mongoose Queries
### Create
```javascript
const user = await User.create({
  email: 'alice@example.com',
  name: 'Alice',
});

const post = await Post.create({
  title: 'My First Post',
  content: 'Hello, world!',
  author: user._id,
});
```

### Read
```javascript
// Find one
const user = await User.findOne({ email: 'alice@example.com' })
  .populate('posts');

// Find many
const users = await User.find({ name: /Alice/i });

// Find by ID
const userById = await User.findById('507f1f77bcf86cd799439011');
```

### Update
```javascript
const updatedUser = await User.findByIdAndUpdate(
  '507f1f77bcf86cd799439011',
  { name: 'Alice Smith' },
  { new: true } // Returns updated document
);
```

### Delete
```javascript
const deletedUser = await User.findByIdAndDelete('507f1f77bcf86cd799439011');
```

### Query Modifiers
- `select`: Choose specific fields.
  ```javascript
  const user = await User.findOne({ email: 'alice@example.com' })
    .select('email name');
  ```
- `populate`: Include related data.
  ```javascript
  const userWithPosts = await User.findById('507f1f77bcf86cd799439011')
    .populate('posts');
  ```
- `where`: Filter results.
  ```javascript
  const posts = await Post.find()
    .where('author').equals(user._id)
    .where('title').regex(/My/i);
  ```

## 4. Express.js Integration
### Example Express.js Server with Mongoose
```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define schemas and models (as shown above)

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('posts');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a user
app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({ email, name });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('posts');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// Disconnect Mongoose on shutdown
process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

## 5. Common Mongoose Features
- **Validation**:
  ```javascript
  const userSchema = new Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+\@.+\..+/, 'Invalid email format'],
    },
  });
  ```
- **Middleware**:
  ```javascript
  userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
  ```
- **Aggregation**:
  ```javascript
  const stats = await Post.aggregate([
    { $match: { author: user._id } },
    { $group: { _id: '$author', totalPosts: { $sum: 1 } } },
  ]);
  ```
- **Virtuals**:
  ```javascript
  userSchema.virtual('fullName').get(function () {
    return this.name || 'Unknown';
  });
  ```

## 6. Tips for Express.js + Mongoose
- **Environment Variables**: Store `MONGODB_URI` in `.env` for security.
- **Middleware**: Use `express.json()` to parse JSON request bodies.
- **Async/Await**: Wrap queries in `try/catch` for error handling.
  ```javascript
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  ```
- **Population**: Use `populate` to fetch related documents.
  ```javascript
  const post = await Post.create({
    title: 'New Post',
    content: 'Content here',
    author: user._id,
  });
  await post.populate('author');
  ```
- **Performance**: Use `lean()` for faster queries when you don’t need Mongoose documents.
  ```javascript
  const users = await User.find().lean();
  ```
- **Transactions** (MongoDB 4.0+):
  ```javascript
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.create([{ email: 'bob@example.com', name: 'Bob' }], { session });
    await Post.create([{ title: 'Post', content: 'Content', author: user._id }], { session });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
  ```

## 7. Useful Resources
- Mongoose Docs: https://mongoosejs.com/docs/
- Express.js Docs: https://expressjs.com/
- MongoDB Docs: https://www.mongodb.com/docs/
- Example Project: https://github.com/Automattic/mongoose/tree/master/examples