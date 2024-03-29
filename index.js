require("dotenv").config();
require("./models/db.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const checkAuth = require('./middlewares/checkAuth');
const doubtRoutes = require("./routes/doubtRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const Doubt = require('./models/doubtModel.js');
const User = require("./models/userModel.js");

const app = express();
app.use(cookieParser());
app.use(cors());
    

// Just to see if the checkout happens successfully or not.

// check for authenticated users (custom middleware)
app.use(checkAuth);


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


// routes
app.use('/doubts', doubtRoutes);
app.use(userRoutes);


// home route
app.get('/', async (req, res) => {
    const currentUser = req.user;

    try {
        const doubts = await Doubt.find({}).populate('author');
        doubts.reverse();
        // console.log(currentUser);
        const guest = "Guest";
        return res.json({doubts : doubts, currentUser : currentUser});
    } catch (error) {
        console.log(error);
    }
})


// category wise listing routes
app.get('/r/:category', async (req, res) => {

    const currentUser = req.user;
    const category = req.params.category;
    try {
        const doubts = await Doubt.find({ category: category }).populate('author');
        return res.json({doubts : doubts, currentUser : currentUser});
    } catch (error) {
        console.log(error);
    }
})


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening at PORT: ${process.env.PORT || 4000}`)
});

