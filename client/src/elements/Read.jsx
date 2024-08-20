import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.user) {
      axiosInstance
        .get(`/api/get_applications/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, auth]);
  return (
    <div className="text-white font-thin text-xl text-start bg-gray-800 h-screen w-100 bg-green flex flex-col px-20 justify-center items-center bg-rounded">
      <h1 className="text-3xl">User {id}</h1>
      <Link
        to="/"
        className="hover:-translate-y-2 transition text-white rounded-lg shadow-black bg-green-600 px-3 py-1 m-1"
      >
        Back
      </Link>
      {data.map((application) => {
        return (
          <ul className="bg-gray-700 rounded-lg shadow-black shadow-lg p-3">
            <li className="list-group-item">
              <b className="font-bold">Date: </b>
              {application["date"]}
            </li>
            <li className="list-group-item">
              <b className="font-bold">Title: </b>
              {application["title"]}
            </li>
            <li className="list-group-item">
              <b className="font-bold">Company: </b>
              {application["company"]}
            </li>
            <li className="list-group-item">
              <b className="font-bold">Location: </b>
              {application["location"]}
            </li>
            <li className="bg-gray-500 rounded-md px-2">
              <b className="font-bold">Offer: </b>
              {application["offer"]}
            </li>
            <li className="max-w-96">
              <b className="font-bold">Description: </b>
              {application["description"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Read;
