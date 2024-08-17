const db = require("./db");
const { format } = require("date-fns");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const scrapedJobs = require("../scrape/scraper");
// const postings = require('../../server');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

let postings = null;
/*
(async () => {
	console.log("Starting the scrape");
	postings = await scrapedJobs();
	console.log("Postings obtained");
})();
*/

const loginUser = (req, res) => {
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
};
const createUser = (req, res) => {
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
};
const addApplication = (req, res) => {
	const userid = req.user.unique_id;
	sql =
		"INSERT INTO applications (title , company , location , offer, description, userid) VALUES (?, ?, ?, ?, ?, ?)";
	const values = [
		req.body.title,
		req.body.company,
		req.body.location,
		req.body.offer,
		req.body.description,
		userid,
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
};
const getApplications = (req, res) => {
	const userid = req.user.unique_id;
	console.log("userid received from helper function: ", userid);
	const sql = `SELECT date, title, company, location, offer, id FROM applications WHERE userid = ?`;
	db.query(sql, [userid], (err, result) => {
		if (err) {
			console.error("error fetching data", err);
			return res
				.status(500)
				.json({ message: "Server Error fetching applications" });
		}
		const formattedResults = result.map((item) => ({
			...item,
			date: format(new Date(item.date), "MMMM d, yyyy, h:mm a"),
		}));
		return res.json(formattedResults);
	});
};
const deleteApplication = (req, res) => {
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
};

const editUser = (req, res) => {
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
};
const getApplicationId = (req, res) => {
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
};
const getStats = (req, res) => {
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
};

const getPostings = (req, res) => {
	if (postings !== null) {
		return res.status(200).json(postings);
	}
	return res.status(400).json({ message: "not loaded yet" });
};

const getCookie = (req, res) => {
	const token = req.cookies?.jwt;
	if (token) {
		console.log("Your cookie was successfully recieved");
		return res.status(200).json({ message: "Access to protected data" });
	} else {
		return res.status(401).send({ message: "Unauthorized: No token provided" });
	}
};

const refreshUser = (req, res) => {
	const token = req.cookies?.jwt;
	if (token) {
		console.log("Your cookie was successfully recieved");
		sql = "SELECT username, password FROM users WHERE login_token = ?";
		db.query(sql, [token], (err, result) => {
			if (err) {
				console.log(err);
			}
			console.log("successfully relogged in the user");
			console.log(JSON.stringify(result));
			const user = result[0];
			if (user) {
				return res.status(200).json({
					username: user.username,
					accessToken: user.accessToken,
					message: "Access to protected data",
				});
			} else {
				return res.status(500).json({ message: "unknown server query error" });
			}
		});
	} else {
		return res.status(401).json({ message: "Unauthorized: No token provided" });
	}
};
const logoutUser = (req, res) => {
	res.clearCookie("jwt", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
	});
	const sql =
		"UPDATE users SET `login_token` = NULL, `refresh_token` = NULL WHERE `username` = ?";
	db.query(sql, [req.user.username], (err, result) => {
		if (err) {
			console.error("Error clearing user tokens in database:", err);
			return res.status(500).json({ message: "Failed to log out user" });
		}
		console.log("Successfully logged out the user");
		return res.status(200).json({ message: "User successfully logged out" });
	});
};

const getStatistics = async (req, res) => {
	const sqlday =
		"SELECT DATE(date) AS Day, COUNT(*) AS daily FROM applications WHERE userid = ? GROUP BY DATE(date);";
	const sqlweek =
		"SELECT YEAR(date) AS Year, WEEK(date) AS Week, COUNT(*) AS WeeklyCount FROM applications WHERE userid = ? GROUP BY YEAR(date), WEEK(date);";
	const sqlmonth =
		"SELECT YEAR(date) AS Year, MONTH(date) AS Month, COUNT(*) AS MonthlyCount FROM applications WHERE userid = ? GROUP BY YEAR(date), MONTH(date);";
	try {
		var [dailyResults, weeklyResults, monthlyResults] = await Promise.all([
			db.promise().query(sqlday, [req.user.unique_id]),
			db.promise().query(sqlweek, [req.user.unique_id]),
			db.promise().query(sqlmonth, [req.user.unique_id]),
		]);
		res.status(200).json({
			message: "Statistics fetched successfully",
			daily: dailyResults[0], // Accessing the first element of the result array
			weekly: weeklyResults[0],
			monthly: monthlyResults[0],
		});
	} catch (err) {
		console.error("Error parsing statistics", err);
		res.status(500).json({ message: "Failed to fetch statistics" });
	}
};
module.exports = {
	loginUser,
	createUser,
	refreshUser,
	addApplication,
	getApplications,
	deleteApplication,
	editUser,
	getApplicationId,
	getStats,
	getPostings,
	getCookie,
	logoutUser,
	getStatistics,
};
