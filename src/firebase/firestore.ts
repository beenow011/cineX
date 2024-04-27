import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

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

    async register({uId,  email, username, createdAt } : registerParams) {
        try {

            const docRef = await addDoc(collection(this.db, "users"), {
                uId,  email, username, createdAt
            });
            return docRef;
        } catch (error) {
            throw error;
        }
    }

}

const service = new Services();
export default service;