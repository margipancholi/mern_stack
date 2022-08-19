import logo from "./logo.svg";
import "./App.css";
import EmployeeDirectory from "./components/EmployeeDirectory";
import { Route, Routes } from "react-router-dom";
import EmployeeSearch from "./components/EmployeeSearch";
import { EmployeeCreate } from "./components/EmployeeCreate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeSearch />} />
        <Route path="/adduser" element={<EmployeeCreate />} />
      </Routes>
    </>
  );
}

export default App;
