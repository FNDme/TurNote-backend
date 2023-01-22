import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();

let corsOptions = {
  origin: ["http://localhost:3000", "http://10.6.131.24", "http://10.6.131.94"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(
  cookieSession({
    name: "turnote-session",
    secret: process.env.SECRET,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// db
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose
  .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?${dbConfig.CONNECTIONOPTS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { notesRoutes } from './routes/notes.routes';
authRoutes(app);
userRoutes(app);
notesRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}.`);
});