
import { useTypingContext } from '../context/TextProvider'

const CountedownTimer = ({ timeLeft }) => {
const{selectedOptions} = useTypingContext()

    return (
        <>
             
                 <div className={selectedOptions.words ? `text-bg text-[1.6rem] visible flex w-[100%] font-[700] justify-center items-center`:`text-main text-[1.6rem] visible flex w-[100%] font-[700]  justify-center items-center `}>
                    {timeLeft}</div>
             

        </>

    )
}

export default CountedownTimer