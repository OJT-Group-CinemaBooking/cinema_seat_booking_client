import React from 'react'
import classes from './SeatRow.module.css'
import Seat from './Seat'
import TwinSeat from './TwinSeat'

const SeatRow = ({ seats, alphabet }) => {
  let seatList = []
  for(let i = 1; i <= seats.length; i++){ 
    const seat = seats.find(s => s.columnNo === i)
    seatList.push(
      (seat.type !== 'TWIN')?
      <Seat key={`S${seat.id}`} seat={seat} seatName={`${alphabet}-${i}`}/> : 
      <TwinSeat  key={`S${seat.id}`} seat={seat} seatName={`${alphabet}-${i}`}/>
    );
  }
  return (
    <div className={classes.seat}>
      {seatList}
    </div>
  )
}

export default SeatRow