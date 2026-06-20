import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import { Link } from "react-router-dom";
import "./formStyles.css"; // ملف CSS الموجود في نفس المجلد

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      onLogin(userCredential.user);

    } catch (error) {
      // نفس الكود عندك بدون حذف
    

  if (error.code === "auth/user-not-found") {
    alert("This account does not exist. Please create an account.");
  }
  else if (error.code === "auth/wrong-password") {
    alert("Wrong password");
  }
  else {
    alert(error.message);
  }

}
  };

  return (
    <div className="health-card">
      <h2 className="card-header">Login</h2>

      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="submit-button" 
      onClick={handleLogin}
      
      >
       Login
      </button>

      <p style={{ marginTop: "12px", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#4CAF50", fontWeight: "bold" }}>
          Create account
        </Link>
      </p>
    </div>
  );
}

export default Login;