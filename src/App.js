import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { EmployeeCreate } from "./components/EmployeeCreate";
import UpcomingRetirement from "./components/UpcomingRetirement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<EmployeeCreate />} />
        <Route path="/upcoming-retirement" element={<UpcomingRetirement />} />
      </Routes>
    </>
  );
}

export default App;
