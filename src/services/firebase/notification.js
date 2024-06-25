import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

export const generateToken = async()=>{
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY
          });
        //   console.log(token);
          return token;
        } else {
          console.warn('Notification permission denied by user.');
          return {message:"permission denied"};
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return error; 
      }
}