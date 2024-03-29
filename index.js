// index.js
// const ConnectToDB = require('./ConnectToDB');
const express = require('express');
const authRoutes = require('./Routes/Auth');
const protectedRoutes = require('./Routes/Protected');
const ConnectToDB = require('./ConnectToDB');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/Auth', authRoutes);
app.use('/api/Protected', protectedRoutes);

ConnectToDB();

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
