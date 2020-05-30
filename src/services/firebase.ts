import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVappFPtoa7uvJ6zYqIAcOzQ_-WB57tyY",
  authDomain: "mesange-66d70.firebaseapp.com",
  databaseURL: "https://mesange-66d70.firebaseio.com",
  projectId: "mesange-66d70",
  storageBucket: "mesange-66d70.appspot.com",
  messagingSenderId: "52567785173",
  appId: "1:52567785173:web:70602b1e4e0e9aca586c5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.database();

export const signup = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signin = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};
