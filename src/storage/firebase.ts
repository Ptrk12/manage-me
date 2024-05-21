import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIKsESzKxI1CjTvYIpQSmKkwyZbECJpXM",
  authDomain: "manage-me-3fe05.firebaseapp.com",
  projectId: "manage-me-3fe05",
  storageBucket: "manage-me-3fe05.appspot.com",
  messagingSenderId: "371906897861",
  appId: "1:371906897861:web:e2be146924cac9c6d94dac"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}