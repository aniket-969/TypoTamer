import { useEffect, useState } from 'react'
import { fetchLeaderboardData } from '../services/firebase/LeaderboardData';
import { IoPersonCircle } from "react-icons/io5";
import { formatISODateTime } from '../utils/helper';
import { useUtilitiesContext } from '../context/UtilitiesProvider';

const Leaderboard = () => {

  const [thirtySecondsData, setThirtySecondsData] = useState([])
  const [sixtySecondsData, setSixtySecondsData] = useState([])

  const { isLoading, setIsLoading } = useUtilitiesContext()

  const getLeaderBoardData = async () => {
    setIsLoading(true)
    const leadData = await fetchLeaderboardData(30)
    setThirtySecondsData(leadData)
    const leadsData = await fetchLeaderboardData(60)
    setSixtySecondsData(leadsData)
    
    setIsLoading(false)
  }

  useEffect(() => {
    getLeaderBoardData()
  }, [])

  if (isLoading) {
    return <div className="loading-container">
      <div className="spinner"></div>
      <p className='loading text-main'>Loading...</p>
    </div>
  }
  return (
    <section className='h-[85vh] flex flex-col items-start justify-between mx-5 pt-5 px-2 '>

      <h1 className='text-2xl pl-6 text-main'>
        All - Time Leaderboards
      </h1>

      <div className='lg:flex-row flex flex-col h-[100%] w-[100%] lg:items-center lg:mb-12 lg:gap-5 '>

        {/* 30 seconds table */}

        <article className='flex flex-col gap-2 justify-center pt-[1rem] max-h-[45%] px-6 text-[0.8rem] lg:max-h-[95%] lg:w-[90%] overflow-x-scroll '>

          <h2 className='text-lg'>Time 30</h2>

          {/* index */}
          <header className='flex justify-between items-center text-sub  w-[100%] min-w-[350px]'>
            <div className='flex gap-7 pl-3 '>
              <span>#</span>
              <span>name</span>
            </div>
            <div className='flex gap-[5rem] pr-4'>
              <div className='flex flex-col items-end'>
                <span>wpm</span>
                <span>accuracy</span>
              </div>
              <span>date</span>
            </div>

          </header>
          <div className='overflow-y-scroll w-[100%] min-w-[350px]'>
            {thirtySecondsData.map((item, index) => (

              <div key={index} className={`flex flex-row justify-between text-[0.8rem] font-normal px-4 py-2 `} style={{
                backgroundColor: index % 2 === 0 ? 'var(--sub-alt-color)' : 'var(--bg-color)'
              }}>
                {/* first part */}
                <div className='flex gap-5 items-center' key={index}>

                  <span>{index + 1}</span>
                  <div className='flex items-center gap-3'>

                    {item.photoURL === "not available" ?
                      <span className='text-sub '>
                        <IoPersonCircle className='rounded-2xl w-[1.25rem] h-[1.25rem]' />
                      </span> :

                      <div className=' '><img className='rounded-2xl w-[1.25rem] h-[1.25rem]' src={item.photoURL} /></div>}
                    <p> {item.username}</p>
                  </div>

                </div>

                {/* second part */}
                <div className='flex gap-10'>
                  <div className='flex flex-col items-end'>
                    <span>  {item.wpm.toFixed(2)}</span>
                    <span className='text-sub'>   {item.accuracy.toFixed(2)}%</span>

                  </div>

                  <div className='flex flex-col items-end'>
                    <span>{formatISODateTime(item.time).formattedDate}</span>
                    <span className='text-sub'>  {formatISODateTime(item.time).formattedTime}</span>
                  </div>

                </div>
              </div>


            ))}
          </div>

        </article>



        {/* 60 seconds table */}

        <article className='flex flex-col gap-2 justify-center pt-[1rem] max-h-[45%] px-6 text-[0.8rem] lg:max-h-[95%] lg:w-[90%] overflow-x-scroll '>

          <h2 className='text-lg'>Time 60</h2>

          {/* index */}
          <header className='flex justify-between items-center text-sub w-[100%] min-w-[350px] '>
            <div className='flex gap-7 pl-3'>
              <span>#</span>
              <span>name</span>
            </div>
            <div className='flex gap-[6rem] pr-4'>
              <div className='flex flex-col items-end'>
                <span>wpm</span>
                <span>accuracy</span>
              </div>
              <span>date</span>
            </div>

          </header>
          <div className='overflow-y-scroll w-[100%] min-w-[350px]'>
            {sixtySecondsData.map((item, index) => (

              <div key={index} className={`flex flex-row justify-between text-[0.8rem] font-normal px-4 py-2 `} style={{
                backgroundColor: index % 2 === 0 ? 'var(--sub-alt-color)' : 'var(--bg-color)'
              }}>
                {/* first part */}
                <div className='flex gap-5 items-center' key={index}>

                  <span>{index + 1}</span>
                  <div className='flex items-center gap-3'>

                    {item.photoURL === "not available" ?
                      <span className='text-sub '>
                        <IoPersonCircle className='rounded-2xl w-[1.25rem] h-[1.25rem]' />
                      </span> :

                      <div ><img className='rounded-2xl w-[1.25rem] h-[1.25rem]' src={item.photoURL} /></div>}
                    <span> {item.username}</span>
                  </div>

                </div>
                {/* second part */}
                <div className='flex gap-10'>
                  <div className='flex flex-col items-end'>
                    <span>  {item.wpm.toFixed(2)}</span>
                    <span className='text-sub'>   {item.accuracy.toFixed(2)}%</span>

                  </div>


                  <div className='flex flex-col items-end'>
                    <span>{formatISODateTime(item.time).formattedDate}</span>
                    <span className='text-sub'>  {formatISODateTime(item.time).formattedTime}</span>
                  </div>

                </div>
              </div>


            ))}
          </div>

        </article>

      </div>

    </section>

  )
}

export default Leaderboard