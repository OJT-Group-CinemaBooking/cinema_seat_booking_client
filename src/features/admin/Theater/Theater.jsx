import React, { useState } from 'react'
import classes from './Theater.module.css'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createTheater } from '../../../slice/TheaterSlice'
import SingleTheater from './SingleTheater'
import { ArrowLeft, ChevronRight } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { getCinemaById } from '../../../slice/CinemaSlice'

const Theater = ({ cinemaId, theaterList }) => {
  
  const cinema = useSelector(state => getCinemaById(state,cinemaId))

  const [name, setName] = useState('')
  const [screen, setScreen] = useState('')
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
          name,
          screen
        },
        cinemaId
      }
      dispatch(createTheater(data))
      setName('')
      setScreen('')
      setCanRequest(true)
    }
  }

  const onHandleBackArrow = () => {
    navigate(`/admin/dashboard/cinema`)
  }

  return (
    <Container className='min-vh-100'>
      <Row className={classes.back_arrow}>
        <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
      </Row>
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.theater_table}>
          <Row className='text-light'>
            <h3>{cinema?.name} Cinema <ChevronRight /> Theater</h3>
          </Row>
          <Row xs={1}>
            <Table className={classes.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Screen</th>
                  <th className='text-center'>Seat Type List</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                { theaterList.map((theater) => (
                  <SingleTheater 
                    key={theater.id}
                    theater={theater} 
                    cinemaId={cinemaId}
                  />
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>ADD THEATER</h3>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                onChange={onNameInputChange}
                placeholder="Eg.Mingalar"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Screen *</Form.Label>
              <Form.Control
                type="text"
                onChange={onScreenInputChange}
                placeholder="Eg.HD"
                required
              />
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type="submit" disabled={!canCreate}>
                ADD
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Theater