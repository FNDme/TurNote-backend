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
  console.log('updateNote');
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

// export const shareNoteWithUser = (req: any, res: any) => {
//   const id = req.params.id;
//   const userId = req.body.userId;

//   Note
//     .findById(id)
//     .exec((err: any, note: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!note) {
//         return res.status(404).send({ message: "Note Not found." });
//       }

//       if (note.author != req.userId) {
//         return res.status(401).send({ message: "Unauthorized!" });
//       }

//       if (note.sharedWith.some((sharedWith: any) => sharedWith.user == userId && sharedWith.permission == req.body.permission)) {
//         return res.status(400).send({ message: "User already shared with." });
//       }

//       if (note.sharedWith.some((sharedWith: any) => sharedWith.user == userId)) {
//         note.sharedWith.forEach((sharedWith: any) => {
//           if (sharedWith.user == userId) {
//             sharedWith.permission = req.body.permission;
//           }
//         });
//         note.save((err: any, note: any) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
//           res.send(note);
//         });
//         return;
//       }
      
//       if (note.author == userId) {
//         return res.status(400).send({ message: "User is the author." });
//       }

//       User
//         .findById(userId)
//         .exec((err: any, user: any) => {
//           if (err) {
//             res.status(500).send({ message: err });
//             return;
//           }
          
//           if (!user) {
//             return res.status(404).send({ message: "User Not found." });
//           }

//           note.sharedWith.push({ user: userId, permission: req.body.permission });

//           note.save((err: any, note: any) => {
//             if (err) {
//               res.status(500).send({ message: err });
//               return;
//             }

//             res.send(note);
//           });
//         }
//       );
//     }
//   );
// }

// export const unshareNoteWithUser = (req: any, res: any) => {
//   const id = req.params.id;
//   const userId = req.body.userId;

//   Note
//     .findById(id)
//     .exec((err: any, note: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!note) {
//         return res.status(404).send({ message: "Note Not found." });
//       }

//       if (note.author != req.userId) {
//         return res.status(401).send({ message: "Unauthorized!" });
//       }

//       if (!note.sharedWith.some((sharedWith: any) => sharedWith.user == userId)) {
//         return res.status(400).send({ message: "User is not shared with." });
//       }

//       note.sharedWith = note.sharedWith.filter((sharedWith: any) => sharedWith.user != userId);

//       note.save((err: any, note: any) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         res.send(note);
//       });
//     }
//   );
// }

// export const shareNoteWithUser = (req: any, res: any) => {
//   const id = req.params.id;

//   Note
//     .findById
//     (id)
//     .exec((err: any, note: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!note) {
//         return res.status(404).send({ message: "Note Not found." });
//       }

//       if (note.author != req.userId) {
//         return res.status(401).send({ message: "Unauthorized!" });
//       }

//       if (note.sharedWith.includes(req.body.userId)) {
//         return res.status(400).send({ message: "User is already shared with." });
//       }

//       if (note.author == req.body.userId) {
//         return res.status(400).send({ message: "User is already the author." });
//       }

//       if (req.body.userId == "") {
//         return res.status(400).send({ message: "User ID is empty." });
//       }

//       if (req.body.permission !== "read" && req.body.permission !== "read-write" && req.body.permission !== "admin") {
//         return res.status(400).send({ message: "Permission is invalid." });
//       }

//       if (note.sharedWith.includes

//       if (!isInArray) {
//         note.sharedWith.push(
//           {
//             user: req.body.userId,
//             permission: req.body.permission ? req.body.permission : "read",
//           }
//         );
//       }

//       note.save((err: any, note: any) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         res.send(note);
//       });
//     }
//   );
// }