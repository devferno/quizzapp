import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddQuestion from "./components/AddQuestion";
import "./index.css";
import QuizzFeed from "./components/QuizzFeed";
import Question from "./components/Question";
import Profile from "./components/Profile";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function PrivateRoute() {
  return localStorage.getItem("token") ? <Outlet /> : <Login />;
}

function App() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}

export default App;
