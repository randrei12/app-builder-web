const mongoose = require('mongoose');
require('dotenv').config();

(async () => await mongoose.connect(process.env.MONGO_URL + '/app-builder'))(); //connect to mongodb
const db = mongoose.connection;
db.createCollection('projects'); //create projects collection