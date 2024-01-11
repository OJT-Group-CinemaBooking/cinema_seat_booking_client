import React from 'react'
import ShowSeat from '../features/seat/ShowSeat'
import OrderSummary from '../features/seat/OrderSummary'

const SeatBookingPage = () => {

  const seat = [{
    name:"Normal Seat",
    rows:4,
    column:20,
    seatType:"normal",
    seatPrice:8000
  },{
    name:"Premium Seat",
    rows:2,
    column:15,
    seatType:"premium",
    seatPrice:12000
  },{
    name:"Twin Seat",
    rows:1,
    column:8,
    seatType:"twin",
    seatPrice:16000
  }]

  return (
    <>
   <ShowSeat seat={seat}/>
   <OrderSummary />
   </>
  )
}

export default SeatBookingPage