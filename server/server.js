const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const { format } = require("date-fns");
const ip = require("ip");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();

const scrapedJobs = require("./scraper.js");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
	origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Allow frontend domain, default to localhost:3000
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// app.use(cors());

const PORT = process.env.PORT || 5000; // Use the PORT environment variable, default to 5000 if not set

const db = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "Penisbutt123!",
	database: process.env.DB_NAME || "JobHunting",
});

console.log(
	`Host:${process.env.DB_HOST} ,user:${process.env.DB_USER},password: ${process.env.DB_PASSWORD},database${process.env.DB_NAME},PORT: ${process.env.PORT}`,
);

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

// db.connect((err) => {
// 	if (err) throw err;
// 	console.log("Connected to database!");
// });

app.post("/add_application", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	sql =
		"INSERT INTO applications (title , company , location , offer, description) VALUES (?, ?, ?, ?, ?)";
	const values = [
		req.body.title,
		req.body.company,
		req.body.location,
		req.body.offer,
		req.body.description,
	];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({
				messlocation: "Something unexpected had occured oopsie" + err,
			});
		}
		// console.log("application added", result);
		return res.json({ success: "Job added successfully" });
	});
});

app.post("/edit_user/:id", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	const id = req.params.id;
	sql =
		"UPDATE applications SET `title` =?, `company` =?,`location` =?, `offer` =? ,`description` =? WHERE `id`= ? ";
	const values = [
		req.body.title,
		req.body.company,
		req.body.location,
		req.body.offer,
		req.body.description,
		id,
	];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({
				messlocation: "Something unexpected had occured oopsie" + err,
			});
		}
		// console.log("application added", result);
		return res.json({ success: "application added successfully" });
	});
});

app.get("/applications", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	const sql =
		"SELECT  date, title , company , location , offer, id FROM applications";
	db.query(sql, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ messlocation: "Server Error get stuff" });
		}
		const formattedResults = result.map((item) => ({
			...item,
			date: format(new Date(item.date), "MMMM d, yyyy, h:mm a"),
		}));
		// console.log("data fetched", formattedResults);
		return res.json(formattedResults);
	});
});

app.get("/get_applications/:id", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}

	const id = req.params.id;
	const sql =
		"SELECT date, title , company , location , offer, id, description FROM applications WHERE `id` = ?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ messlocation: "Server Error get stuff" });
		}
		const formattedResults = result.map((item) => ({
			...item,
			date: format(new Date(item.date), "PPPPpppp"), // e.g., 'Friday, August 16th, 2019 at 8:30 PM'
		}));
		// console.log("data fetched", formattedResults);
		return res.json(formattedResults);
	});
});

app.delete("/delete/:id", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	const id = req.params.id;
	if (!id) {
		return res.status(400).json({ error: "No ID provided" });
	}
	sql = "DELETE FROM applications WHERE `id`= ? ";
	const values = [id];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({
				messlocation: "Something unexpected had occured oopsie" + err,
			});
		}
		// console.log("application added", result);
		return res.json({ success: "application added successfully" });
	});
});

app.get("/applications/stats", (req, res) => {
	if (!cookieTest(req)) {
		return res.status(405).json({ message: "User is not logged in" });
	}
	const sql = `
        SELECT 
            DATE_FORMAT(date, '%Y-%m') AS month, 
            WEEK(date, 1) AS week, 
            COUNT(*) AS count
        FROM applications
        GROUP BY month, week
        ORDER BY month, week;
    `;
	db.query(sql, (err, results) => {
		if (err) {
			console.error("Error fetching application stats", err);
			return res
				.status(500)
				.json({ message: "Server Error while fetching stats" });
		}
		const formattedResults = results.map((item) => {
			const monthName = format(new Date(item.month + "-01"), "MMMM"); // Full month name
			return {
				week: `Week ${item.week}, ${monthName}`,
				day: item.count,
			};
		});
		// console.log("Weekly application stats fetched", formattedResults);
		res.json(formattedResults);
	});
});

let postings = null;
(async () => {
	console.log("starting the scrape");
	postings = await scrapedJobs();
	console.log("Postings obtained");
})();

app.get("/postings", (req, res) => {
	if (postings !== null) {
		return res.status(200).json(postings);
	}
	return res.status(400).json({ message: "not loaded yet" });
});

app.post("/create_user", (req, res) => {
	sql = "INSERT INTO users (username , password , email ) VALUES (?, ?, ?)";
	const values = [req.body.username, req.body.password, req.body.email];
	db.query(sql, values, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				if (err.sqlMessage.includes("users.unique_username")) {
					return res.status(409).json({
						message: "Error User Already exists" + err,
					});
				} else if (err.sqlMessage.includes("users.unique_email")) {
					return res.status(408).json({
						message: "Error Email Already exists" + err,
					});
				}
			}
			console.log(err);
			return res.status(500).json({
				message: "Unknown Error" + err,
			});
		}
		console.log("new user successfully added", result);
		return res.json({ success: "User successfully added" });
	});
});

const SECRET_KEY = "Penisbutt123!";
const REFRESH_SECRET = "Penisbutt123!";
app.post("/login_user", (req, res) => {
	sql1 = "SELECT 1 FROM users WHERE username = ?";
	sql2 = "SELECT 1 FROM users WHERE password = ?";
	sql3 =
		"SELECT username, password, email FROM users WHERE username = ? AND password = ?";
	db.query(sql1, [req.body.username], (err, result) => {
		if (err) {
			console.log(err);
		}
		if (result.length === 0) {
			return res.status(400).json({ message: "User does not exist" });
		}
		db.query(sql2, [req.body.password], (err, result) => {
			if (err) {
				console.log(err);
			}
			if (result.length === 0) {
				return res.status(401).json({ message: "Incorrect password" });
			}
			db.query(sql3, [req.body.username, req.body.password], (err, result) => {
				if (err) {
					console.log(err);
				}
				const payload = result.map((items) => ({ ...items }));
				// console.log(JSON.stringify(payload))
				const accessToken = jwt.sign(payload[0], SECRET_KEY, {
					expiresIn: "1h",
				});
				const refreshToken = jwt.sign(payload[0], REFRESH_SECRET, {
					expiresIn: "24h",
				});
				sql4 =
					"UPDATE users SET `login_token` =?, `refresh_token` =? WHERE `username`= ? AND `password`=? ";
				db.query(
					sql4,
					[accessToken, refreshToken, req.body.username, req.body.password],
					(err, result) => {
						if (err) {
							console.log("error with insertion of tokens", err);
							return res.status(402).json({ message: "token insertion error" });
						}
						return res
							.status(200)
							.cookie("jwt", accessToken, {
								httpOnly: true,
								sameSite: "None",
								maxAge: 60 * 60 * 1000,
							})
							.json({ message: "User Logged in", accessToken: accessToken });
					},
				);
			});
		});
	});
});

const cookieTest = function cookieTest(req) {
	const token = req.cookies?.jwt;
	if (token) {
		console.log("Your cookie was successfully recieved");
		return true;
	} else {
		return false;
	}
};

app.get("/refresh_user", (req, res) => {
	const token = req.cookies?.jwt;
	if (token) {
		console.log("Your cookie was successfully recieved");
		sql = "SELECT username, password FROM users WHERE login_token = ?";
		db.query(sql, [token], (err, result) => {
			if (err) {
				console.log(err);
			}
			console.log("successfully relogged in the user")
			const user = result[0];
			if (user.length > 0) {
				return res.status(200).json({
					username: user.username,
					password: user.password,
					accessToken: user.accessToken,
					message: "Access to protected data",
				});
			}
		});
	} else {
		return res.status(401).send({ message: "Unauthorized: No token provided" });
	}
});

app.get("/cookietester", (req, res) => {
	const token = req.cookies?.jwt;
	if (token) {
		console.log("Your cookie was successfully recieved");
		return res.status(200).json({ message: "Access to protected data" });
	} else {
		return res.status(401).send({ message: "Unauthorized: No token provided" });
	}
});

app.listen(PORT, () =>
	console.log(`Server running on port ${ip.address()}:${PORT}`),
);
