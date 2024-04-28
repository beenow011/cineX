import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc , query, where } from "firebase/firestore";

import conf from "./config";
const currentDate = new Date();
interface registerParams{
    uId: string
    email:string
    username:string | null
    createdAt: number
}
export class Services {
    app;
    db;
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);

    }

    async register({ uId, email, username, createdAt }: registerParams) {
        try {
            const q = query(collection(this.db, "users"), where("uId", "==", uId));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            
            if (!querySnapshot.empty) {
                // User already exists, return their details
                console.log(true)
                const userDoc = querySnapshot.docs[0];
                return userDoc.data(); // Returning existing user details
            } else {
                // User does not exist, add the new user details
                console.log(false)

                const docRef = await addDoc(collection(this.db, "users"), {
                    uId, email, username, createdAt
                });
                
                return docRef; // Returning the newly added user details
            }
        } catch (error) {
            throw error;
        }
    }

}

const service = new Services();
export default service;