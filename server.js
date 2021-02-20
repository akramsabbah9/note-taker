/* IMPORT MODULES */
const path = require("path");
const express = require("express");
const notes = require("./db/db.json"); // notes from db directory


/* GLOBALS & MIDDLEWARE */
// create app and port
const app = express();
// if port isn't an environment variable, set it to 3001
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));


/* FUNCTIONS */


/* ROUTING */
// HTML ROUTES:
// load the index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// load the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API ROUTES:
// read notes from db.json and send to user
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// TODO: add new note to db.json from POST body
app.post("/api/notes", (req, res) => {
    ;
});

/* MAIN */
app.listen(PORT, () => {
    console.log(`Note Taker started and listening on port ${PORT}.`);
});