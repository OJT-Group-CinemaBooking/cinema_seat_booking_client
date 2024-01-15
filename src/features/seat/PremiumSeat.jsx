import React, { useState } from 'react'
import { Image } from 'react-bootstrap'

const PremiumSeat = () => {
const [selectSeat,setSelectSeat] = useState('./images/yellow-seat.png')
  const imageClick = () => {
    console.log("image Click")
    if(selectSeat === './images/yellow-seat.png'){
    setSelectSeat('./images/white-seat.png')
    }else{
      setSelectSeat('./images/yellow-seat.png')
    }
  }
  return (
    <>
       <Image src={selectSeat} onClick={imageClick} alt='seat' />
    </>
  )
}

export default PremiumSeat