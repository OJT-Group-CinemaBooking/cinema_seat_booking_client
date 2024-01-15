import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'

const NomalSeat = ({taken,seatname}) => {
  const [selectSeat,setSelectSeat] = useState('./images/red-seat.png')
  
  const seat = "./images/gray-seat.png"
  useEffect(() => {
    if (taken) {
      setSelectSeat(seat);
    }
  }, [taken]);


  const imageClick = () => {
    if(!taken){
      if(selectSeat === './images/red-seat.png'){
        setSelectSeat('./images/white-seat.png')
        }else{
          setSelectSeat('./images/red-seat.png')
        }
    } 
    console.log(seatname)
  }
  return (
    <>
       <Image src={selectSeat} onClick={imageClick} alt='seat' />
    </>
  )
}

export default NomalSeat