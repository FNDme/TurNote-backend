"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
let corsOptions = {
    origin: ["http://localhost:3000", "http://10.6.131.24", "http://10.6.131.94"]
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// session
app.use((0, cookie_session_1.default)({
    name: "turnote-session",
    secret: process.env.SECRET,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
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
    .catch((err) => {
    console.error("Connection error", err);
    process.exit();
});
// test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});
// routes
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const notes_routes_1 = require("./routes/notes.routes");
(0, auth_routes_1.authRoutes)(app);
(0, user_routes_1.userRoutes)(app);
(0, notes_routes_1.notesRoutes)(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.clear();
    console.log(`Server is running on port ${PORT}.`);
});
