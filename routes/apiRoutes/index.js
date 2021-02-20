/* apiRoutes/index.js: Contains all api endpoints to get and create notes */
const router = require("express").Router();
const { readNotes, validateNote, createNewNote } = require("../../lib/notes");
const notes = require("../../db/db"); // notes from db directory

// read notes from db.json and send to the user.
router.get("/notes", (req, res) => {
    res.json(readNotes());
});

// add new note to the notes array in db.json from the POST body.
router.post("/notes", (req, res) => {
    // if any data in req.body is incorrect, send 400 error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    }
    // push the user-created note to notes, and send the new note back.
    else {
        const note = createNewNote(req.body);
        res.json(note);
    }
});

// delete note from the notes array in db.json.
router.delete("/notes/:id", (req, res) => {
    // 1) Update the local version of notes
    // try to find the index of the targeted note by checking all the existing ids.
    targetIndex = notes.findIndex(ele => ele.id === req.params.id);

    // if id is valid, delete corresponding note from notes array
    notes.splice(targetIndex, 1);
    
    // after deleting, write new array to db.json and return 
    // fs.writeFileSync(
    //     path.join(__dirname, "../../db/db.json"),
    //     JSON.stringify(notes, null, 4)
    // );

    res.send(`deleted note with id: ${req.params.id}.`);
});

module.exports = router;