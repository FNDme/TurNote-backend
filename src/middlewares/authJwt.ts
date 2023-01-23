import jwt from "jsonwebtoken";
const config = require("../config/auth.config");

let secret = config.secret;
if (secret == undefined) {
  secret = "test-secret";
  console.log("!!! TESTING MODE !!!");
}

const verifyToken = async (req: any, res: any, next: any) => {
  let token = req.headers.token || req.session.token || null;
  if (!token || token === 'null') {
    res.status(403).send({ message: "No token provided!" });
    return;
  } else {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
        return;
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

export const authJwt = {
  verifyToken
};
