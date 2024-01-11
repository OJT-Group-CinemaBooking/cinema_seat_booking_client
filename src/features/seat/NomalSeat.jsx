import React, { useState } from 'react'
import { Image } from 'react-bootstrap'

const NomalSeat = () => {
  const [selectSeat,setSelectSeat] = useState('./images/red-seat.png')
  const imageClick = () => {
    if(selectSeat === './images/red-seat.png'){
    setSelectSeat('./images/gray-seat.png')
    }else{
      setSelectSeat('./images/red-seat.png')
    }
  }
  return (
    <>
       <Image src={selectSeat} onClick={imageClick} alt='seat' />
    </>
  )
}

export default NomalSeat