"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesByTag = exports.getPublicNotesByTag = exports.unrateNote = exports.rateNote = exports.removeTag = exports.addTag = exports.deleteNote = exports.updateNote = exports.getNote = exports.createNote = exports.getNotes = exports.getUserNotes = exports.getPublicNote = exports.getPublicNotes = void 0;
const models_1 = require("../models");
const Note = models_1.db.note;
const getPublicNotes = (req, res) => {
    Note.find({ isPublic: true })
        .exec((err, notes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(notes);
    });
};
exports.getPublicNotes = getPublicNotes;
const getPublicNote = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        if (!note.isPublic) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        res.send(note);
    });
};
exports.getPublicNote = getPublicNote;
const getUserNotes = (req, res) => {
    Note.find({ author: req.userId })
        .exec((err, notes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send(notes);
    });
};
exports.getUserNotes = getUserNotes;
const getNotes = (req, res) => {
    Note.find({ $or: [{ author: req.userId }, { isPublic: true }] })
        .exec((err, notes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!notes) {
            return res.status(404).send({ message: "Notes Not found." });
        }
        res.send(notes);
    });
};
exports.getNotes = getNotes;
const createNote = (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author ? req.body.author : req.userId,
        isPublic: req.body.isPublic ? req.body.isPublic : false,
        tags: req.body.tags ? req.body.tags : []
    });
    note.save((err, note) => {
        if (err) {
            res.status(500).send({ message: 'Error creating note:' + err });
            return;
        }
        res.send(note);
    });
};
exports.createNote = createNote;
const getNote = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        if (note.author != req.userId && !note.isPublic) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        res.send(note);
    });
};
exports.getNote = getNote;
const updateNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        if (note.author != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        res.send({ message: "Note was updated successfully." });
    });
};
exports.updateNote = updateNote;
const deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id, { useFindAndModify: false }, (err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        if (note.author != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        res.send({ message: "Note was deleted successfully!" });
    });
};
exports.deleteNote = deleteNote;
const addTag = (req, res) => {
    const id = req.params.id;
    Note
        .findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        note.tags.push(req.body.tag);
        note.save((err, note) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(note);
        });
    });
};
exports.addTag = addTag;
const removeTag = (req, res) => {
    const id = req.params.id;
    Note
        .findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        note.tags.pull(req.body.tag);
        note.save((err, note) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(note);
        });
    });
};
exports.removeTag = removeTag;
const rateNote = (req, res) => {
    const id = req.params.id;
    if (req.body.rating > 5 || req.body.rating < 0) {
        return res.status(400).send({ message: "Rating must be between 1 and 5." });
    }
    Note
        .findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        note.rating.push(req.body.rating);
        note.save((err, note) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(note);
        });
    });
};
exports.rateNote = rateNote;
const unrateNote = (req, res) => {
    const id = req.params.id;
    Note
        .findById(id)
        .exec((err, note) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!note) {
            return res.status(404).send({ message: "Note Not found." });
        }
        note.rating.pull(req.body.rating);
        note.save((err, note) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send(note);
        });
    });
};
exports.unrateNote = unrateNote;
const getPublicNotesByTag = (req, res) => {
    const tag = req.params.tag;
    Note.find({ tags: tag, isPublic: true })
        .exec((err, notes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!notes) {
            return res.status(404).send({ message: "Notes Not found." });
        }
        res.send(notes);
    });
};
exports.getPublicNotesByTag = getPublicNotesByTag;
const getNotesByTag = (req, res) => {
    const tag = req.params.tag;
    const author = req.userId;
    Note.find({ tags: tag, $or: [{ author: author }, { isPublic: true }] })
        .exec((err, notes) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!notes) {
            return res.status(404).send({ message: "Notes Not found." });
        }
        res.send(notes);
    });
};
exports.getNotesByTag = getNotesByTag;
