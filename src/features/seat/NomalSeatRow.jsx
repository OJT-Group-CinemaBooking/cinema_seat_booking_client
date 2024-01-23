import React from 'react'
import classes from './SeatRow.module.css'
import NomalSeat from './NomalSeat'

const NomalSeatRow = ({column,alphabet}) => {
  let content = []
  const take = [true,false,true,true,false,true,true]
  for(let i = 0; i<column; i++){
    content.push(
      <NomalSeat key={i} taken={take[i]} seatname={`${alphabet}-${i+1}`}/>
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