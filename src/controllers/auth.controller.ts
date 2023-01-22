const config = require("../config/auth.config");
import {db} from "../models";
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

export const signup = (req: any, res: any) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });
  });
};

export const signin = (req: any, res: any) => {
  if (req.body.username) {
    User.findOne({
      username: req.body.username
    })
      .exec((err: any, user: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

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
  } else if (req.body.email) {
    User.findOne({
      email: req.body.email
    })
      .exec((err: any, user: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

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

export const signout = (req: any, res: any) => {
  try {
    req.session.token = null;
    res.status(200).send({ message: "Signout successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const removeAccount = (req: any, res: any) => {
  User.findOneAndRemove({ _id: req.userId }, (err: any, user: any) => {
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
