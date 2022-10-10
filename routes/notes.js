const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const cookie = require("cookie-parser");

router.use(cookie());

//Route 1: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("password", "Password"),
  ],
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;

      //if error found return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });

      const savedNotes = await note.save();

      res.json(savedNotes);
    } catch (err) {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "Internal Server error", message: err.message });
    }
  }
);

//Route 2: Send an existing note using: POST "/api/notes/sendnote/:id". Login required
router.post(
  "/sendnote",
  fetchuser,
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { email, title, description, tags } = req.body;

      //if error found return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log(email);
      const userToSend = await User.findOne({ email: email });
      const currentUserId = req.user.id;
      if(userToSend.id==currentUserId){
        return res.json({
          error: "Do not send to yourself!",
        })
      }
      console.log(userToSend);

      const note = new Notes({
        title,
        description,
        tags,
        user: userToSend.id,
      });

      const savedNotes = await note.save();

      res.json(savedNotes);
    } catch (err) {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "Internal Server error", message: err.message });
    }
  }
);

//Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tags) {
      newNote.tags = tags;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ error: "Internal Server error", message: err.message });
  }
});

//Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found!");
    }

    //Allow deletion if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ error: "Internal Server error", message: err.message });
  }
});

router.delete("/signout", (req, res) => {
  res.redirect("/console");
});

module.exports = router;
