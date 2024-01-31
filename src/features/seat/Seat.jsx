import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { addSelectedSeat, getAllBookSeatList, removeSelectedSeat } from '../../slice/BookSeatSlice'
import { useDispatch, useSelector } from 'react-redux'

const Seat = ({ seat, seatName }) => {
  
  const bookSeatList = useSelector(getAllBookSeatList)

  const bookSeat = bookSeatList.find(bs => bs.seat.id === seat.id)

  const [ select, setSelect ] = useState(false)

  const dispatch = useDispatch()

  let seatimage = ''
  const selectedSeat = `${process.env.PUBLIC_URL}/images/selected-seat.png`
  const bookedSeatImage = `${process.env.PUBLIC_URL}/images/booked-seat.png`

  switch (seat.type) {
    case 'STANDARD':
      seatimage = `${process.env.PUBLIC_URL}/images/standard-seat.png`
      break;
    case 'PREMIUM':
      seatimage = `${process.env.PUBLIC_URL}/images/premium-seat.png`
      break;
    case 'RECLINER':
      seatimage = `${process.env.PUBLIC_URL}/images/recliner-seat.png`
      break;
    case 'VIP':
      seatimage = `${process.env.PUBLIC_URL}/images/vip-seat.png`
      break;
  
    default:
      seatimage = `${process.env.PUBLIC_URL}/images/standard-seat.png`
      break;
  }

  const onSelect = () => {
    if(select) {
      setSelect(false)
      dispatch(removeSelectedSeat(bookSeat.id))

    }else{
      setSelect(true)
      dispatch(addSelectedSeat({
      id : bookSeat.id,
      name : seatName,
      type : seat.type,
      price : seat.price,
      }))
    }
  }

  return (
    <>
       <Image src={bookSeat.taken? bookedSeatImage : (!select? seatimage : selectedSeat)} onClick={onSelect} alt='seat' />
    </>
  )
}

export default Seat