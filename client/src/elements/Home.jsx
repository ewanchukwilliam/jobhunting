import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Statistics from "../components/Statistics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Postings from "../components/Postings";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";

function Home() {
	const [data, setData] = useState([]);
	const [deleted, setDeleted] = useState(true);
	const { auth } = useAuth();
	useEffect(() => {
		if (deleted || auth?.user) {
			setDeleted(false);
			axiosInstance
				.get("/api/applications")
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [deleted, auth]);

	function handleDelete(id) {
		axiosInstance
			.delete(`/delete/${id}`)
			.then((res) => {
				setDeleted(true);
			})
			.catch((err) => console.log(err));
	}
	data.sort((a, b) => new Date(a.date) - new Date(b.date));
	return (
		<div class="">
			<Header data={data} />
			<div className="h-screen flex flex-col justify-center">
				<div className="flex flex-col">
					<h1 className="text-[50px] text-white tracking-tight px-10">
						New Postings
					</h1>
					<Postings />
				</div>
			</div>
			<h1 className="mt-20 text-[50px] text-white tracking-tight px-10">
				Submitted Applications
			</h1>
			<div class="w-full rounded-xl overflow-x-auto overflow-y-auto lg:max-h-[500px] max-h-[400px]">
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
									<td class="flex gap-1 my-3">
										<Link
											class="text-white rounded-lg shadow-black bg-blue-600 hover:bg-blue-400  transition-all px-1 py-1 "
											to={`/read/${variable.id}`}
										>
											Read
										</Link>
										<Link
											class="text-white rounded-lg shadow-black hover:bg-pink-400  transition-all bg-pink-600 px-1 py-1 "
											to={`/edit/${variable.id}`}
										>
											Edit
										</Link>
										<button
											class="text-white rounded-lg shadow-black bg-red-600 hover:bg-red-400  transition-all px-1 py-1 "
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
			<Statistics data={data} />
			<Footer />
		</div>
	);
}

export default Home;
