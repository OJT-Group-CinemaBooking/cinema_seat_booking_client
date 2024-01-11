import React from 'react'
import classes from './SeatRow.module.css'
import PremiumSeat from './PremiumSeat'

const PremiumSeatRow = ({column}) => {
  let content = []
  for(let i = 0; i<column; i++){
    content.push(
      <PremiumSeat key={i}/>
    );
  }
  return (
    <>
    <div className={classes.seat}>
      {content}
    </div>
    </>
  )
}

export default PremiumSeatRow