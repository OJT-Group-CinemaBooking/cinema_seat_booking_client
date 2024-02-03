import React from 'react'
import classes from './ShowSeat.module.css'
import { Container } from 'react-bootstrap'
// import PremiumSeatRow from './PremiumSeatRow'
// import TwinSeatRow from './TwinSeatRow'
// import ShowSeatType from './ShowSeatType'
import SeatRow from './SeatRow'
import ShowSeatType from './ShowSeatType'

const ShowSeat = ({ seatPatternList, theater }) => {
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  
  
  const alphabetRows = []
  for(let i = 0;i < seatPatternList.reduce((totalRows, sp) => totalRows + sp.rowCount, 0);i++){
    alphabetRows.push(
      <p key={i}>{alphabet[i]}</p>
    )
  }

  const uniqueTypeSeatPatternList = Object.values(seatPatternList.reduce((uniqueSeatPatterns, sp) => {
    if (!uniqueSeatPatterns[sp.seatType]) {
      uniqueSeatPatterns[sp.seatType] = sp;
    }
    return uniqueSeatPatterns;
  }, {}));

  const standardSeatPattern = seatPatternList.filter(sp => sp.seatType === 'STANDARD')
  const premiumSeatPattern = seatPatternList.filter(sp => sp.seatType === 'PREMIUM')
  const twinSeatPattern = seatPatternList.filter(sp => sp.seatType === 'TWIN')
  const reclinerSeatPattern = seatPatternList.filter(sp => sp.seatType === 'RECLINER')
  const vipSeatPattern = seatPatternList.filter(sp => sp.seatType === 'VIP')

  const sortedStandardSp = standardSeatPattern.sort((sp1,sp2) => sp1.rowsOrder - sp2.rowsOrder)
  const sortedPremiumSp = premiumSeatPattern.sort((sp1,sp2) => sp1.rowsOrder - sp2.rowsOrder)
  const sortedTwinSp = twinSeatPattern.sort((sp1,sp2) => sp1.rowsOrder - sp2.rowsOrder)
  const sortedReclinerSp = reclinerSeatPattern.sort((sp1,sp2) => sp1.rowsOrder - sp2.rowsOrder)
  const sortedVipSp = vipSeatPattern.sort((sp1,sp2) =>  sp1.rowsOrder - sp2.rowsOrder)

  let alphabetCount = 0;
  
  const standardRows = []
  for (const standardSp of sortedStandardSp) {
    for( let i = 0; i < standardSp.rowCount; i++ ) {
      const seats = standardSp.seats
      standardRows.push(
        <SeatRow 
        key={`S${standardSp.rowsOrder}${i}`} 
        seats={seats.filter(s => s.rowNo === (1+i))} 
        alphabet={alphabet[alphabetCount]} 
        />
      )
      alphabetCount += 1
    }
  }

  const premiumRows = []
  for (const premiumSp of sortedPremiumSp) {
    for( let i = 0; i < premiumSp.rowCount; i++ ) {
      const seats = premiumSp.seats
      premiumRows.push(
        <SeatRow 
        key={`S${premiumSp.rowsOrder}${i}`} 
        seats={seats.filter(s => s.rowNo === (1+i))} 
        alphabet={alphabet[alphabetCount]} 
        />
      )
      alphabetCount += 1
    }
  }

  const reclinerRows = []
  for (const reclinerSp of sortedReclinerSp) {
    for( let i = 0; i < reclinerSp.rowCount; i++ ) {
      const seats = reclinerSp.seats
      reclinerRows.push(
        <SeatRow 
        key={`S${reclinerSp.rowsOrder}${i}`} 
        seats={seats.filter(s => s.rowNo === (1+i))} 
        alphabet={alphabet[alphabetCount]} 
        />
      )
      alphabetCount += 1
    }
  }

  const twinRows = []
  for (const twinSp of sortedTwinSp) {
    for( let i = 0; i < twinSp.rowCount; i++ ) {
      const seats = twinSp.seats
      twinRows.push(
        <SeatRow 
        key={`S${twinSp.rowsOrder}${i}`} 
        seats={seats.filter(s => s.rowNo === (1+i))} 
        alphabet={alphabet[alphabetCount]} 
        />
      )
      alphabetCount += 1
    }
  }
  
  const vipRows = []
  for (const vipSp of sortedVipSp) {
    for( let i = 0; i < vipSp.rowCount; i++ ) {
      const seats = vipSp.seats
      vipRows.push(
        <SeatRow 
        key={`S${vipSp.rowsOrder}${i}`} 
        seats={seats.filter(s => s.rowNo === (1+i))} 
        alphabet={alphabet[alphabetCount]} 
        />
      )
      alphabetCount += 1
    }
  }

  return (
    <Container className={classes.wapper}>
      <div className={classes.screen}>{theater?.screen}</div>
      <div className={classes.alphabet_left}>
        {alphabetRows}
      </div>
      <div className={classes.alphabet_right}>
        {alphabetRows}
      </div>
        {standardRows}
        {premiumRows}
        {reclinerRows}
        {vipRows}
        {twinRows}

      <div className={classes.seat_types}>

      <div className={classes.seat_type}>
        <img src={`${process.env.PUBLIC_URL}/images/booked-seat.png`} alt="seat" />
          <br />
          Booked Seat
      </div>

      <div className={classes.seat_type}>
        <img src={`${process.env.PUBLIC_URL}/images/selected-seat.png`} alt="seat" />
          <br />
          Selected Seat
      </div>
        {
          uniqueTypeSeatPatternList.map(seatPattern => 
            <ShowSeatType 
              key={seatPattern.id} 
              seatType={seatPattern.seatType} 
              seatPrice={seatPattern.seatPrice} 
            />
          )
        }
      </div>
    </Container>
  )
}

export default ShowSeat