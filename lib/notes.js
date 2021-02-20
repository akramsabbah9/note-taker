/* notes.js: Contains helper functions for notes */
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// path to db.json
const dbPath = path.join(__dirname, "../db/db.json");

// read raw data from db.json and convert to JSON format
const readNotes = () => JSON.parse(fs.readFileSync(dbPath));

// write notes array data to db.json
const writeNotes = data => fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));

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

// add a new note to the db.json file.
const createNewNote = note => {
    // make a new note with a random uuid
    let newNote = { id: uuidv4(), ...note };

    // read notes array from db.json and push new note to it
    let notesArray = readNotes();
    notesArray.push(newNote);
    
    // write the updated notes array to db.json
    writeNotes(notesArray);

    // return finished data to the POST route for response
    return newNote;
};

// delete a note from the db.json file.
const deleteNote = id => {
    // read notes array from db.json
    let notesArray = readNotes();

    // attempt to find the index of a note with this id
    targetIndex = notesArray.findIndex(ele => ele.id === id);

    // if a note is found, delete it from the array and write to db.json
    if (targetIndex !== -1) {
        deletedNote = notesArray.splice(targetIndex, 1)[0];
        writeNotes(notesArray);
        return deletedNote; // return the deleted note (truthy)
    }
    // otherwise, return empty object (falsy)
    return {};
};

module.exports = { readNotes, validateNote, createNewNote, deleteNote };