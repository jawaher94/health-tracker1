import { db } from "../firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// حفظ البيانات الصحية
export const saveHealthData = async (uid, data) => {

  await setDoc(
    doc(db, "users", uid),
    {
      health: data
    },
    { merge: true }
  );

};

// جلب البيانات الصحية
export const getHealthData = async (uid) => {

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return snap.data();

};