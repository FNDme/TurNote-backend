import dotenv from "dotenv";
dotenv.config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.DB_PORT || 27017,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  CONNECTIONOPTS: process.env.DB_CONNECTIONOPTS
};