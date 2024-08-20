import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../authentication/AuthProvider";
import Postings from "../components/Postings";

function Create() {
	const [values, setValues] = useState({
		title: "",
		company: "",
		location: "",
		offer: "",
		description: "",
	});

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		axiosInstance
			.post("/api/add_application", values)
			.then((res) => {
				navigate("/");
				console.log(res);
			})
			.catch((err) => console.log(err));
	}
	return (
		<div className="text-white text-start bg-gray-900 h-auto w-auto bg-green flex flex-col px-20 justify-center items-center bg-rounded">
			<div className="bg-gray-700 h-auto w-full mx-10 flex flex-col items-center gap-3">
				<div className="flex flex-row justify-between items-center w-auto ">
					<div className="flex flex-col">
						<h3 className="text-6xl px-10 text-center">Add application</h3>
						<h5 className="text-3xl px-10 text-center text-muted-foreground">
							Paste Relevent information here!
						</h5>
					</div>
					<Link
						to="/"
						className="rounded-full hover:bg-green-400 font-semibold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3"
					>
						Home
					</Link>
				</div>
				<div className=" bg-gray-800 p-10 rounded-3xl mt-4 shadow-lg shadow-black">
					<form onSubmit={handleSubmit} className="py-2">
						<div className="form-group my-3 flex justify-between items-center ">
							<label htmlFor="title">Title</label>
							<input
								className="rounded-md my-2 mx-2 bg-gray-600 h-8"
								type="text"
								name="title"
								required
								onChange={(e) =>
									setValues({ ...values, title: e.target.value })
								}
							/>
						</div>
						<div className="form-group my-3 flex justify-between items-center">
							<label htmlFor="company">Company</label>
							<input
								className="rounded-md my-2 mx-2 bg-gray-600 h-8"
								type="company"
								name="company"
								required
								onChange={(e) =>
									setValues({ ...values, company: e.target.value })
								}
							/>
						</div>
						<div className="form-group my-3 flex justify-between items-center">
							<label htmlFor="location">Location</label>
							<input
								className="rounded-md my-2 mx-2 bg-gray-600 h-8"
								type="text"
								name="location"
								required
								onChange={(e) =>
									setValues({ ...values, location: e.target.value })
								}
							/>
						</div>
						<div className="form-group my-3 flex justify-between items-center">
							<label htmlFor="offer">Offer</label>
							<input
								className="rounded-md my-2 mx-2 bg-gray-600 h-8"
								type="text"
								name="offer"
								required
								onChange={(e) =>
									setValues({ ...values, offer: e.target.value })
								}
							/>
						</div>
						<div className="form-group my-3 flex flex-col justify-between items-center">
							<label htmlFor="description">Description</label>
							<input
								className="rounded-md my-2 mx-2 bg-gray-600 h-10 w-60"
								type="text"
								name="description"
								required
								onChange={(e) =>
									setValues({ ...values, description: e.target.value })
								}
							/>
						</div>
						<div className="form-group my-3 flex flex-col items-center">
							<button
								type="submit"
								className="rounded-full  shadow-black bg-red-600 shadow-lg hover:-translate-y-2 hover:bg-red-400 transition px-5 py-3 mx-3 font-semibold"
							>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className="w-full bg-gray-900 p-3">
					<Postings />
				</div>
			</div>
		</div>
	);
}

export default Create;
