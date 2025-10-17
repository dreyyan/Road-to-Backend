# Mongoose | Notes
## 1. Install Dependencies
```powershell
npm install dotenv  # Install dotenv
```

## 2. Add to your .env:
```js
MONGO_URI=mongodb://localhost:27017/mydb
```

## 3. Add DB connection setup to your express app:
```js
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
```

## 4. Add CRUD Operations:
```js
const users = await User.find();                                    // [GET]
const user = await User.findById(req.params.id);                    // [GET]
const newUser = await User.create({ name, email, age });            // [POST]
const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });                                                            // [PUT]
const deletedUser = await User.findByIdAndDelete(req.params.id);    // [DELETE]
```

## 5. Run MongoDB server (must run in the background):
```powershell
mongod
```