import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDnVMuUSvKF5ECSx2P9Kxt_dXL78Q5A_TY",
    authDomain: "saylani-intern.firebaseapp.com",
    projectId: "saylani-intern",
    storageBucket: "saylani-intern.appspot.com",
    messagingSenderId: "409201239036",
    appId: "1:409201239036:web:3d9544d7f9dd3165604879",
    measurementId: "G-P5HPWRFK4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = app.auth()
// const firestore = app.firestore()
export { app }