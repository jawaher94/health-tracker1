import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "./formStyles.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      onRegister(userCredential.user,true);
    } catch (error) {
  if (error.code === "auth/email-already-in-use") {
    alert("This email already has an account");
  }else if (error.code === "auth/weak-password") {
    alert("Password must be at least 6 characters");
  }else {
    alert(error.message);
  }
}

  };

  return (
    <div className="health-card">

      <h2 className="card-header">Create Account</h2>

      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <input
        className="input-field"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />

      <button
        className="submit-button"
        onClick={handleRegister}
    
      >
       Register
      </button>

    </div>
  );
}

export default Register;