const mongoose = require('mongoose'),
  MONGO_URI = process.env.DB_STRING.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD
  );

const connect = async () => {
  try {
    mongoose.connect(MONGO_URI).then(() => console.log('🗄️ DB CONNECTED 🗄️'));
  } catch (error) {
    console.log('🔴 ERROR DB \n🔴', error);
  }
};
// connect();
module.exports = { connect };
