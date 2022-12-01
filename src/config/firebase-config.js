import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  databaseURL: import.meta.env.VITE_databaseURL,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authentication = getAuth(app);
export { authentication, db }
// const analytics = getAnalytics(app);


export const createUserDoc = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        role: 'users',
        ...additionalInformation
      });
    } catch(err){
      console.log(err.message);
    }
  }

  return userDocRef;
}