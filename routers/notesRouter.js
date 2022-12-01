// notes router

const express = require("express");

const router = express.Router();

const Note = require("../models/notesModel");


router.get("/", async (req, res) => {
    console.log("GET")
    try {
        let notes = await Note.find();

        let notesCollection = {
            items: notes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}notes/`
                },
                collection: {
                    href: `${process.env.BASE_URI}notes/`
                }
            },
            pagination: "Doen we later, maar moet iets staan"
        }

        res.json(notesCollection);
    } catch {
        res.status(500).send()
    }
})

router.get("/:id", (req, res) => {
    console.log("GET")
    res.send(`request for item ${req.params.id}`);
})

router.post("/", async (req, res) => {
    console.log("POST")
    let note = new Note({
        title: "test1",
        body: "test1",
        author: "test1"
    })

    try {
        await note.save();
        res.json(note);
    } catch {
        res.status(500).send()
    }
})

router.delete("/", (req, res) => {
    console.log("DELETE")
    res.json(items);
})

router.options("/", (req, res) => {
    console.log("OPTIONS")
    res.json(items);
})

module.exports = router;