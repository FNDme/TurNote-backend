import jwt from "jsonwebtoken";
const config = require("../config/auth.config");

let secret = config.secret;
if (secret == undefined) {
  secret = "test-secret";
  console.log("!!! TESTING MODE !!!");
}

const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers.token || req.session.token || null;
  if (!token || token === 'null') {
    return res.status(403).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    // jwt.verify(token, config.secret, (err: any, decoded: any) => {
      // if (err) {
      //   return res.status(401).send({ message: "Unauthorized!" });
      // } else {
      //   req.userId = decoded.id;
      //   next();
      // }
    });
  }
};

export const authJwt = {
  verifyToken
};
