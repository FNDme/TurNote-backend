import { middlewares } from '../middlewares';
import * as controller from "../controllers/notes.controller";

export function notesRoutes(app: any) {
  app.use(function(req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/notes/public",
    controller.getPublicNotes
  );

  app.get(
    "/api/user/notes",
    middlewares.authJwt.verifyToken,
    controller.getUserNotes
  );

  app.get(
    "/api/notes",
    middlewares.authJwt.verifyToken,
    controller.getNotes
  );

  app.post(
    "/api/notes",
    middlewares.authJwt.verifyToken,
    controller.createNote
  );

  app.get(
    "/api/notes/:id",
    middlewares.authJwt.verifyToken,
    controller.getNote
  );

  app.get(
    "/api/notes/public/:id",
    controller.getPublicNote
  )

  app.put(
    "/api/notes/:id",
    middlewares.authJwt.verifyToken,
    controller.updateNote
  );

  app.delete(
    "/api/notes/:id",
    middlewares.authJwt.verifyToken,
    controller.deleteNote
  );

  app.get(
    "/api/notes/tags/public/:tag",
    controller.getPublicNotesByTag
  );

  app.get(
    "/api/notes/tags/:tag",
    middlewares.authJwt.verifyToken,
    controller.getNotesByTag
  );

  app.post(
    "/api/notes/:id/tag",
    middlewares.authJwt.verifyToken,
    controller.addTag
  );

  app.delete(
    "/api/notes/:id/tag",
    middlewares.authJwt.verifyToken,
    controller.removeTag
  );
}
