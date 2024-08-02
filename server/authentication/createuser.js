app.post("add_user", (req, res) => {
	sql =
		"INSERT INTO applications (username , password , email ) VALUES (?, ?, ?)";
	const values = [req.body.username, req.body.password, req.body.email];
	db.query(sql, values, (err, result) => {
		if (err) {
			if (err.code === "ER_DUP_ENTRY") {
				return res.status(409).json({
					message: "Error User Already exists" + err,
				});
			}
			return res.status(500).json({
				message: "Uknown Error" + err,
			});
		}
		console.log("application added", result);
		return res.json({ success: "Job added successfully" });
	});
});
