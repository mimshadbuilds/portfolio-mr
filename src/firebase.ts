import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA-jGMf5RqkadNevVeyvO5PpxRKdAGPUUU",
    authDomain: "portfolio-mr.firebaseapp.com",
    projectId: "portfolio-mr",
    storageBucket: "portfolio-mr.firebasestorage.app",
    messagingSenderId: "1066827657169",
    appId: "1:1066827657169:web:3863a9bfb6b9f8984bbaf0"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
