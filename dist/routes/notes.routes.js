"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRoutes = void 0;
const middlewares_1 = require("../middlewares");
const controller = __importStar(require("../controllers/notes.controller"));
function notesRoutes(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });
    app.get("/api/notes/public", controller.getPublicNotes);
    app.get("/api/user/notes", middlewares_1.middlewares.authJwt.verifyToken, controller.getUserNotes);
    app.get("/api/notes", middlewares_1.middlewares.authJwt.verifyToken, controller.getNotes);
    app.post("/api/notes", middlewares_1.middlewares.authJwt.verifyToken, controller.createNote);
    app.get("/api/notes/:id", middlewares_1.middlewares.authJwt.verifyToken, controller.getNote);
    app.get("/api/notes/public/:id", controller.getPublicNote);
    app.put("/api/notes/:id", middlewares_1.middlewares.authJwt.verifyToken, controller.updateNote);
    app.delete("/api/notes/:id", middlewares_1.middlewares.authJwt.verifyToken, controller.deleteNote);
    app.get("/api/notes/tags/public/:tag", controller.getPublicNotesByTag);
    app.get("/api/notes/tags/:tag", middlewares_1.middlewares.authJwt.verifyToken, controller.getNotesByTag);
    app.post("/api/notes/:id/tag", middlewares_1.middlewares.authJwt.verifyToken, controller.addTag);
    app.delete("/api/notes/:id/tag", middlewares_1.middlewares.authJwt.verifyToken, controller.removeTag);
    // app.post(
    //   "/api/notes/:id/shareWith",
    //   middlewares.authJwt.verifyToken,
    //   controller.shareNoteWithUser
    // )
    // app.delete(
    //   "/api/notes/:id/shareWith",
    //   middlewares.authJwt.verifyToken,
    //   controller.unshareNoteWithUser
    // )
    // app.post(
    //   "/api/notes/:id/rate",
    //   middlewares.authJwt.verifyToken,
    //   controller.rateNote
    // );
    // app.delete(
    //   "/api/notes/:id/rate",
    //   middlewares.authJwt.verifyToken,
    //   controller.unrateNote
    // );
}
exports.notesRoutes = notesRoutes;
