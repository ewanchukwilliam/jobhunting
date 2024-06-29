import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
	const [data, setData] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		axios
			.get(`/get_applications/${id}`)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		axios
			.post(`/edit_user/${id}`, data[0])
			.then((res) => {
				navigate("/");
				console.log(res);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div class="text-white text-start bg-gray-800 h-screen w-100 bg-green flex flex-col px-20 justify-center items-center bg-rounded">
			<h1 class="text-6xl px-10 my-3">Application Number: {id}</h1>
			<Link
				to="/"
				class="rounded-lg shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3"
			>
				Back
			</Link>
			{data.map((application) => {
				return (
					<form onSubmit={handleSubmit}>
						<div class="form-group my-3 flex flex-col justify-between">
							<label htmlFor="name">Title</label>
							<input
								class="rounded-md my-2 mx-2 bg-gray-600 h-8"
								value={application.title}
								type="text"
								name="title"
								required
								onChange={(e) =>
									setData([{ ...data[0], title: e.target.value }])
								}
							/>
						</div>
						<div class="form-group my-3 flex flex-col justify-between">
							<label htmlFor="company">Company</label>
							<input
								class="rounded-md my-2 mx-2 bg-gray-600 h-8"
								value={application.company}
								type="text"
								name="company"
								required
								onChange={(e) =>
									setData([{ ...data[0], company: e.target.value }])
								}
							/>
						</div>
						<div class="form-group my-3 flex flex-col justify-between">
							<label htmlFor="gender">Location</label>
							<input
								class="rounded-md my-2 mx-2 bg-gray-600 h-8"
								value={application.location}
								type="text"
								name="location"
								required
								onChange={(e) =>
									setData([{ ...data[0], location: e.target.value }])
								}
							/>
						</div>
						<div class="form-group my-3 flex flex-col justify-between">
							<label htmlFor="age">Offer</label>
							<textarea
								class="rounded-md my-2 mx-2 bg-gray-600 h-8"
								value={application.offer}
								type="text"
								name="offer"
								required
								onChange={(e) =>
									setData([{ ...data[0], offer: e.target.value }])
								}
							/>
						</div>
						<div class="form-group my-3 flex flex-col h-auto justify-between">
							<label htmlFor="age">Description</label>
							<textarea
								class="rounded-md my-2 mx-2 bg-gray-600 h-20"
								value={application.description}
								type="text"
								name="description"
								required
								onChange={(e) =>
									setData([{ ...data[0], description: e.target.value }])
								}
							/>
						</div>
						<div class="form-group my-3f flex flex-col justify-center items-center">
							<button
								type="submit"
								class="rounded-lg shadow-black bg-red-600 shadow-lg hover:-translate-y-2 transition px-5 py-3 mx-3"
							>
								Save
							</button>
						</div>
					</form>
				);
			})}
		</div>
	);
}

export default Edit;
