import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { Timestamp, getFirestore, orderBy } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc , query, where } from "firebase/firestore";

import conf from "./config";
import { error } from "console";
const currentDate = new Date();
interface registerParams{
    uId: string
    email:string
    username:string | null
    createdAt: number
}
interface PrevMsgParams{
    uId: string,
    movieID:string
}
interface messageParams{
     text:string,
      isUserMessage:boolean,
         uId:string ,
          movieID:string 
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
    async createMessage({  text, isUserMessage, uId , movieID }: messageParams) {
        try {
           
            
                if(text.length == 0){
                    throw error('No text')
                }
                const docRef = await addDoc(collection(this.db, "messages"), {
                    text, isUserMessage,  createdAt:Timestamp.fromDate(new Date()) ,uId , movieID
                });
                
                return docRef; // Returning the newly added user details
           
        } catch (error) {
            throw error;
        }
    }

    async retrivePrevMsg({uId , movieID}:PrevMsgParams){
        try{
            const movieQuery = query(
                collection(this.db, "movies"),
                where("movieID", "==", movieID),
                where("uId", "==", uId),
                orderBy("createdAt", "asc") // Sort by createdAt field in ascending order
              );
              const querySnapshot = await getDocs(movieQuery);
              if (!querySnapshot.empty) {
                // User already exists, return their details
                console.log(true)
                const userDoc = querySnapshot.docs[0];
                return userDoc.data(); // Returning existing user details
            } else{
                return 
            }
        }catch(err){

        }
    }

}

const service = new Services();
export default service;