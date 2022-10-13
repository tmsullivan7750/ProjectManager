import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const app = initializeApp({ 
    apiKey: "AIzaSyBMN9aS8N6WgXwRNE-VLHCfF2vC4jPKQHY",
    authDomain: "bugtracker-8285c.firebaseapp.com",
    projectId: "bugtracker-8285c",
    storageBucket: "bugtracker-8285c.appspot.com",
    messagingSenderId: "545070902654",
    appId: "1:545070902654:web:878e4758a72dbbfccc972f"
 });

 export const auth = getAuth(app);
 export const methods = {
     signInWithEmailAndPassword,
     onAuthStateChanged,
     signOut
 }
export const loggedUser = auth.currentUser
export const db = getFirestore(app)
export default app