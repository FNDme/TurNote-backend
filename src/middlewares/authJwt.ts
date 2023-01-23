import jwt from "jsonwebtoken";
const config = require("../config/auth.config");

const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.headers.token || req.session.token || null;
  if (!token || token === 'null') {
    res.status(403).send({ message: "No token provided!" });
  } else {
    jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
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
