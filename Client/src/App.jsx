import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Signup,
  Login,
  Landing,
  Home,
  Tasks,
  ViewTask,
  Update,
  AddTask,
  VerifyEmail,
} from "./Pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/tasks/:id" element={<ViewTask />}></Route>
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/tasks/:id/update" element={<Update />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
