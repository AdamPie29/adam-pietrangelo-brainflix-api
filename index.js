// Sets up routers and express server

const router = require('./routes/videos');
const express = require('express');
const videosRoutes = require('./routes/videos.js');
const app = express();
const cors = require("cors");

require('dotenv').config();
const { PORT } = process.env;


// Enables CORS
app.use(cors());
app.use(express.json());

// Serves static content from node server
app.use("/static", express.static("public"));

app.use("/", videosRoutes);

app.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
});
