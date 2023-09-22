// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDutD5yhOc1WoGagRxLg5m1p6X-H6oEuyY",
  authDomain: "financely-8b221.firebaseapp.com",
  projectId: "financely-8b221",
  storageBucket: "financely-8b221.appspot.com",
  messagingSenderId: "1042151288276",
  appId: "1:1042151288276:web:8e41a692193e0302c4fa41",
  measurementId: "G-XXWF1R5PXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};