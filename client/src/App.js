import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddQuestion from "./components/AddQuestion";
import "./index.css";
import QuizzFeed from "./components/QuizzFeed";
import Question from "./components/Question";
import Profile from "./components/Profile";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function PrivateRoute() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/signin" />;
}

function App() {
  return (
    <>
      <Navbar />
      <Box width={{ base: "100%", md: "70%" }} margin="0 auto">
        <Routes>
          <Route path="/" element={<QuizzFeed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/addquizz" element={<AddQuestion />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/quizz/:id" element={<Question />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
