const express = require("express");
const cookieParser = require("cookie-parser");server
const cors = require("cors");
const ip = require("ip");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./src/routes/auth");
const applicationRoutes = require("./src/routes/applications");
const userRoutes = require("./src/routes/users");
const { PORT } = require("./src/config/config");
const db = require("./src/db/db.js");
const app = express();
// Middleware for parsing JSON and cookies
// CORS configuration
const corsOptions = {
	origin: process.env.CORS_ORIGIN || "http://localhost:3000",
	optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// Serve static files
app.use(express.static(path.join(__dirname, "public")));
// Mount routers under specific paths
app.use("/auth", authRoutes);
app.use("/api", applicationRoutes);
app.use("/user", userRoutes);
// Start the server
app.listen(PORT, () =>
	console.log(`Server running on port ${ip.address()}:${PORT}`),
);
// Scrape data asynchronously

console.log(
	`Host:${process.env.DB_HOST} ,user:${process.env.DB_USER},password: ${process.env.DB_PASSWORD},database${process.env.DB_NAME},PORT: ${process.env.PORT}`,
);
//
let attemptCount = 0;
const maxAttempts = 5;
let intervalId = setInterval(() => {
	if (attemptCount >= maxAttempts) {
		console.log("Failed to connect after several attempts.");
		clearInterval(intervalId);
		return;
	}
	db.connect((err) => {
		if (err) {
			console.log("Attempt", attemptCount + 1, "failed:", err);
			attemptCount++;
		} else {
			console.log("Connected to database on attempt", attemptCount + 1);
			clearInterval(intervalId);
		}
	});
}, 5000);
