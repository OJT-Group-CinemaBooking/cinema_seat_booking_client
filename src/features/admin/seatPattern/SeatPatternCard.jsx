import React, { useState } from 'react'
import classes from './SeatPatternCard.module.css'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteSeatTypePattern } from '../../../slice/SeatSlice'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const SeatPatternCard = ({ seatTypePattern, theaterId }) => {

  const [ showModal, setShowModal ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          (seatTypePattern.seatType === 'TWIN')? 'primary' : 
          (seatTypePattern.seatType === 'RECLINER')? 'secondary' : 
          (seatTypePattern.seatType === 'VIP')? 'light' : ''
        } 
        className={classes.card}>
        <Card.Img 
          className={classes.card_image} 
          src= {
            (seatTypePattern.seatType === 'STANDARD')? '../images/red-seat.png' : 
            (seatTypePattern.seatType === 'PREMIUM')? '../images/yellow-seat.png' :
            (seatTypePattern.seatType === 'TWIN')? '../images/twin-seat.png' : 
            (seatTypePattern.seatType === 'RECLINER')? '../images/gray-seat.png' : 
            (seatTypePattern.seatType === 'VIP')? '../images/white-seat.png' : '../images/red-seat.png'
          }
          alt='seat'/>
        <Card.Body className={classes.card_body}>
          <Card.Title className='text-center'>{seatTypePattern.seatType}</Card.Title>
          <Card.Subtitle className='py-2'>Price : {seatTypePattern.seatPrice} MMK</Card.Subtitle>
          <Card.Text>Row : {seatTypePattern.rowCount} Column : {seatTypePattern.columnCount}</Card.Text>
          <Card.Footer className='d-flex justify-content-evenly'>
            <Button variant='secondary'onClick={() => navigate(`/admin/seatupdate/${theaterId}/${seatTypePattern.id}`)}>Edit</Button>
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