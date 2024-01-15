import React from 'react'
import classes from './SeatRow.module.css'
import NomalSeat from './NomalSeat'

const NomalSeatRow = ({column,alphabet}) => {
  let content = []
  for(let i = 0; i<column; i++){
    content.push(
      <NomalSeat key={i} taken={true} seatname={`${alphabet}-${i+1}`}/>
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

export default NomalSeatRow