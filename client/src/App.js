import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";
import ProtectedRoutes from "./authentication/RedirectAuth";
import Menu from "./components/Menu";

//styling

function App() {
  return (
    <div className="font-primary text-white font-thin h-full  min-h-screen  bg-gray-900 z-10">
      <BrowserRouter>
			<Menu/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/read/:id" element={<Read />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
