const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Up and running" });
});

app.use("/api/users", userRoutes);

// Kick off the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

module.exports = app;
