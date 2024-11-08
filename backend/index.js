const express = require("express")
const cors = require('cors');
const app = express()
const port = 5000
const userRouter = require("./routes/CreateUser")
const foodRouter = require("./routes/FoodRouter")

const mongodb = require('./db');
mongodb();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/api' , userRouter)
app.use('/api' , foodRouter)
app.get("/" ,(req , res) => {
    res.send("Hello Worlds")
})

app.listen(port , ()=>{
    console.log("Listening to the port")
})