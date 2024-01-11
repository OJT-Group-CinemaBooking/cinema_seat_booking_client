import React from 'react'
import classes from './SeatRow.module.css'
import NomalSeat from './NomalSeat'

const NomalSeatRow = ({column}) => {
  let content = []
  for(let i = 0; i<column; i++){
    content.push(
      <NomalSeat key={i}/>
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