const express = require("express");
const bodyParser = require('body-parser')

require('dotenv').config()

console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/notes";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const notesRouter = require("./routers/notesRouter");

app.use("/", notesRouter);


app.listen(8000);