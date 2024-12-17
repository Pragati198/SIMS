const express = require ('express')
const app  = express()
const mongoose = require('mongoose')
const adminMiddleware = require('./middleware/adminMiddleware');
require('dotenv').config();
const cors = require('cors');

let PORT_NO = 5000, DB_URI='';
if(process.env.ENVIRONMENT == 'dev')
    {
        PORT_NO = process.env.DEV_PORT;
        DB_URI= process.env.DEV_MONGO_URI;
    }

app.use(cors());
app.use(express.json())
mongoose.connect(DB_URI)
app.use(express.urlencoded({extended : true}));

app.use('teacher-pics', express.static('uploads'));

const adminRoute = require('./routes/adminRoute');
app.use('/api/v1/admin',adminRoute);

const schoolRouter = require('./routes/schoolRoute');
app.use('/api/v1/school' , adminMiddleware,schoolRouter)

const studentRouter = require('./routes/studentRoute')
app.use('/api/v1/student', adminMiddleware, studentRouter)

const teahcerRoute = require('./routes/teacherRoute')
app.use('/api/v1/teacher',adminMiddleware, teahcerRoute)

const nonTechRoute = require('./routes/nonTechingRoute')
app.use('/api/v1/nonteaching', adminMiddleware, nonTechRoute)

app.listen(PORT_NO,()=>{
    console.log(`Server running @ ${PORT_NO}`);
})