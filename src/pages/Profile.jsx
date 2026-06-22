import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import ProfileSetup from "../components/ProfileSetup";

function Profile({ user, isNewUser,isEditing,setIsEditing, finishProfile,setUser }) {

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const handleComplete = () => {
    finishProfile();
    if (isNewUser){
       navigate("/");
   }else{
    navigate("/profile");
   }
    
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };


  useEffect(() => {
  if (!user) return; 

  const fetchProfile = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().profile;
      setProfileData(data);
    }
  };

  fetchProfile();
}, [user]);



  /*
  useEffect(() => {

    const fetchProfile = async () => {

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data().profile);
      }

    };

    fetchProfile();

  }, [user.uid]);
  */

 if (isNewUser || isEditing) {
  return (
    <ProfileSetup
      user={user}
      initialData={profileData || {}}
      onComplete={(updatedProfile) => {
        if(updatedProfile){
          setProfileData(updatedProfile);
        }
        setIsEditing(false);
        finishProfile();
      }}
    />
  );
}

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

return (

  <div className="page">

  <div className="profile-header">

    <div className="profile-avatar">
      👤
    </div>

    <p className="profile-email">{user.email}</p>

  </div>

  <h2>Your Profile</h2>
  <p className="subtitle">Manage your personal information</p>
    <div className="health-card">

      <div className="profile-row">
        <span>Name</span>
        <span>{profileData.name}</span>
      </div>

      <div className="profile-row">
        <span>Gender</span>
        <span>{profileData.gender}</span>
      </div>

      <div className="profile-row">
        <span>Age</span>
        <span>{profileData.age}</span>
      </div>

      <div className="profile-row">
        <span>Height</span>
        <span>{profileData.height} cm</span>
      </div>

      <div className="profile-row">
        <span>Weight</span>
        <span>{profileData.weight} kg</span>
      </div>

      <div className="profile-row">
        <span>Target Weight</span>
        <span>{profileData.targetWeight} kg</span>
      </div>

      <div className="profile-row">
        <span>Activity Level</span>
        <span>{profileData.activityLevel}</span>
      </div>

    </div>

   <button
  className="submit-button"
  style={{ backgroundColor: "#45a049" }}
  onClick={() => setIsEditing(true)}
>
  Edit Profile
</button>

<button
  className="submit-button"
  style={{ backgroundColor: "#767171" }}
  onClick={handleLogout}
>
  Logout
</button>

  </div>

);
}

export default Profile;