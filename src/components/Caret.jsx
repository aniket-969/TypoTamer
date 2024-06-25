import {motion} from "framer-motion"

const Caret = ({position}) => {
  return (
    <motion.div aria-hidden={true}
    className='inline-block w-0.5 h-7 caret'
    style={{
      position: 'absolute',
      left: position.left,
      top: position.top - 25,
    }}
    initial={{opacity:1}}
    animate={{opacity:0}}
    exit={{opacity:1}}
    transition={{repeat:Infinity,duration:0.8,ease:"easeInOut"}}
    />
  )
}

export default Caret