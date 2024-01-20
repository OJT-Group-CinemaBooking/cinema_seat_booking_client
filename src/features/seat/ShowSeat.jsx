import React from 'react'
import NomalSeatRow from './NomalSeatRow'
import classes from './ShowSeat.module.css'
import { Container } from 'react-bootstrap'
import PremiumSeatRow from './PremiumSeatRow'
import TwinSeatRow from './TwinSeatRow'
import ShowSeatType from './ShowSeatType'

const ShowSeat = ({seat}) => {
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","N","O"]
  
  
  const alphabetRows = []
  for(let i = 0;i < seat.reduce((totalRows, s) => totalRows + s.rows, 0);i++){
    alphabetRows.push(
      <p key={i}>{alphabet[i]}</p>
    )
  }

  const normalRows = []
  for(let i=0;i<(seat[0]).rows;i++){
    normalRows.push(<NomalSeatRow key={`normal-${i}`} column={seat[0].column} alphabet={alphabet[i]}/>)
  }

  const premiumRows = []
  for(let i=0;i<(seat[1]).rows;i++){
    normalRows.push(<PremiumSeatRow key={`premium-${i}`} column={seat[1].column}/>)
  }

  const twinRows = []
  for(let i=0;i<(seat[2]).rows;i++){
    normalRows.push(<TwinSeatRow key={`twin-${i}`} column={seat[2].column}/>)
  }
  return (
    <>
    <Container className={classes.wapper}>
        <div className={classes.screen}>Screen</div>
        <div className={classes.alphabet_left}>
          {alphabetRows}
        </div>
        <div className={classes.alphabet_right}>
          {alphabetRows}
        </div>
          {normalRows}
          {premiumRows}
          {twinRows}

          <ShowSeatType seat={seat}/>  
    </Container>
    
    </>
  )
}

export default ShowSeat