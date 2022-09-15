import "./App.css";
import Feed from "./components/Feed";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Users/Login";
import Registration from "./components/Users/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
