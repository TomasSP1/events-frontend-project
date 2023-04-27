import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.css';
  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;