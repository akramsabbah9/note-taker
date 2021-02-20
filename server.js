/* IMPORT MODULES */
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");


/* GLOBALS & MIDDLEWARE */
// create app and port
const app = express();
// if port isn't an environment variable, set it to 3001
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); // parse strings & arrays
app.use(express.json()); // parse json
app.use(express.static("public"));

app.use("/api", apiRoutes); // add /api before an apiRoute endpoint
//app.use("/", htmlRoutes); // add / before an htmlRoute endpoint (default)


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

/* MAIN */
app.listen(PORT, () => {
    console.log(`Note Taker started and listening on port ${PORT}.`);
});