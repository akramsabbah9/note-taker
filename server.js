/* IMPORT MODULES */
const fs = require("fs");
const path = require("path");
const express = require("express");
const notes = require("./db/db.json"); // notes from db directory


/* GLOBALS & MIDDLEWARE */
// create app and port
const app = express();
// if port isn't an environment variable, set it to 3001
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


/* FUNCTIONS */
// if the note is missing a title or text attribute, return false.
const validateNote = note => {
    if (!note.title || typeof note.title !== "string") {
        console.log("no title!");
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        console.log("no text!");
        return false;
    }
    return true;
};

// add a new note to the noteArray.
const createNewNote = (body, notesArray) => {
    // set id to next possible index
    let newNote = body;
    newNote.id = notesArray.length.toString();
    
    // push note to notes array
    notesArray.push(newNote);
    
    // write the updated notes array to db.json
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 4)
    );

    // return finished data to the POST route for response
    return newNote;
};


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

// add new note to db.json from POST body
app.post("/api/notes", (req, res) => {
    console.log(req.body);
    // if any data in req.body is incorrect, send 400 error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    // push the user-created note to notes, and send the new note back.
    else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

/* MAIN */
app.listen(PORT, () => {
    console.log(`Note Taker started and listening on port ${PORT}.`);
});