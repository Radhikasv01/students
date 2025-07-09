// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import RegisterList from './Components/RegisterList';
import Sports from "./Components/Sports";
import StudentBooks from "./Components/StudentBooks";
import StudentCourse from "./Components/StudentCourse";
import Logout from "./Components/Logout";
import { useAuth } from './Components/AuthContext';


function App() {
  const { isLoggedIn } = useAuth(); // ✅ Moved inside the component

  return (
    <>
      {isLoggedIn && <Navbar />} {/* ✅ Conditionally show navbar */}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* These routes already show Navbar conditionally, no need to wrap again */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/registerlist" element={<RegisterList />} />

        <Route path="/sports" element={<Sports />} />
        <Route path="/studentbooks" element={<StudentBooks />} />
        <Route path="/studentcourse" element={<StudentCourse />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
