import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";
import AuthProvider from "./elements/AuthProvider";

//styling

function App() {
  return (
    <AuthProvider className="font-primary text-white font-thin min-h-screen w-100 bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/read/:id" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
