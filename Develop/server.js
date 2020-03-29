//npm packages 
const express = require("express");
const notes = require("./routes/apinotes");
const path = require("path");

//connect to PORT 3000
const app = express();
const PORT =process.env.PORT || 3000;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", notes);
app.use(express.static("public"));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

//Start up the server
app.listen(PORT, () => console.log('Server started on port: 3000'));