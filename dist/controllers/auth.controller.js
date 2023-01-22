"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccount = exports.signout = exports.signin = exports.signup = void 0;
const config = require("../config/auth.config");
const models_1 = require("../models");
const User = models_1.db.user;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User was registered successfully!" });
    });
};
exports.signup = signup;
const signin = (req, res) => {
    if (req.body.username) {
        User.findOne({
            username: req.body.username
        })
            .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            req.session.token = token;
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                token: token
            });
        });
    }
    else if (req.body.email) {
        User.findOne({
            email: req.body.email
        })
            .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            req.session.token = token;
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                token: token
            });
        });
    }
};
exports.signin = signin;
const signout = (req, res) => {
    try {
        req.session.token = null;
        res.status(200).send({ message: "Signout successfully!" });
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
};
exports.signout = signout;
const removeAccount = (req, res) => {
    User.findOneAndRemove({ _id: req.userId }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({ message: "User was deleted successfully!" });
    });
};
exports.removeAccount = removeAccount;
