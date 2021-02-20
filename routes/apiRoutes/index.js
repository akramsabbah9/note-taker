/* apiRoutes/index.js: Contains all api endpoints to get and create notes */
const router = require("express").Router();
const { validateNote, createNewNote } = require("../../lib/notes");
const notes = require("./db/db.json"); // notes from db directory

// read notes from db.json and send to user
router.get("/notes", (req, res) => {
    res.json(notes);
});

// add new note to db.json from POST body
router.post("/notes", (req, res) => {
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

module.exports = router;