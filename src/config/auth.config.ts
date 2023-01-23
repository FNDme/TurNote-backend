import dotenv from "dotenv";
dotenv.config();

let secret = '';

if (!process.env.SECRET) {
  console.log("No secret found in .env file");
  secret = 'test-secret';
} else {
  secret = process.env.SECRET;
}

module.exports = {
  secret: secret
};