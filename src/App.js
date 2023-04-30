import LoginForm from "./components/Pages/LoginForm";
import 'bootstrap/dist/css/bootstrap.css';
import FrontPage from "./components/Pages/FrontPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navbar";
import RegisterForm from "./components/Pages/RegisterForm";
import "./components/CSS/App.css"
import UserPage from "./components/Pages/UserPage";
function App() {
  return (
    <div className="page">
    <Router classname = "home">
        <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<FrontPage/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/userpage" element={<UserPage/>} />
      </Routes>
    </Router>
    </div>
  );
  
}

export default App;