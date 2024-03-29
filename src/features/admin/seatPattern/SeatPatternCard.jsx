import React, { useState } from 'react'
import classes from './SeatPatternCard.module.css'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSeatTypePattern, getSeatTypePatternStatus, setSeatSliceStatusToIdle } from '../../../slice/SeatSlice'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const SeatPatternCard = ({ cinemaId, seatTypePattern, theaterId }) => {

  const status = useSelector(getSeatTypePatternStatus)

  const [ showModal, setShowModal ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onUpdate = () => {
    if(status === 'update_success') {
      dispatch(setSeatSliceStatusToIdle())
    }
    navigate(`/admin/dashboard/cinema/${cinemaId}/theater/${theaterId}/seat-pattern/${seatTypePattern.id}/update`)
  }

  const onDelete = () => {
    setShowModal(true)
  }
  const onCancel = () => {
    setShowModal(false)
  }
  const onConfirm = (id) => {
    dispatch(deleteSeatTypePattern(id))
  }
  return (
    <Col xs='4' className={classes.card_container}>
      <Card 
        border={
          (seatTypePattern.seatType === 'STANDARD')? 'danger' : 
          (seatTypePattern.seatType === 'PREMIUM')? 'warning' :
          (seatTypePattern.seatType === 'TWIN')? 'danger' : 
          (seatTypePattern.seatType === 'RECLINER')? 'primary' : 
          (seatTypePattern.seatType === 'VIP')? 'warning' : ''
        } 
        className={classes.card}>
        <Card.Img 
          className={classes.card_image} 
          src= {
            (seatTypePattern.seatType === 'STANDARD')? `${process.env.PUBLIC_URL}/images/standard-seat.png` : 
            (seatTypePattern.seatType === 'PREMIUM')? `${process.env.PUBLIC_URL}/images/premium-seat.png` :
            (seatTypePattern.seatType === 'TWIN')? `${process.env.PUBLIC_URL}/images/twin-seat.png` : 
            (seatTypePattern.seatType === 'RECLINER')? `${process.env.PUBLIC_URL}/images/recliner-seat.png` : 
            (seatTypePattern.seatType === 'VIP')? `${process.env.PUBLIC_URL}/images/vip-seat.png` : 
            `${process.env.PUBLIC_URL}/images/standard-seat.png`
          }
          alt='seat'/>
        <Card.Body className={classes.card_body}>
          <Card.Title className='text-center'>{seatTypePattern.seatType}</Card.Title>
          <Card.Subtitle className='py-2'>Price : {seatTypePattern.seatPrice} MMK</Card.Subtitle>
          <Card.Text>Row : {seatTypePattern.rowCount} Column : {seatTypePattern.columnCount}</Card.Text>
          <Card.Footer className='d-flex justify-content-evenly'>
            <Button 
              variant='secondary' 
              onClick={onUpdate}
            >
              Edit
            </Button>
            <Button variant='danger'
              onClick={onDelete}
            >
              Delete
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
      {showModal && 
        <ConfirmModal 
          onClose={onCancel}
          onAction={() => onConfirm(seatTypePattern.id)}
          title='Delete Confirmation Form' 
          body='Delete This SeatTypePattern'
        />
      }
    </Col>
  )
}

export default SeatPatternCard