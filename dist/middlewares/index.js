"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const authJwt_1 = require("./authJwt");
const verifySignUp_1 = require("./verifySignUp");
exports.middlewares = {
    authJwt: authJwt_1.authJwt,
    verifySignUp: verifySignUp_1.verifySignUp
};
