import React, { useEffect, useRef, useState } from 'react'
import classes from './CinemaDetail.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCinemaStatus, updateCinema } from '../../../slice/CinemaSlice'
import { IMAGE_URL } from '../../config/baseURL'
import InfoAlert from '../../../components/ui/InfoAlert'
import { ArrowLeft } from 'react-bootstrap-icons'

const CinemaDetail = ({cinema}) => {
  const status = useSelector(getCinemaStatus)

  const [name, setName] = useState(cinema?.name)
  const [location, setLocation] = useState(cinema?.location)
  const [image, setImage] = useState(null)
  const [canRequest, setCanRequest] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onNameInputChange = (e) => setName(e.target.value)
  const onLocationInputChange = (e) => setLocation(e.target.value)
  const onImageInputChange = (e) => setImage(e.target.files[0])
    
  const fileInputRef = useRef()

  const imageInputHandler = () => {
    fileInputRef.current.click();
  }

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

  const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
      if(status === 'update_success' || status === 'update_failed') {
          setShowAlert(true)
      }
    },[status])
    
    const onHide = () => {
      setShowAlert(false)
    }

    const onHandleBackArrow = () => {
      navigate('/admin/dashboard/cinema')
    }

  return (
    <Container className='min-vh-100 px-5' fluid>
        {
          showAlert && <InfoAlert 
            onHide={onHide}
            variant={(status === 'update_success')? 'success' : 'danger'}
            information={(status === 'update_success')? 'Successifully updated!' : 'Update Failed!'}
          />
        }
        <Row className={classes.back_arrow}>
              <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
        </Row>
      <Row className='d-flex justify-content-evenly py-5'>
      <Form onSubmit={onSubmit} className={classes.form}>

        <Col sm='6' className={classes.cinema_info}>
          <div className={classes.cinema_file} onClick={imageInputHandler}>
            { image ? (
              <Image src={URL.createObjectURL(image)} alt="crew"  className={classes.file}/>
            ) : (
              <Image src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`} alt="cinema"  className={classes.file}/>
            )}
            <Form.Control 
              type="file" 
              ref={fileInputRef}
              onChange={onImageInputChange}
              style={{display : 'none'}}
            />
          </div>
        </Col>
        <Col sm='4' className={classes.cinema_update}>

            <h3>CINEMA EDIT</h3>
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
            <div className={classes.button_wapper}>
              <Button type="submit"  disabled={!canCreate} >
                Update
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </Container>
  )
}

export default CinemaDetail