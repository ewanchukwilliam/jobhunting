import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
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
  return (
    <div class="text-white font-thin text-xl text-start bg-gray-800 h-screen w-100 bg-green flex flex-col px-20 justify-center items-center bg-rounded">
      <h1 class="text-3xl">User {id}</h1>
      <Link to="/" class="hover:-translate-y-2 transition text-white rounded-lg shadow-black bg-green-600 px-3 py-1 m-1">Back</Link>
      {data.map((application) => {
        return (
          <ul class="bg-gray-700 rounded-lg shadow-black shadow-lg p-3">
            <li class="list-group-item"> 
              <b class="font-bold">Date: </b>
              {application["date"]}
            </li>
            <li class="list-group-item">
              <b class="font-bold">Title: </b>
              {application["title"]}
            </li>
            <li class="list-group-item">
              <b class="font-bold">Company: </b>
              {application["company"]}
            </li>
            <li class="list-group-item">
              <b class="font-bold">Location: </b>
              {application["location"]}
            </li>
            <li class="bg-gray-500 rounded-md px-2">
              <b class="font-bold">Offer: </b>
              {application["offer"]}
            </li>
            <li class="max-w-96">
              <b class="font-bold">Description: </b>
              {application["description"]}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default Read;

