/* notes.js: Contains helper functions for notes */
const fs = require("fs");
const path = require("path");

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

// add a new note to the notesArray and db.json files.
const createNewNote = (body, notesArray) => {
    // set id to next possible index
    let newNote = body;
    newNote.id = notesArray.length.toString();
    
    // push note to notes array
    notesArray.push(newNote);
    
    // write the updated notes array to db.json
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArray, null, 4)
    );

    // return finished data to the POST route for response
    return newNote;
};

module.exports = { validateNote, createNewNote };