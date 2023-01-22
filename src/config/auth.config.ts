import dotenv from "dotenv";
dotenv.config();

module.exports = {
  secret: process.env.SECRET
};