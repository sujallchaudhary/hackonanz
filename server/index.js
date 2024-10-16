const express = require('express');
const connection = require('./database/connection');
const cors = require('cors');
require('dotenv').config();
const app = express();

connection();

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', userRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port http://localhost:' + process.env.PORT);
});