require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()

connectDB()
const allowedOrigins = [
    'https://blogs-app-shahidx05.vercel.app',
    'http://127.0.0.1:5500', 
    'http://localhost:5500'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('This website is not authorized to access this data.'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.get('/', (req, res)=>{
    res.json({ message: "Welcome to the Blog API!" });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Example app listening on port ${PORT}`)
})