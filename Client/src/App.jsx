import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Login, Landing, Home, Tasks, ViewTask, Update } from "./Pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
