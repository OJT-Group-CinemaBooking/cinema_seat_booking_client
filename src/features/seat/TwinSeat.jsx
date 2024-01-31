import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import classes from './TwinSeat.module.css'
import { addSelectedSeat, getAllBookSeatList, removeSelectedSeat } from '../../slice/BookSeatSlice'
import { useDispatch, useSelector } from 'react-redux'

const TwinSeat = ({ seat, seatName }) => {
  
  const bookSeatList = useSelector(getAllBookSeatList)

  const bookSeat = bookSeatList.find(bs => bs.seat.id === seat.id)

    const [ select, setSelect ] = useState(false)
    
    const dispatch = useDispatch()
    
    const twinSeat = `${process.env.PUBLIC_URL}/images/twin-seat.png`
    const selectedSeat = `${process.env.PUBLIC_URL}/images/selected-seat.png`
    const bookedSeatImage = `${process.env.PUBLIC_URL}/images/booked-seat.png`

    const onSelect = () => {
      if(select) {
        setSelect(false)
        dispatch(removeSelectedSeat(bookSeat.id))
  
      }else{
        setSelect(true)
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
      <div onClick={onSelect} className={classes.seat}>
        <Image src={bookSeat.taken? bookedSeatImage : (!select? twinSeat : selectedSeat)} alt='seat' />
        <Image src={bookSeat.taken? bookedSeatImage : (!select? twinSeat : selectedSeat)} alt='seat' />
      </div>
    )
}

export default TwinSeat