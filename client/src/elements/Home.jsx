import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
	const [data, setData] = useState([]);
	const [deleted, setDeleted] = useState(true);
	useEffect(() => {
		if (deleted) {
			setDeleted(false);
			axios
				.get("/applications")
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [deleted]);

	function handleDelete(id) {
		axios
			.delete(`/delete/${id}`)
			.then((res) => {
				setDeleted(true);
			})
			.catch((err) => console.log(err));
	}
	return (
		<div class="text-white font-thin min-h-screen w-100 bg-gray-900 px-5 py-5">
			<Header data={data} />
			<div class="w-full rounded-xl overflow-x-auto overflow-y-auto max-h-[600px]">
				<table class="rounded-xl bg-gray-800 min-w-full">
					<thead class="sticky px-2 top-0 bg-gray-800">
						<tr className="">
							<th class="p-5">#</th>
							<th class="p-5">Date</th>
							<th class="text-left">Title</th>
							<th class="hidden lg:table-cell text-left">Company</th>
							<th class="hidden lg:table-cell text-left">location</th>
							<th class="hidden lg:table-cell text-center">Offer</th>
							<th class="text-center">Actions</th>
						</tr>
					</thead>
					<tbody class="overflow-y-auto divide-y divide-gray-900 bg-gray-700">
						{data.map((variable, index) => {
							return (
								<tr class="m-2">
									<td class="text-center border-gray-900 border-l px-2">
										{index + 1}
									</td>
									<td class="text-center border-gray-900 border-l px-2">
										{variable.date}
									</td>
									<td class="text-left border-gray-800  px-2 ">
										{variable.title}
									</td>
									<td class="hidden lg:table-cell text-left ">
										{variable.company}
									</td>
									<td class="hidden lg:table-cell text-left ">
										{variable.location}
									</td>
									<td class="hidden lg:table-cell text-center ">
										{variable.offer}
									</td>
									<td class="text-center justify-center flex items-center">
										<Link
											class="text-white rounded-lg shadow-black bg-blue-600 px-1 py-1 m-1"
											to={`/read/${variable.id}`}
										>
											Read
										</Link>
										<Link
											class="text-white rounded-lg shadow-black bg-pink-600 px-1 py-1 m-1"
											to={`/edit/${variable.id}`}
										>
											Edit
										</Link>
										<button
											class="text-white rounded-lg shadow-black bg-red-600 px-1 py-1 m-1"
											onClick={() => handleDelete(variable.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<Footer data={data} />
		</div>
	);
}

export default Home;
