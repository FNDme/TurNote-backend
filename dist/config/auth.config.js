"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let secret = '';
if (!process.env.SECRET) {
    console.log("No secret found in .env file");
    secret = 'test-secret';
}
else {
    secret = process.env.SECRET;
}
module.exports = {
    secret: secret
};
