import React, { useEffect, useRef, useState } from 'react'
import { findAndSortCharactersByWeakness } from '../services/firebase/TypingErrors'
import { useNavigate, useParams } from 'react-router-dom'
import Typing from '../components/Typing'
import useEngine from '../hooks/useEngine'
import { useTypingContext } from '../context/TextProvider'
import TypingStats from '../components/TypingStats'
import { FaHome } from "react-icons/fa";
import UserDetails from '../components/UserDetails'
import { useUtilitiesContext } from '../context/UtilitiesProvider'
import MobileInput from './../components/MobileInput';

const Profile = () => {
  const { userId } = useParams()
  const [userError, setUserError] = useState([])
  const scrollRef = useRef()
  const { typingelement, setTypingProfile, setTypingElement, setVisibility, keyEnable, mobileInput, setMobileInput, mobileInputVisible, setMobileInputVisible } = useTypingContext()
  const { isLoading, setIsLoading } = useUtilitiesContext()
  const [showProfile, setShowProfile] = useState(false)
  const { fontSize } = useUtilitiesContext()
  const navigate = useNavigate()


  const getUserErrorData = async () => {
    setIsLoading(true)
    const file = await findAndSortCharactersByWeakness(userId)
    if (!file.length == 0) {
      setShowProfile(true)
      setUserError(file)
      setTypingElement(file[0].char)
    }
    setIsLoading(false)
  }

  const { typingTexts, typed, timeLeft } = useEngine()

  useEffect(() => {

    setTypingProfile(true)
    getUserErrorData()

  }, [])


  const handleButtonClick = (element) => {

    setTypingElement(element)

  }

  const homeButton = () => {
    setVisibility({
      leaderboard: false,
      settings: false,
      zen: false,
      custom: false,
      customWordsandTime: false
    });
    keyEnable.current = true;
    navigate("/");

  }


  if (isLoading) {
    return <div className="loading-container">
      <div className="spinner"></div>
      <p className='loading'>Loading...</p>
    </div>
  }

  const handleInput = (e) => {
    setMobileInput(e.target.value)
  }

  return (
    <>
      {showProfile ?

        <div className={` h-[100vh] px-10 flex flex-col w-[100%] items-center gap-4  ${mobileInputVisible?"justify-start mt-5":"justify-center"}`}>

          <div className={`w-[100%] ml-4  ${mobileInputVisible ? "hidden" : ""}`} title='home' >
            <button className='icon ' onClick={() => homeButton()}>
              <FaHome className='w-[1.25em] text-[1.2rem] profile-home-btn' />
            </button>
          </div>

          <UserDetails mobileInputVisible={mobileInputVisible} />

          <TypingStats typingElement={typingelement} typed={typed} time={3600 - timeLeft} />

          <div ref={scrollRef} className='relative [word-spacing:6px]  w-[100%] overflow-hidden flex items-center justify-center max-w-[1280px] mt-5 ' style={{ fontSize: fontSize.size, lineHeight: fontSize.lineheight, height: fontSize.height }}>
            <Typing userInput={typed} words={typingTexts} scrollRef={scrollRef} scroll={fontSize.scroll} />

          </div>
          <MobileInput handleInput={handleInput} mobileInput={mobileInput} mobileInputVisible={mobileInputVisible} setMobileInputVisible={setMobileInputVisible} />
          <div className={`grid grid-flow-row lg:grid-cols-10 md:grid-cols-8 grid-cols-6 gap-4 h-[100px] overflow-auto scrollbar-custom mt-6 px-2  ${mobileInputVisible?"hidden":""}`}>
            {userError.map((data, key) => (

              <button className='profile-btn outline-none' onClick={() => handleButtonClick(data.char)} key={key}>{data.char}</button>

            ))} </div >
        </div>

        :
        <div className='flex flex-col justify-center items-center gap-10 p-4'>
          <div className='sm:text-[2rem] text-[1.2rem] flex items-center justify-start '>There is no data available . Please type at least one test</div>
          <div className=' w-[100%] sm:text-[1.7rem] text-[1.2rem] flex items-center justify-center' title='home' >
            <button className='button w-full' onClick={() => homeButton()}>
              <p className='  w-[full] profile-home-btn'>Go to home</p>
            </button>
          </div>
        </div>
      }

    </>

  )
}

export default Profile