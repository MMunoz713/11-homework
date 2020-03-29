const router = require("express").Router();
const fs = require("fs");
const path = require("path");

//Retrieve any saved notes from local machine
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

//adding, attaching ID to note, and deleting note
router.post("/notes", function (req, res) {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")))
    const note = req.body;
    note.id = Math.random();
    db.push(note);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));
    res.send(note);
});

router.delete("/notes/:id", function (req, res) {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")))
    const updatedDb = db.filter(note => note.id != req.params.id);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedDb));
    res.send("File successfully deleted")
})

module.exports = router;