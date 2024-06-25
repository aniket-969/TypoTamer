import SignOut from './SignOut'
import { useTypingContext } from '../context/TextProvider'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { FaCrown } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";

const Navbar = () => {

    const { toggleVisibility, visibility } = useTypingContext()
    const navigate = useNavigate()
    const { User } = useUserContext()
  
    const { isAnonymous } = useUserContext()
    
    const handleProfileButton = () => {
        if (isAnonymous) {
            toast.error("Login is required to access personalized typing profile")
        }
        else {
            navigate(`/profile/${User.uid}`)
        }
    }

    return (
        <nav className='flex items-center justify-between text-[1em] w-[100%] sm:ml-5 mr-4 max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1280px] sm:p-0 pr-2 py-2'>

            <ul className='flex items-center justify-center gap-1 '>
                <li className='mx-4  text-[1.12rem] sm:text-[1.8rem] text-main' onClick={() => {

                    toggleVisibility("home")

                }}>typoTamer</li>

                <li className='nav-icon' title='home' onClick={() => { toggleVisibility("home") }}>
                    <div className='icon'>
                        <FaKeyboard className='w-[1.25em]' />
                    </div>
                </li>

                <li className='nav-icon' title='leaderboard' onClick={() => {
                    if (!visibility.leaderboard) {
                        toggleVisibility("leaderboard")
                    }
                }}>
                    <div className='icon'>
                        <FaCrown className='w-[1.25em]' />
                    </div></li>

                <li className='nav-icon' title='about' onClick={() => {
                    if (!visibility.about) {
                        toggleVisibility("about")
                    }
                }}>
                    <div className='icon'>
                        <FaInfo className='w-[1.25em]' />
                    </div></li>

                <li className='nav-icon' title='settings' onClick={() => {
                    if (!visibility.settings) {
                        toggleVisibility('settings')
                    }
                }}>
                    <div className='icon'>
                        <FaCog className='w-[1.25em]' />
                    </div></li>
            </ul>

            <ul className='flex items-center justify-center  gap-2'>
                <li className='nav-icon' title='profile' onClick={() => handleProfileButton()}>
                    <div className='icon'>
                        <FaRegUser className='w-[1.25em]' />
                    </div></li>
                <li className='nav-icon' title='signout'>

                    <SignOut />
                </li>

            </ul>

        </nav>
    )
}

export default Navbar