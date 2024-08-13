"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import React, { useRef } from "react";

import { Audio } from "react-loader-spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Postings = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" }); // Adjust -200 to your needs
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" }); // Adjust 200 to your needs
    }
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/postings")
        .then((res) => {
          // console.log(res.data);
          if (res?.status === 200) {
            setData(res.data);
          }
        })
        .catch((err) => {
          if (err?.response?.status === 400) {
            console.log("fetching data again");
            setData(null);
            setTimeout(fetchData, 5000);
          }
        });
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-full justify-between items-center gap-2 ">
      <Button
        onClick={scrollLeft}
        className="hover:bg-accent bg-gray-600 hover:text-black transition-all py-32 rounded-r-lg active:bg-accent/50 active:duration-50"
      >
        <PiCaretLeftBold></PiCaretLeftBold>
      </Button>

      <div className="relative min-w-screen overflow-hidden h-auto">
        <div
          ref={scrollRef}
          className="hide-scrollbar flex overflow-x-scroll min-w-screen h-auto gap-4 bg-gray-800 snap-x snap-mandatory overflow-y-hidden"
        >
          {data === null ? (
            <div className="text-white text-3xl flex justify-center items-center w-screen h-[250px] bg-gray-700">
              <div className="font-extrabold flex flex-col gap-5 justify-center items-center">
                Scraping Jobs <Audio color="white"></Audio>
              </div>
            </div>
          ) : (
            data.map((variable) => (
              <Card className="relative snap-start shrink-0 w-[400px] h-[250px] hover:z-10 transition-all hover:text-accent">
                <CardHeader>
                  <div className="flex items-between">
                    <CardTitle className="capitalize">
                      {variable.title}
                    </CardTitle>
                    <CardDescription>{variable.date}</CardDescription>
                  </div>
                  <CardDescription>{variable.company}</CardDescription>
                  <CardDescription>{variable.location}</CardDescription>
                </CardHeader>
                <CardContent>{variable.sections}</CardContent>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-700 to-transparent"></div>
              </Card>
            ))
          )}
        </div>
        <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-gray-900 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-gray-900 to-transparent"></div>
      </div>
      <Button
        onClick={scrollRight}
        className="hover:bg-accent bg-gray-600 hover:text-black transition-all py-32 rounded-l-lg active:bg-accent/50 active:duration-50"
      >
        <PiCaretRightBold></PiCaretRightBold>
      </Button>
    </div>
  );
};

export default Postings;
