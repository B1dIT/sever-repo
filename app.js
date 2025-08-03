// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Declare express
const express = require('express');
const app = express();

// 3. Enable CORS
const cors = require('cors');
app.use(cors()); // Cho phép tất cả domain gọi API

// 4. Enable parser to read data from client (body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Connect to MongoDB
const mongoose = require('mongoose');

// 👉 Use MONGO_URI from environment variables (secure for deployment)
const database = process.env.MONGO_URI;

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// 6. Import and register routes
const vocabRoute = require('./api/routes/vocabRoute');
vocabRoute(app);

const userRoute = require('./api/routes/userRoute');
userRoute(app);

// 7. Add root route to avoid Render timeout on `/`
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});

// 8. Run server on PORT from environment
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

