import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
