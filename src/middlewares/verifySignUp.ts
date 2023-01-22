import { db } from '../models';
const User = db.user;

const checkDuplicateUsernameOrEmail = (req: any, res: any, next: any) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err: any, user: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail
};