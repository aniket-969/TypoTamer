import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const updateLeaderBoard = async (
  time,
  wpm,
  accuracy,
  User,
  username = null
) => {
  try {
    
    if (time != 30 && time != 60) {
      
      return;
    }

    if (accuracy < 90) {
      
      return { message: "Accuracy should be above 90 for leaderboard" };
    }

    const userId = User.uid;
    const leaderboardCollection = collection(db, "LeaderBoard");
    const userDocRef = doc(leaderboardCollection, userId);

    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {});
    }

    const timeControlDocRef = doc(userDocRef, "TimeControls", time.toString());
    const timeControlDocSnapshot = await getDoc(timeControlDocRef); 
    const timeControlData = timeControlDocSnapshot.data() || {};

    if (timeControlData.wpm > wpm) {
      return { message: "Speed is not greater, Leaderboard not updated" };
    } else if (
      timeControlData.wpm == wpm &&
      timeControlData.accuracy >= accuracy
    ) {
      

      return { message: "Accuracy is not greater, Leaderboard not updated" };
    }

    await setDoc(timeControlDocRef, {
      timeControlType: time,
      accuracy: accuracy,
      wpm: wpm,
      username: username || User.displayName,
      profile:User.
      photoURL||"not available",
      time: new Date().toISOString()
    });

    return { message: "Leaderboard Updated" };
  } catch (error) {
   
    return { error: error.message };
  }
}; 

export const fetchLeaderboardData = async (timeControlType) => {
  try {
    const leaderboardCollectionRef = collection(db, "LeaderBoard");
    const querySnapshot = await getDocs(leaderboardCollectionRef);

    const leaderboardData = [];

    for (const userDoc of querySnapshot.docs) {
      const userId = userDoc.id;
      const timeControlsCollectionRef = collection(userDoc.ref, "TimeControls");

      const q = query(
        timeControlsCollectionRef,
        where("timeControlType", "==", timeControlType)
      );
      const timeControlQuerySnapshot = await getDocs(q);

      if (!timeControlQuerySnapshot.empty) {
        const timeControlDoc = timeControlQuerySnapshot.docs[0];
        leaderboardData.push({
          userId: userId,
          accuracy: timeControlDoc.data().accuracy,
          timeControlType: timeControlDoc.data().timeControlType,
          wpm: timeControlDoc.data().wpm,
          time: timeControlDoc.data().time,
          username: timeControlDoc.data().username,
          photoURL: timeControlDoc.data().profile,
        });
      }
    }

    leaderboardData.sort((a, b) => {
      if (b.wpm !== a.wpm) {
        return b.wpm - a.wpm; // Sort by wpm in descending order
      } else {
        return b.accuracy - a.accuracy; // If wpm is the same, sort by accuracy in descending order
      }
    });


    return leaderboardData;
  } catch (error) {
    // console.error("Error fetching leaderboard data:", error);
    return {message:"Error fetching leaderboard data:"};
  }
};

export const updateLeaderboardPhotoUrl = async (userId, photoUrl) => {
    try {
      const leaderboardCollectionRef = collection(db, "LeaderBoard");
      const userDocRef = doc(leaderboardCollectionRef, userId);
  
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
       
        const timeControlsCollectionRef = collection(userDocRef, "TimeControls");
        
        const timeControls = ["30", "60"];
        for (const timeControl of timeControls) {
          const timeControlDocRef = doc(timeControlsCollectionRef, timeControl);
          const timeControlDocSnapshot = await getDoc(timeControlDocRef);
          if (timeControlDocSnapshot.exists()) {
            await updateDoc(timeControlDocRef, { profile: photoUrl });
          }
        }
  
        // console.log("Leaderboard data updated with new photo URL.");
      } else {
        // console.error("User document not found or missing TimeControls subcollection.");
      }
    } catch (error) {
      // console.error("Error updating leaderboard data:", error);
    }
  };
  
  