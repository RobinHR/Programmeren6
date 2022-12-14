// notes router

const express = require("express");

const router = express.Router();

const Note = require("../models/notesModel");
const {application} = require("express");


router.get("/", async (req, res) => {
    console.log("GET")

    if(req.header('Accept') != "application/json"){
        res.status(415).send();
    }

    try {
        let notes = await Note.find();

        let notesCollection = {
            items: notes,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}`
                },
                collection: {
                    href: `${process.env.BASE_URI}`
                }
            },
            pagination: "Doen we later, maar moet iets staan"
        }

        res.json(notesCollection);
    } catch {
        res.status(500).send()
    }
})

router.get("/:_id", async (req, res) => {
    console.log("GET")
    // res.send(`request for item ${req.params._id}`);

    try {
        let note = await Note.findById(req.params._id);
        if (note == null) {
            res.status(404).send();
        } else {
            res.json(note);
        }
    } catch {
        res.status(404).send();
    }
})

router.post("/", async (req, res, next) => {
    console.log(req.header("POST middleware to check content-type"))

    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded") {
        res.status(415).send("Content-Type komt niet overeen");
    } else {
        next();
    }
})

router.post("/", async (req, res, next) => {
    console.log(req.header("POST middleware to check empty values"))

    if (req.body.title && req.body.author && req.body.body) {
        next();
    } else {
        res.status(400).send("Post values zijn leeg");
    }
})


router.post("/", async (req, res) => {
    console.log("POST")
    let note = Note({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })

    try {
        await note.save();
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
})

router.put("/:_id", async (req, res, next) => {
    console.log("Middleware to check content type for post")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

router.put("/:_id", async (req, res, next) => {
    console.log("PUT Middleware to check for empty values for post")
    if(req.body.title && req.body.body && req.body.author){
        next();
    } else{
        res.status(400).send();
    }
})

router.put("/:_id", async (req, res) => {

    let note = await Note.findOneAndUpdate(req.params,
        {
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        })

    try {
        note.save();

        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})

router.delete("/:id", async (req, res) => {
    console.log(`DELETE request for detail ${req.params.id}`)

    try {
        let notes = await Note.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch {
        res.status(404).send();
    }
})

router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

router.options("/:id", async (req, res) => {
    console.log(`OPTIONS request for detail ${req.params.id}`);
    res.set({
        'Allow': 'GET, PUT, DELETE, OPTIONS'
    }).send()
})

module.exports = router;