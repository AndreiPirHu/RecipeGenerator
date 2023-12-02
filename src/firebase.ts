import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAVP-tI4TNJeH8WGcfmxgLvOzBiYGWbqeA",
  authDomain: "recipe-generator-1700605059556.firebaseapp.com",
  projectId: "recipe-generator-1700605059556",
  storageBucket: "recipe-generator-1700605059556.appspot.com",
  messagingSenderId: "1041967448741",
  appId: "1:1041967448741:web:0a44a0cd2ba2b363d9c34c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();
export { db, auth, signInWithEmailAndPassword };
