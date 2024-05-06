import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={localStorage.getItem("isLoggedIn") === "true" ? <Index /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
