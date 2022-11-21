const express = require("express");
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { PORT } = process.env;


router.get("/videos", (request , response)=> {
    // Get existing contents of the video details file
    const videosJSONString = fs.readFileSync("./data/video-details.json");
    let videos = JSON.parse(videosJSONString);
    // Map out the videos from parsed video details file
    const filteredVideos = videos.map((video)=> {
        const nextVideo = {}
        {
            nextVideo.id = video.id
            nextVideo.title = video.title
            nextVideo.channel = video.channel
            nextVideo.image = video.image
        }
        return nextVideo;
    });
    response.send(filteredVideos);
    response.status(200);

});

router.get("/videos/:id", (request , response)=> {
    // Gets video id that matches selected video
    const id = request.params.id;
    const vidJSON = fs.readFileSync("./data/video-details.json");
    let videos = JSON.parse(vidJSON);
    const video = videos.find(video => video.id === id);

    response.json(video);
    response.status(200);
})

router.post("/videos", (request , response)=> {
    // Posts newly created video object uploaded from Upload Page
    const video = request.body;
    video.id = uuidv4();
    video.channel = "Adam's Fun Biking Times";
    video.image = `http://localhost:${PORT}/static/images/Upload-video-preview.jpg`;
    video.views = 0;
    video.likes = 0;
    video.comments = [];
    video.timestamp = Date.now();
    
    // Writes object to the video details file
    const uploadJSONString = fs.readFileSync("./data/video-details.json");
    let uploadVideo = JSON.parse(uploadJSONString);
    uploadVideo.push(video);
    fs.writeFileSync("./data/video-details.json", JSON.stringify(uploadVideo));
    response.status(201).json(video);
})

module.exports = router;