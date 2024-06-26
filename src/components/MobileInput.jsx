import React from 'react'

const MobileInput = ({handleInput,mobileInput}) => {
  return (
    <div className='sm:hidden visible'>
            <input type="text" onChange={handleInput} value={mobileInput}/>
          </div>
  )
}

export default MobileInput