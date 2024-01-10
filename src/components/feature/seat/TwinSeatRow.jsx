import React from 'react'
import TwinSeat from './TwinSeat';
import classes from './SeatRow.module.css'

const TwinSeatRow = ({column}) => {
    let content = []
    for(let i = 0; i<column; i++){
      content.push(
        <TwinSeat key={i}/>
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

export default TwinSeatRow