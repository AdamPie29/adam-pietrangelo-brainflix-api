const router = require('./routes/videos');
const express = require('express');

const app = require('express')();


app.use(express.static('public'));
app.use(express.json());

app.use((request, response, next)=> {
    next();
});

const videosRoutes = require('./routes/videos');

app.use("/videos", videosRoutes);

app.listen(8080, ()=> {
    console.log("listening on 8080")
});
