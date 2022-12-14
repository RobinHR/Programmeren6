// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String,
    author: String
}, { toJSON: {virtuals: true} });

// Export function to create "SomeModel" model class
NoteSchema.virtual('_links').get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}`
            }
        }
    }
)

module.exports = mongoose.model("Note", NoteSchema);