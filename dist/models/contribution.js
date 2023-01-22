"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contribution = exports.ContributionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ContributionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    noteRef: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Note',
        required: true,
    },
    changes: {
        type: String,
        required: true,
        trim: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
exports.Contribution = (0, mongoose_1.model)('Contribution', exports.ContributionSchema);
