//3 declare & enable dotenv to use environment variables
require('dotenv').config();

//1 declare express framework
const express = require('express')
const app = express()

//2 declare & enable cors(to share API)
const cors = require('cors')
//option 1: enable CORS for all frontend domain(flexibility,faster)
app.use(cors())

////option 2: enable CORS for 1 frontend domain(security) 
// var corsOption ={
//     origin: 'http://your-front-end-domain.com',
//     optionSuccessStatus: 200
// }
// app.request(cors(corsOption))

//3) declare & config parser (to get data from client request)
//option1: old version of express => use body parser
// const bodyPaser = require('body-parser')
// const { default: mongoose } = require('mongoose')
// app.use(bodyPaser.urlencoded())
// app.use(bodyPaser.json())

//option2(recommend): new version of parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//4 delcare mongoose to work with mongoDB
const mongoose = require('mongoose')
//delcare database connection string url along with database name
const database = "mongodb+srv://b1dgenz:Hunggame7%40@cluster0.jv47mkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/vocab-builder"
mongoose.connect(database)
.then(() => console.log("connect to db success"))
.catch((err)=> console.error("connect to db failed" + err))

//5) declare and register route
const route = require('./api/routes/vocabRoute')
route(app)

const userRoute = require('./api/routes/userRoute')
userRoute(app)

//6) declare sever port
const port = process.env.PORT || 3001
//7) run sever
app.listen(port, () => {
    console.log("server is running at http://localhost:" + port)
})