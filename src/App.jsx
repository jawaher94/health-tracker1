import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Plans from "./pages/Plans";
import Login from "./components/Login";
import Register from "./components/Register";
import PlanDetails from "./components/PlanDetails";
import { useState } from "react";
import "./App.css";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setIsNewUser(false);
  };

  const handleRegister = (newUser, isNew) => {
    setUser(newUser);
    setIsNewUser(isNew); 

    navigate("/profile");
  };

  if (!user) {
    return (
      <Routes>

        <Route
          path="/"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />} 
        />

        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />} 
        />

      </Routes>
    );
  }

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="nav-item">
          <span className="material-icons">home</span>
          <span>Home</span>
        </Link>

        <Link to="/profile" className="nav-item">
          <span className="material-icons">person</span>
          <span>Profile</span>
        </Link>

        <Link to="/plans" className="nav-item">
          <span className="material-icons">assignment</span>
          <span>Plans</span>
        </Link>

      </nav>

     <Routes>

  <Route
    path="/"
    element={<Home user={user} isNewUser={isNewUser} />}
  />

  <Route
    path="/profile"
    element={
      <Profile
        user={user}
        isNewUser={isNewUser}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        finishProfile={() => {
          setIsEditing(false);

          if (isNewUser) {
            setIsNewUser(false);
            navigate("/");
          }
        }}
        setUser={setUser}
      />
    }
  />

  <Route path="/plans" element={<Plans user={user} />} />


  
<Route path="/plan/:id" element={<PlanDetails />} />

</Routes>
    </>
  );
}

export default AppWrapper;