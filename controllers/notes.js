// Models
const Note = require("../models/notes")

exports.listNotes = (req, res) => {
    Note.find({ user: req.user._id }, (err, notes) => {
        if(err) throw err
        else {
            res.render("user/notes", {
                notes
            })
        }
    })
}

exports.newNote = (req, res) => {
    res.render("user/addnotes")
}

exports.addNote = (req, res) => {
    let note = new Note()
    note.user = req.user._id
    note.title = req.body.title
    note.content = req.body.content
    note.save((err) => {
        req.flash("success", "Notes have been added successfully")
        res.redirect("/user/notes")
    })
}

exports.viewNote = (req, res) => {
    Note.findById(req.params.id, (err, note) => {
        if(err) throw err
        else {
            res.render("user/note", {
                note
            })
        }
    })
}