const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
	res.json({ message: "Up and running" });
});

// Kick off the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

module.exports = app;
