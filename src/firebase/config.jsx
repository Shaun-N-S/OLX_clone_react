// src/firebase/config.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAmnL79-ZA4ImtawnVMZRCOAG9dE2AGeVo",
  authDomain: "olx-clone-f5b1a.firebaseapp.com",
  projectId: "olx-clone-f5b1a",
  storageBucket: "olx-clone-f5b1a.appspot.com",
  messagingSenderId: "642228320826",
  appId: "1:642228320826:web:f4203e9726f77318121303",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)



export {auth,db}
