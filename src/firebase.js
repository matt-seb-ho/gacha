// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIGvj1Ajoud2Dk6lelQDp58cyc3kfi2CY",
  authDomain: "gacha-33563.firebaseapp.com",
  projectId: "gacha-33563",
  storageBucket: "gacha-33563.appspot.com",
  messagingSenderId: "973460843095",
  appId: "1:973460843095:web:9f221d98dc50305bcb1112",
  measurementId: "G-LLC8GGQTB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}
