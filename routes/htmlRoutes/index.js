/* htmlRoutes/index.js: Contains the html endpoints to serve frontend pages */
const path = require("path");
const router = require("express").Router();

// load the index
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// load the notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

module.exports = router;