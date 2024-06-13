import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { Timestamp, arrayRemove, arrayUnion, getDoc, getFirestore, orderBy, startAfter } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc , query, where ,limit } from "firebase/firestore";

import conf from "./config";
import { randomUUID } from "crypto";
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

interface postParams{
  userId:string,roomName:string,title:string,body:string,roomId:string
}
interface post2Params{
  userId:string,roomName:string,title:string,body:string,roomId:string,files:string[]
}
interface pollOptionParams {
  text: string,
}
interface post3Params{
  userId:string,roomName:string,title:string,question:string,roomId:string,pollOption:pollOptionParams[]
}
interface votedParams{
  uId:string,
  option:number
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
            // console.log(querySnapshot)
            
            if (!querySnapshot.empty) {
                // User already exists, return their details
                // console.log(true)
                const userDoc = querySnapshot.docs[0];
                return userDoc.data(); // Returning existing user details
            } else {
                // User does not exist, add the new user details
                // console.log(false)

                const docRef = await addDoc(collection(this.db, "users"), {
                    uId, email, username, createdAt,joined:[]
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
    async getUser({uId}:{uId:string}){
      try{
        const baseQuery = query(collection(this.db, 'users'), where('uId','==',uId));
        // const docSnap = await getDoc(docRef);
        const querySnapshot = await getDocs(baseQuery);
        if (!querySnapshot.empty) {
          // console.log(querySnapshot)
          const docs = querySnapshot.docs.map(doc => doc.data());
          return docs;
      }else{
        throw new Error('No user found')
      }
      
    }catch(err){
        console.log(err)
        throw new Error('No user found')
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
            // console.log(querySnapshot)
            
          
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

      async editRoom({roomId,description,icon,banner}:{roomId:string,description:string,icon:string,banner:string}){
        try{
          const docRef = doc(collection(this.db, 'room'), roomId);
          return await updateDoc(docRef, {
            description,icon,banner
        });
 
        }catch(err){
          throw err
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
    async exploreRooms({limit}:{limit:number}){
      try{
        let baseQuery = query(
          collection(this.db, "room")
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

    async getJoinedRooms({ userId }:{userId:string}) {
      try {
        const baseQuery = query(
          collection(this.db, 'users'),
          where('uId', '==', userId)
        );
  
        const querySnapshot = await getDocs(baseQuery);
        const docs = querySnapshot.docs.map(doc => doc.data());
  
        if (docs[0]?.joined?.length > 0) {
          const roomDocsPromises = docs[0].joined.map(async (roomID:string) => {
            return await this.retrieveRoom({ roomID });
          });
  
          const roomDocs = await Promise.all(roomDocsPromises);
          return roomDocs;
        } else {
          return [];
        }
      } catch (err) {
        throw err;
      }
    }
    async joinClub({userId , roomId}:{userId:string , roomId:string}){
      try{
        const userDocRef = doc(this.db, "room", roomId);
         const room =  await updateDoc(userDocRef, {
                users: arrayUnion(userId)
            });

            const q = query(
              collection(this.db, "users"),
              where("uId", "==", userId)
            );
        
          
            const querySnapshot = await getDocs(q);
        
            querySnapshot.forEach(async (doc) => {
              const docRef = doc.ref;
              const docData = doc.data();
      if (docData.joined) {
        
        await updateDoc(docRef, {
          joined: arrayUnion(roomId)
        });
      } else {
        await updateDoc(docRef, {
          joined: [roomId]
        });
      }
            });


            return

      }catch(err){
        console.log(err)
      }
    }

    async leaveCLub({userId , roomId}:{userId:string , roomId:string}){
      try{
        const userDocRef = doc(this.db, "room", roomId);
        await updateDoc(userDocRef, {
          users: arrayRemove(userId)
      });
      const q = query(
        collection(this.db, "users"),
        where("uId", "==", userId)
      );
  
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          joined: arrayRemove(roomId)
        });
      });
  
      }catch(err){
        console.log(err)
      }
    }

    async createTextPost({userId,roomName,title,body,roomId}:postParams){
      try{
        if(title.length===0 && body.length===0)
          throw new Error('Title and Body field should not be empty')
        const liked:string[] = []
        const docRef = await addDoc(collection(this.db, "textPost"),{
            userId,roomName,roomId,title,body,likes:liked,createdAt:Timestamp.fromDate(new Date())
        })
        
      return docRef; 
        
      }catch(err){
        console.log(err)
      }
    }
    async createMediaPost({userId,roomName,title,body,roomId , files}:post2Params){
      try{
        if(title.length===0 && body.length===0 && files.length == 0)
          throw new Error('Title and Body field should not be empty')
        const liked:string[] = []
        const docRef = await addDoc(collection(this.db, "mediaPost"),{
            userId,roomName,roomId,title,body,likes:liked,files,createdAt:Timestamp.fromDate(new Date())
        })
        
      return docRef; 
        
      }catch(err){
        console.log(err)
      }
    }
    async createPollPost({userId,roomName,title,question,roomId , pollOption}:post3Params){
      try{
        if(title.length===0 && question.length===0)
          throw new Error('Title and Body field should not be empty')
        if([pollOption[0].text,pollOption[1].text].some(ele=>ele?.trim()==='')){
          throw new Error('Minimum there should be two options!')
        }
        if(pollOption.length===3 &&  pollOption[2].text.trim()===''){
          throw new Error('Options must not be empty!')
        }
        const liked:string[] = []
        // const voted:votedParams[] = []
        const voters1:string[] = []
        const voters2:string[] = []
        const voters3:string[] = []
        const docRef = await addDoc(collection(this.db, "pollPost"),{
            userId,roomName,roomId,title,question,likes:liked,pollOption,createdAt:Timestamp.fromDate(new Date()),voters1,voters2,voters3
        })
        
      return docRef; 
        
      }catch(err){
        console.log(err)
      }
    }

    async getTextPost({roomID,limit}:{roomID:string,limit:number}){
      try {
          
        let baseQuery = query(
          collection(this.db, "textPost"),
          where("roomId", "==", roomID),
          orderBy("createdAt", 'desc')
        );
        
    
    
    
        const querySnapshot = await getDocs(baseQuery);
        // console.log('Query snapshot:', querySnapshot);
    
        if (!querySnapshot.empty) {
         
          const docs = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
          // console.log('Retrieved documents:', docs);
          const userDoc = querySnapshot.docs[0];
          // console.log(userDoc.data());
          return docs;
        } else {
          
          return null;
        }
      } catch (err) {
        console.error('Error retrieving messages:', err);
        throw err;
      }
    }
    async getMediaPost({roomID,limit}:{roomID:string,limit:number}){
      try {
          
        let baseQuery = query(
          collection(this.db, "mediaPost"),
          where("roomId", "==", roomID),
          orderBy("createdAt", 'desc')
        );
        
    
    
    
        const querySnapshot = await getDocs(baseQuery);
        // console.log('Query snapshot:', querySnapshot);
    
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
          // console.log('Retrieved documents:', docs);
          const userDoc = querySnapshot.docs[0];
          // console.log(userDoc.data());
          return docs;
        } else {
          
          return null;
        }
      } catch (err) {
        console.error('Error retrieving messages:', err);
        throw err;
      }
    }
    async getPollPost({roomID,limit}:{roomID:string,limit:number}){
      try {
          
        let baseQuery = query(
          collection(this.db, "pollPost"),
          where("roomId", "==", roomID),
          orderBy("createdAt", 'desc')
        );
        
    
    
    
        const querySnapshot = await getDocs(baseQuery);
        // console.log('Query snapshot:', querySnapshot);
    
        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
          // console.log('Retrieved documents:', docs);
          const userDoc = querySnapshot.docs[0];
          // console.log(userDoc.data());
          return docs;
        } else {
          
          return null;
        }
      } catch (err) {
        console.error('Error retrieving messages:', err);
        throw err;
      }
    }

    async addVote({ postId, userId, option }:{postId:string, userId:string, option:number}) {
      try {
        const userDocRef = doc(this.db, "pollPost", postId);
    
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          console.log("Before update:", docSnap.data());
        } else {
          console.log("No such document!");
          return;
        }
    
        
        if(option === 0){
          return await updateDoc(userDocRef,{
            voters1:arrayUnion(userId)
          })
        }
        if(option === 1){
          return await updateDoc(userDocRef,{
            voters2:arrayUnion(userId)
          })
        }
        if(option === 2){
          return await updateDoc(userDocRef,{
            voters3:arrayUnion(userId)
          })
        }
       
      } catch (err) {
        console.error(err);
        throw err;
      }
    }

    async addLike({postId,userId,type}:{postId:string,userId:string,type:number}){
      try{
        if(type === 0){
          const userDocRef = doc(this.db, "textPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayUnion(userId)
          })
        }
        if(type === 1){
          const userDocRef = doc(this.db, "mediaPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayUnion(userId)
          })
        }
        if(type === 2){
          const userDocRef = doc(this.db, "pollPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayUnion(userId)
          })
        }

      }catch(err){
        console.log(err)
        throw err;
      }
    }
    async removeLike({postId,userId,type}:{postId:string,userId:string,type:number}){
      try{
        if(type === 0){
          const userDocRef = doc(this.db, "textPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayRemove(userId)
          })
        }
        if(type === 1){
          const userDocRef = doc(this.db, "mediaPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayRemove(userId)
          })
        }
        if(type === 2){
          const userDocRef = doc(this.db, "pollPost", postId);
          return await updateDoc(userDocRef,{
            likes:arrayRemove(userId)
          })
        }

      }catch(err){
        console.log(err)
        throw err;
      }
    }
}

const service = new Services();
export default service;