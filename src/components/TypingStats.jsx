import React, { useEffect, useState } from 'react'
import { wpm } from '../utils/helper'


const TypingStats = ({ typed, time, typingElement }) => {

    const [words, setWords] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(0)
    const [totaltTyped, setTotalTyped] = useState(1)

    useEffect(() => {
        if (typed.length > 1) {
            if (typed.slice(-1) === " ") {
                setWords((prev) => prev + 1)

            }
            setTypingSpeed(wpm(totaltTyped, time))
            setTotalTyped((prev) => prev + 1)
        }



    }, [typed])

    useEffect(() => {
        setWords(0)
        setTypingSpeed(0)
        setTotalTyped(1)
    }, [typingElement])

    return (
        
            <div className='flex gap-4 ml-4'>
                <p>Words:{words}</p>
                time:{time}
                <p>Raw wpm:{typingSpeed}</p>
            </div>
       
    )
}

export default TypingStats