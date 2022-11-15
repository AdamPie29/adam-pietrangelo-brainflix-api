const router = require('./routes/videos');
const express = require('express');

const app = require('express')();

app.use(express.static('public'));

app.use((request, response, next)=> {
    next();
});

const commmonRoutes = require('./routes/videos');

app.use("/videos", commmonRoutes);

app.listen(8080, ()=> {
    console.log("listening on 8080")
});
