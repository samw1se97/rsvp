const mongoose = require('mongoose'),
  dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

// ====== Data Base Conection
const db = require('./DL/db');
db.connect();

const PORT = process.env.PORT || 2025;
app.listen(PORT, () => {
  console.log(`⚡ Server is running on http://localhost:${PORT} ⚡`);
});
