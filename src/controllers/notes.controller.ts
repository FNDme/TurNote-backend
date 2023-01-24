import { db } from "../models";
const Note = db.note;

export const getPublicNotes = (req: any, res: any) => {
  Note.find({ isPublic: true })
    .exec((err: any, notes: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(notes);
    });
}

export const getPublicNote = (req: any, res: any) => {
  const id = req.params.id;
  
  Note.findById(id)
    .exec((err: any, note: any) => {
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
    }
  );
}

export const getUserNotes = (req: any, res: any) => {
  Note.find({ author: req.userId })
    .exec((err: any, notes: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(notes);
    });
}

export const getNotes = (req: any, res: any) => {
  Note.find({ $or: [{ author: req.userId }, { isPublic: true }] })
    .exec((err: any, notes: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notes) {
        return res.status(404).send({ message: "Notes Not found." });
      }

      res.send(notes);
    });
}

export const createNote = (req: any, res: any) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author ? req.body.author : req.userId,
    isPublic: req.body.isPublic ? req.body.isPublic : false,
    tags: req.body.tags ? req.body.tags : []
  });

  note.save((err: any, note: any) => {
    if (err) {
      res.status(500).send({ message: 'Error creating note:' + err });
      return;
    }

    res.send(note);
  });
}

export const getNote = (req: any, res: any) => {
  const id = req.params.id;

  Note.findById(id)
    .exec((err: any, note: any) => {
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
    }
  );
}

export const updateNote = (req: any, res: any) => {
  const id = req.params.id;

  Note.findByIdAndUpdate(id
    , req.body
    , { useFindAndModify: false }
    , (err: any, note: any) => {
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
    }
  );
}

export const deleteNote = (req: any, res: any) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id, { useFindAndModify: false }, (err: any, note: any) => {
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
}

export const addTag = (req: any, res: any) => {
  const id = req.params.id;

  Note
    .findById(id)
    .exec((err: any, note: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!note) {
        return res.status(404).send({ message: "Note Not found." });
      }

      note.tags.push(req.body.tag);

      note.save((err: any, note: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send(note);
      });
    }
  );
}

export const removeTag = (req: any, res: any) => {
  const id = req.params.id;

  Note
    .findById(id)
    .exec((err: any, note: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!note) {
        return res.status(404).send({ message: "Note Not found." });
      }

      note.tags.pull(req.body.tag);

      note.save((err: any, note: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send(note);
      });
    }
  );
}

export const rateNote = (req: any, res: any) => {
  const id = req.params.id;

  if (req.body.rating > 5 || req.body.rating < 0) {
    return res.status(400).send({ message: "Rating must be between 1 and 5." });
  }

  Note
    .findById(id)
    .exec((err: any, note: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!note) {
        return res.status(404).send({ message: "Note Not found." });
      }

      note.rating.push(req.body.rating);

      note.save((err: any, note: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send(note);
      });
    }
  );
}

export const unrateNote = (req: any, res: any) => {
  const id = req.params.id;

  Note
    .findById(id)
    .exec((err: any, note: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!note) {
        return res.status(404).send({ message: "Note Not found." });
      }

      note.rating.pull(req.body.rating);

      note.save((err: any, note: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send(note);
      });
    }
  );
}

export const getPublicNotesByTag = (req: any, res: any) => {
  const tag = req.params.tag;

  Note.find({ tags: tag, isPublic: true })
    .exec((err: any, notes: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notes) {
        return res.status(404).send({ message: "Notes Not found." });
      }

      res.send(notes);
    }
  );
}

export const getNotesByTag = (req: any, res: any) => {
  const tag = req.params.tag;
  const author = req.userId;

  Note.find({ tags: tag, $or: [{ author: author }, { isPublic: true }] })
    .exec((err: any, notes: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!notes) {
        return res.status(404).send({ message: "Notes Not found." });
      }

      res.send(notes);
    }
  );
}
