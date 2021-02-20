/* apiRoutes/index.js: Contains all api endpoints to get and create notes */
const router = require("express").Router();
const { readNotes, validateNote, createNewNote, deleteNote } = require("../../lib/notes");

// read notes from db.json and send to the user.
router.get("/notes", (req, res) => {
    res.json(readNotes());
});

// add new note to the notes array in db.json from the POST body.
router.post("/notes", (req, res) => {
    // if any data in req.body is incorrect, send 400 error
    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted.");
    }
    // otherwise, push the user-created note to notes, and send the new note back.
    else {
        const note = createNewNote(req.body);
        res.json(note);
    }
});

// delete note from the notes array in db.json.
router.delete("/notes/:id", (req, res) => {
    const note = deleteNote(req.params.id);
    // if deletion was successful, send back the deleted note.
    if (note) {
        res.json(note);
    }
    // otherwise, send 404 error.
    else {
        res.status(404).send(`Could not find a note with id of ${req.params.id}.`);
    }
});

module.exports = router;