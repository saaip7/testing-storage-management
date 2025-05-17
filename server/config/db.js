const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB is connected');
    } catch (err) {
        console.error('Error connection to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;