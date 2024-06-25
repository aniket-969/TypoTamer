import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Auth/SignUp'
import { AuthProvider } from './context/AuthProvider'
import toast, { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import { TextProvider } from './context/TextProvider'
import { useEffect } from 'react'
import { generateToken } from './services/firebase/notification'
import { onMessage } from 'firebase/messaging'
import { messaging } from './services/firebase/firebase'
import { UtilitiesProvider } from './context/UtilitiesProvider'


function App() {

  useEffect(() => {
    const getNotificationToken = async () => {
      const token = await generateToken();
      if (token && token.message === "permission denied") {
        console.warn("Notification permission denied by user.");

      } else if (token) {

        onMessage(messaging, (payload) => {
          console.log(payload);
          toast(payload.notification.body)
        });
      } else {
        console.error("Error generating notification token.");

      }
    };

    getNotificationToken();

    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body)
    });
  }, [])

  return (
    <>
      <AuthProvider>
        <TextProvider>
          <UtilitiesProvider>
            <Routes>
              <Route path='/sign-up' element={<SignUp />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Home />} />
                <Route path='/profile/:userId' element={<Profile />} />
              </Route>
            </Routes>
            <Toaster position='top-right' />
          </UtilitiesProvider>
        </TextProvider>

      </AuthProvider>
    </>
  )
}

export default App
