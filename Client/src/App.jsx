import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RateUs from "./pages/RateUs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rateus" element={<RateUs />} />
      </Routes>
    </>
  );
}

export default App;