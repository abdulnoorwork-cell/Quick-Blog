import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnection from '../config/dbConnection.js';
import adminRoutes from '../routes/adminRoutes.js'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import blogRoutes from '../routes/blogRoutes.js'

const frontendUrl = process.env.FRONTEND_URL

const Port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const allowedOrigins = [
    frontendUrl
]
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

app.get('/', (req, res) => {
    res.send(`Backend is running`)
})

dbConnection();

export default app;