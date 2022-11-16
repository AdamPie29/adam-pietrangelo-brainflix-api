const { response } = require("express");
const express = require("express");

const router = express.Router();

router.get("/videos", (request , response)=> {
    response.send(["test"])
});

router.get("./videos/:id", (request , response)=> {
    response.send(["testing"])
})

module.exports = router;