import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";

//styling

function App() {
  return (
		<body className="font-primary">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/edit/:id" element={<Edit />} />
					<Route path="/read/:id" element={<Read />} />
				</Routes>
			</BrowserRouter>
		</body>
  );
}

export default App;
