import jwt from "jsonwebtoken";
const config = require("../config/auth.config");

const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers.token || req.session.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  
  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

export const authJwt = {
  verifyToken
};
