import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./formStyles.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";


function ProfileSetup({ user, onComplete ,initialData}) {
  const navigate=useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    targetWeight: "",
    activityLevel: ""
  });


  useEffect(() => {
  if (initialData && Object.keys(initialData).length > 0) {
    setProfile((prev) => ({
      ...prev,
      ...initialData
    }));
  }
}, [initialData]);

  /*
  useEffect(()=>{
    if(initialData){
      setProfile(initialData);
    }
  },[initialData]);
  */

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    try {

      await setDoc(
        doc(db, "users", user.uid),
        { profile: profile},
        { merge: true }
      );
     
      onComplete(profile);
     // navigate("/")

    } catch (error) {
      console.error("Error saving profile:", error);
    }

  };

  return (
    <div className="health-card">

      <h2 className="card-header">Profile Setup</h2>

      <input
        className="input-field"
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      />

      <select
        className="input-field"
        name="gender"
        value={profile.gender}
        onChange={handleChange}
      >
        <option value="">Select gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>

      <input
        className="input-field"
        name="age"
        placeholder="Age"
        value={profile.age}
        onChange={handleChange}
      />

      <input
        className="input-field"
        name="height"
        placeholder="Height (cm)"
        value={profile.height}
        onChange={handleChange}
      />

      <input
        className="input-field"
        name="weight"
        placeholder="Current Weight"
        value={profile.weight}
        onChange={handleChange}
      />

      <input
        className="input-field"
        name="targetWeight"
        placeholder="Target Weight"
        value={profile.targetWeight}
        onChange={handleChange}
      />

      <select
        className="input-field"
        name="activityLevel"
        value={profile.activityLevel}
        onChange={handleChange}
      >
        <option value="">Select Activity Level</option>
        <option value="Sedentary">Sedentary</option>
        <option value="Lightly Active">Lightly Active</option>
        <option value="Moderately Active">Moderately Active</option>
        <option value="Very Active">Very Active</option>
      </select>

     <button className="submit-button"
      onClick={handleSave}
      
      >
     Continue
      </button>
      

      <button
        className="submit-button"
        style={{ marginTop: "10px", backgroundColor: "#888" }}
        onClick={()=>onComplete()}
      >
        Cancel
      </button>

    </div>
  );
}

export default ProfileSetup;