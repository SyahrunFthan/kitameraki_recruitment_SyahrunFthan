import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Create, Edit, Home } from "./page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;
