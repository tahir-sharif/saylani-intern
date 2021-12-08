import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDnVMuUSvKF5ECSx2P9Kxt_dXL78Q5A_TY",
  authDomain: "saylani-intern.firebaseapp.com",
  projectId: "saylani-intern",
  storageBucket: "saylani-intern.appspot.com",
  messagingSenderId: "409201239036",
  appId: "1:409201239036:web:3d9544d7f9dd3165604879",
  measurementId: "G-P5HPWRFK4J",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const fireStore = firebase.firestore();
const storage = firebase.storage();
export { auth, fireStore, storage };
