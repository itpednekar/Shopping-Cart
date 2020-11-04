import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOL2N9JbrijhSVa6aR5kVIaxsf7XPz0rM",
  authDomain: "clone-a9c11.firebaseapp.com",
  databaseURL: "https://clone-a9c11.firebaseio.com",
  projectId: "clone-a9c11",
  storageBucket: "clone-a9c11.appspot.com",
  messagingSenderId: "49651710868",
  appId: "1:49651710868:web:af759dd9ff88f0d3b36d81",
  measurementId: "G-TKB1648TM9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
