import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { Timestamp, getDoc, getFirestore, orderBy, startAfter } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc , query, where ,limit } from "firebase/firestore";

import conf from "./config";
import { randomUUID } from "crypto";
const currentDate = new Date();
interface registerParams{
    uId: string
    email:string
    username:string | null
    createdAt: number
}
interface PrevMsgParams{
    uId: string,
    movieID:string,
    limit: number,
    order:boolean,
    lastVisible:string | undefined
}
interface messageParams{
     text:string,
      isUserMessage:boolean,
         uId:string ,
          movieID:string 
}
interface roomParams{
  movieID:string,
  roomName:string,
  icon:string,
  banner:string,
  description:string,
  createdBy: string
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
                    throw new Error('No text')
                }
                const docRef = await addDoc(collection(this.db, "messages"), {
                   mID:randomUUID(), text, isUserMessage,  createdAt:Timestamp.fromDate(new Date()) ,uId , movieID
                });
                
                return docRef; // Returning the newly added user details
           
        } catch (error) {
            throw error;
        }
    }

    async retrievePrevMsg({ uId, movieID, limit: limit1, order, lastVisible }:PrevMsgParams) {
        try {
          
          let baseQuery = query(
            collection(this.db, "messages"),
            where("movieID", "==", movieID),
            where("uId", "==", uId),
            orderBy("createdAt", order ? 'asc' : 'desc'),
            limit(limit1 + 1) // Adjust limit for pagination purposes
          );
          
      
        //   if (lastVisible) {
        //     movieQuery = query(movieQuery, startAfter(lastVisible));
        //   }
      
          // console.log('Executing query with conditions:', {
          //   movieID,
          //   uId,
          //   order,
          //   limit: limit1 + 1,
          //   lastVisible
          // });
      
          const querySnapshot = await getDocs(baseQuery);
          // console.log('Query snapshot:', querySnapshot);
      
          if (!querySnapshot.empty) {
            const docs = querySnapshot.docs.map(doc => doc.data());
            // console.log('Retrieved documents:', docs);
            const userDoc = querySnapshot.docs[0];
            // console.log(userDoc.data());
            return docs;
          } else {
            console.log('No documents found');
            return null;
          }
        } catch (err) {
          console.error('Error retrieving messages:', err);
          throw err;
        }
      }

    async createRoom({movieID,roomName,icon,banner,description,createdBy}:roomParams){
        try{
          const q = query(collection(this.db, "room"), where("roomName", "==", roomName));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            
          
            if (!querySnapshot.empty) {
              // User already exists, return their details
              console.log(true)
              const userDoc = querySnapshot.docs[0];
              throw Error('Club Name already exists.')
          } else {
          if(roomName.length==0){
            throw new Error('Room name not found!')
          }
          let members = [createdBy]
          const docRef = await addDoc(collection(this.db, "room"),{
            movieID,roomName,icon,banner,createdBy,createdAt:Timestamp.fromDate(new Date()),users:members,description
          })
         
          
          return docRef; 
        }
        }catch(err){
          console.error('Error retrieving messages:', err);
          throw err;
        }
      }

    async retrieveRoom({roomID}:{roomID:string}){
      try{
        const docRef = doc(collection(this.db, 'room'), roomID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('Room not found');
        }

        return docSnap.data();

      }catch(err){
        throw err
      }
    }
      
    async getYourRooms({user}:{user:string}){
      try{
        let baseQuery = query(
          collection(this.db, "room"),
          where("createdBy", "==", user),
        );
        const querySnapshot = await getDocs(baseQuery);
        if (!querySnapshot.empty) {
          console.log(querySnapshot)
          const docs = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
          console.log('Retrieved documents:', docs);
          const userDoc = querySnapshot.docs[0];
          // console.log(userDoc.data());
          return docs;
        } else {
          console.log('No documents found');
          return null;
        }
      }catch(err){
        throw err;
      }
    }
}

const service = new Services();
export default service;