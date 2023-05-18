import React from "react";
import LoginForm from "./components/Pages/LoginForm";
import "bootstrap/dist/css/bootstrap.css";
import FrontPage from "./components/Pages/FrontPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Common/Navbar";
import RegisterForm from "./components/Pages/RegisterForm";
import "./components/CSS/App.css";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import MyEvents from "./components/Pages/MyEvents";
import { useAuth } from "./auth/AuthContext";
import EventRegForm from "./components/Pages/EventRegForm";
import Footer from "./components/Common/Footer";
import Favorites from "./components/Pages/Favorites";

const Main = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Router className="home">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<FrontPage />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/login/*"
            element={<LoginForm />}
          />
          <Route
            path="/register"
            element={<RegisterForm />}
          />
        </Route>
        <Route
          path="/add_event"
          element={isLoggedIn ? <EventRegForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="/my_events"
          element={isLoggedIn ? <MyEvents /> : <Navigate to={"/"} />}
        />
        <Route
          path="/favorites"
          element={isLoggedIn ? <Favorites /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Main;
