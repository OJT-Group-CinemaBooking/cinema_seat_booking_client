import React, { useEffect, useState } from 'react'
import classes from './CinemaDetail.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateCinema } from '../../../slice/CinemaSlice'
import { IMAGE_URL } from '../../config/baseURL'
import { fetchTheaterByCinemaId } from '../../../slice/TheaterSlice'

const CinemaDetail = ({cinema}) => {
  const [name, setName] = useState(cinema?.name)
  const [location, setLocation] = useState(cinema?.location)
  const [image, setImage] = useState(null)
  const [canRequest, setCanRequest] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onNameInputChange = (e) => setName(e.target.value)
  const onLocationInputChange = (e) => setLocation(e.target.value)
  const onImageInputChange = (e) => setImage(e.target.files[0])

  const canCreate = [name,location,canRequest].every(Boolean)
  const onSubmit = (event) =>{
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)
      
        let formData = new FormData()
        if(image === null){
          formData = null
        }else{
          formData.append('file',image)
        }
        
      const data = {
        cinema : {
          id : cinema.id,
          name,
          location
        },
          formData
      }
      dispatch(updateCinema(data))
      setCanRequest(true)
    }
  }

  const navigateToTheater = () => {
    navigate(`/admin/theater/${cinema.id}`)
    dispatch(fetchTheaterByCinemaId(cinema.id))
  }

  return (
    <Container className='min-vh-100 px-5' fluid>
      <Row className='d-flex justify-content-evenly min-vh-100 py-5'>
        <Col sm='6' className={classes.cinema_info}>
          <Image src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} alt="cinema" fluid/>
        </Col>
        <Col sm='4' className={classes.cinema_update}>
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
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text" 
                value={location} 
                onChange={onLocationInputChange}
                placeholder="Eg.Yangon"
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Enter Image *</Form.Label>
              <Form.Control
                type="file" 
                onChange={onImageInputChange}
              />
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type="submit"  disabled={!canCreate} >
                Update
              </Button>
              <Button onClick={navigateToTheater}>
                Theater
              </Button>
            </div>
          </Form>
          
        </Col>
      </Row>
    </Container>
  )
}

export default CinemaDetail