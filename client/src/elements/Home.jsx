import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Statistics from "../components/Statistics";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Postings from "../components/Postings";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";
import Menu from "../components/Menu";
import AllCharts from "../components/AllCharts";
import { format } from "date-fns";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const { auth } = useAuth();
  useEffect(() => {
    if (deleted || auth?.user || auth?.logout) {
      setDeleted(false);
      axiosInstance
        .get("/api/applications")
        .then((res) => {
          const formattedResults = res.data.map((item) => ({
            ...item,
            date: format(new Date(item.date), "MMMM d, yyyy, h:mm a"),
          }));

          setData(formattedResults);
        })
        .catch((err) => {
          setData([]);
          console.log("server side error cant fetch table data");
        });
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
    <div className="">
      <Menu />
      <Header data={data} />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex flex-col">
          <h1 className="text-[50px] text-white  px-10 tracking-tighter">
            New Postings
          </h1>
          <Postings />
        </div>
      </div>
      <h1 className="mt-20 text-[50px] text-white tracking-tighter px-10">
        Submitted Applications
      </h1>
      <div className="w-full rounded-xl overflow-x-auto overflow-y-auto lg:max-h-[500px] max-h-[400px]">
        <table className="rounded-xl bg-gray-800 min-w-full">
          <thead className="sticky px-2 top-0 bg-gray-800">
            <tr className="">
              <th className="p-5">#</th>
              <th className="p-5">Date</th>
              <th className="text-left">Title</th>
              <th className="hidden lg:table-cell text-left">Company</th>
              <th className="hidden lg:table-cell text-left">location</th>
              <th className="hidden lg:table-cell text-center">Offer</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto divide-y divide-gray-900 bg-gray-700">
            {data.map((variable, index) => {
              return (
                <tr className="m-2">
                  <td className="text-center border-gray-900 border-l px-2">
                    {index + 1}
                  </td>
                  <td className="text-center border-gray-900 border-l px-2">
                    {variable.date}
                  </td>
                  <td className="text-left border-gray-800  px-2 max-w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                    {variable.title}
                  </td>
                  <td className="hidden lg:table-cell text-left max-w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                    {variable.company}
                  </td>
                  <td className="hidden lg:table-cell text-left max-w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                    {variable.location}
                  </td>
                  <td className="hidden lg:table-cell text-center max-w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                    {variable.offer}
                  </td>
                  <td className="flex gap-1 my-3">
                    <Link
                      className="text-white rounded-lg shadow-black bg-blue-600 hover:bg-blue-400  transition-all px-1 py-1 "
                      to={`/read/${variable.id}`}
                    >
                      Read
                    </Link>
                    <Link
                      className="text-white rounded-lg shadow-black hover:bg-pink-400  transition-all bg-pink-600 px-1 py-1 "
                      to={`/edit/${variable.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="text-white rounded-lg shadow-black bg-red-600 hover:bg-red-400  transition-all px-1 py-1 "
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
      <AllCharts />
      <Footer />
    </div>
  );
}

export default Home;
