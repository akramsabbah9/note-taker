/* apiRoutes/index.js: Contains all api endpoints to get and create notes */
const router = require("express").Router();
const { validateNote, createNewNote } = require("../../lib/notes");
const notes = require("../../db/db"); // notes from db directory

// read notes from db.json and send to user
router.get("/notes", (req, res) => {
    res.json(notes);
});

// add new note to notes array and db.json from POST body
router.post("/notes", (req, res) => {
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

// TODO: delete note from notes array and db.json (TODO: need id npm package first)
router.delete("/notes/:id", (req, res) => {
    // if id is valid, delete corresponding note from notes array
    // notes.splice(req.params.id, 1);
    
    // after deleting, write new array to db.json and return 
    /* fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 4)
    );*/
    res.send(`deleted note with id: ${req.params.id}.`);
});

module.exports = router;