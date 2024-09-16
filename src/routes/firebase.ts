// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2rIEbZ6nld7fLk20xmG4Ng__9g34h7s4",
  authDomain: "kwitter-6a123.firebaseapp.com",
  projectId: "kwitter-6a123",
  storageBucket: "kwitter-6a123.appspot.com",
  messagingSenderId: "778739173237",
  appId: "1:778739173237:web:0cb490837865dd7089b53c",
  measurementId: "G-CXTL8E6ZJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//  firebase에서 getAuth로 authentication 받아오기
export  const auth =getAuth(app);
export const storage= getStorage(app);
export const db =getFirestore(app);
