import React, { useState } from 'react'
import classes from './TheaterDetail.module.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateTheater } from '../../../slice/TheaterSlice'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'

const TheaterDetail = ({theater,cinemaId}) => {

  const [name, setName] = useState(theater?.name)
  const [screen, setScreen] = useState(theater?.screen)
  const [canRequest, setCanRequest] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onNameInputChange = (e) => setName(e.target.value)
  const onScreenInputChange = (e) => setScreen(e.target.value)

  const canCreate = [name,screen,canRequest].every(Boolean)
  const onSubmit = (event) =>{
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)    
      const data = {
        theater : {
          id : theater.id,
          name,
          screen
        },cinemaId
      }
      dispatch(updateTheater(data))
      setCanRequest(true)
      navigate(`/admin/theater/${cinemaId}`)
    }
  }

  const onHandleBackArrow = () => {
    navigate(`/admin/theater/${cinemaId}`)
  }

  return (
    <Container className='min-vh-100 px-5' fluid>
      <Row className={classes.back_arrow}>
              <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
      </Row>
      <Row className='d-flex justify-content-evenly min-vh-100 py-5'>
        
        <Col sm='4' className={classes.theater_update}>
        <Form onSubmit={onSubmit} className={classes.form}>
            <h3>EDIT FORM</h3>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text" 
                value={name} 
                onChange={onNameInputChange}
                placeholder="Eg.Mingalar"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Screen *</Form.Label>
              <Form.Control
                type="text" 
                value={screen} 
                onChange={onScreenInputChange}
                placeholder="Eg.HD"
                required
              />
            </Form.Group>

            <div className={classes.button_wapper}>
              <Button type="submit"  disabled={!canCreate} >
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default TheaterDetail