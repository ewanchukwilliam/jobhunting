const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const { format } = require("date-fns");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Penisbutt123!",
	database: "JobHunting",
});

app.post("/add_user", (req, res) => {
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
			return res
				.status(500)
				.json({
					messlocation: "Something unexpected had occured oopsie" + err,
				});
		}
		console.log("application added", result);
		return res.json({ success: "Job added successfully" });
	});
});

app.post("/edit_user/:id", (req, res) => {
	const id = req.params.id;
	sql =
		"UPDATE applications SET `title` =?, `company` =?,`location` =?, `offer` =? ,`description` =? WHERE `id`= ? ";
	const values = [
		req.body.title,
		req.body.company,
		req.body.location,
		req.body.offer,
		req.body.description,
		id
	];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res
				.status(500)
				.json({
					messlocation: "Something unexpected had occured oopsie" + err,
				});
		}
		console.log("application added", result);
		return res.json({ success: "application added successfully" });
	});
});

app.get("/applications", (req, res) => {
	const sql =
	 	"SELECT  date, title , company , location , offer, id FROM applications";
	db.query(sql, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ messlocation: "Server Error get stuff" });
		}
		const formattedResults = result.map((item) => ({
			...item,
			date: format(new Date(item.date), "MMMM d, yyyy, h:mm a"),		}));
		console.log("data fetched", formattedResults);
		return res.json(formattedResults);
	});
});

app.get("/get_applications/:id", (req, res) => {
	const id = req.params.id;
	const sql = "SELECT date, title , company , location , offer, id, description FROM applications WHERE `id` = ?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ messlocation: "Server Error get stuff" });
		}
		const formattedResults = result.map((item) => ({
			...item,
			date: format(new Date(item.date), "PPPPpppp"), // e.g., 'Friday, August 16th, 2019 at 8:30 PM'
		}));
		console.log("data fetched", formattedResults);
		return res.json(formattedResults);
	});
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).json({ error: "No ID provided" });
	}
	sql = "DELETE FROM applications WHERE `id`= ? ";
	const values = [id];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res
				.status(500)
				.json({
					messlocation: "Something unexpected had occured oopsie" + err,
				});
		}
		console.log("application added", result);
		return res.json({ success: "application added successfully" });
	});
});

app.listen(port, () => {
	console.log("listening on http://localhost:5000");
});
