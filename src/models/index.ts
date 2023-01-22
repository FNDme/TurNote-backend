import { User } from './user';
import { Note } from './note';
import { Contribution } from './contribution';

const user = User;
const note = Note;
const contribution = Contribution;

export const db = {
  user,
  note,
  contribution
};