require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
// const postRoutes = require('./routes/postRoutes')

const app = express()

connectDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)
// app.use('/api/post', postRoutes)

app.get('/', (req, res)=>{
    res.json({ message: "Welcome to the Blog API!" });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})