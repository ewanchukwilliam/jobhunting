import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";

//styling

function App() {
  return (
    <div className="font-primary text-white font-thin h-full  min-h-screen w-100 bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/read/:id" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
