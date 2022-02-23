import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRmsh7iTR8A7A0lMG4UDukPx9NCkPA8nw",
    authDomain: "cheatsheetfabri.firebaseapp.com",
    projectId: "cheatsheetfabri",
    storageBucket: "cheatsheetfabri.appspot.com",
    messagingSenderId: "1043642273481",
    appId: "1:1043642273481:web:d267a5997c135f2dcbc718",
    measurementId: "G-VQ4G57BD05"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);