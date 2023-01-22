"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const user_1 = require("./user");
const note_1 = require("./note");
const contribution_1 = require("./contribution");
const user = user_1.User;
const note = note_1.Note;
const contribution = contribution_1.Contribution;
exports.db = {
    user,
    note,
    contribution
};
