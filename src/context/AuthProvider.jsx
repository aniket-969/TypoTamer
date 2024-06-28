import React, { useRef } from 'react'
import { useContext, createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInAnonymously } from "firebase/auth"
import { auth } from "../services/firebase/firebase"
import toast from 'react-hot-toast'

const AuthContext = createContext()
const GUEST_SESSION_DURATION = 300000;
export const AuthProvider = ({ children }) => {
    
    const [User, setUser] = useState("") 
    const [loading, setLoading] = useState(true)
    const [isAnonymous, setIsAnonymous] = useState(false)
    const timerRef = useRef(null);
    

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }

    const signUserOut = () => {
        if (timerRef.current) {
          
            clearTimeout(timerRef.current); 
            timerRef.current = null
          } 
          if (localStorage.getItem('guestLoginTimestamp')) {
            toast("Guest session expired");
            
          }
          localStorage.removeItem('guestLoginTimestamp');
          localStorage.removeItem('guestRemainingTime');
         
          return signOut(auth);
    } 
  
    const guestSignIn = async () => {  
        try {
             
            const result = await signInAnonymously(auth);
            const timestamp = Date.now();
            localStorage.setItem('guestLoginTimestamp', timestamp.toString());
            
            timerRef.current = setTimeout(() => {
               
                signUserOut();
              }, GUEST_SESSION_DURATION);
            return result.user;
          } catch (error) {
            throw error;
          }
      };

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }

    const updateUser = async(name) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name
            });
           
            setUser({ ...User, displayName: name });
        } catch (error) {
            throw error
            // console.error("Error updating user profile:", error);
        } 
    }

    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            
             setUser(currentUser)
                setLoading(false)
                if(currentUser){
            setIsAnonymous(currentUser.isAnonymous)

            if (currentUser.isAnonymous) {
                const loginTimestamp = localStorage.getItem('guestLoginTimestamp');
                if (loginTimestamp) {
                  const currentTime = Date.now();
                  const elapsedTime = currentTime - parseInt(loginTimestamp, 10);
                  const remainingTime = GUEST_SESSION_DURATION - elapsedTime;
      
                  if (remainingTime > 0) {
                    timerRef.current = setTimeout(signUserOut, remainingTime);
                  } else {
                    signUserOut();
                  }
                }
              }
            }
          });
      
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            unsubscribe()
        }
    }, [])
 

    const value = {
        User, signUp, signIn, signUserOut, googleSignIn, updateUser,isAnonymous,guestSignIn,setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
} 

export const useUserContext = () => useContext(AuthContext);