import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import classes from './TwinSeat.module.css'

const TwinSeat = () => {
    const [selectSeat,setSelectSeat] = useState('./images/twin-seat.png')
    const imageClick = () => {
      console.log("image Click")
      if(selectSeat === './images/twin-seat.png'){
      setSelectSeat('./images/gray-seat.png')
      }else{
        setSelectSeat('./images/twin-seat.png')
      }
    }
    return (
      <div onClick={imageClick} className={classes.seat}>
         <Image src={selectSeat} alt='seat' />
         <Image src={selectSeat} alt='seat' />
      </div>
    )
}

export default TwinSeat