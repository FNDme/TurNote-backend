"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.NoteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    collaborators: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    rating: [
        {
            type: Number,
            min: 0,
            max: 5,
        },
    ],
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    isPublic: {
        type: Boolean,
        default: false,
    },
    sharedWith: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
            permission: {
                type: String,
                enum: ['read', 'read-write', 'admin'],
            },
        },
    ],
    created: {
        type: Date,
        default: Date.now,
    },
});
exports.Note = (0, mongoose_1.model)('Note', exports.NoteSchema);
