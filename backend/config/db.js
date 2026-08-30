const mongoose = require('mongoose');

const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecompulse';

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection unavailable. Continuing with mock data mode.');
    console.warn(error.message);
  }
};

module.exports = {
  connectDatabase,
};
