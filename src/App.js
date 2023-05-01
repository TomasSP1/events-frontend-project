import LoginForm from "./components/Pages/LoginForm";
import "bootstrap/dist/css/bootstrap.css";
import FrontPage from "./components/Pages/FrontPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Common/Navbar";
import RegisterForm from "./components/Pages/RegisterForm";
import "./components/CSS/App.css";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <div className="page">
      <AuthProvider>
        <Router classname="home">
          <Navigation></Navigation>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

