import * as notesController from './notes.controller';

export const allAccess = (req: any, res: any) => {
  notesController.getPublicNotes(req, res);
};

export const userBoard = (req: any, res: any) => {
  notesController.getUserNotes(req, res);
};