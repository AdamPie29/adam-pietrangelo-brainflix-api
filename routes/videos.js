const express = require("express");
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.get("/videos", (request , response)=> {
    const videosJSONString = fs.readFileSync("./data/video-details.json");
    let videos = JSON.parse(videosJSONString);
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
});

router.get("/videos/:id", (request , response)=> {
    const id = request.params.id;
    const vidJSON = fs.readFileSync("./data/video-details.json");
    let videos = JSON.parse(vidJSON);
    const video = videos.find(video => video.id === id);

    response.json(video);
})

router.post("/videos", (request , response)=> {
    const video = request.body;
    video.id = uuidv4();
    video.channel = "Adam's Fun Biking Times";
    video.image = `http://localhost:${PORT}/static/images/Upload-video-preview.jpg`;
    video.views = 0;
    video.likes = 0;
    video.comments = [];
    video.timestamp = Date.now();
    const uploadJSONString = fs.readFileSync("./data/video-details.json");
    let uploadVideo = JSON.parse(uploadJSONString);
    uploadVideo.push(video);
    fs.writeFileSync("./data/video-details.json", JSON.stringify(uploadVideo));
    response.status(201).json(video);
})

module.exports = router;