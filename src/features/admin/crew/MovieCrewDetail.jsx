import React, { useEffect, useState } from 'react'
import classes from './MovieCrewDetail.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getCrewStatus, updateCrew } from '../../../slice/CrewSlice';
import InfoAlert from '../../../components/ui/InfoAlert';
import { IMAGE_URL } from '../../config/baseURL';

const MovieCrewDetail = ({ crew }) => {

  const status = useSelector(getCrewStatus)

  const [name, setName] = useState(crew?.name);
  const [role, setRole] = useState(crew?.role);
  const [file, setFile] = useState(null);
  const [canRequest, setCanRequest] = useState(true);
  const dispatch = useDispatch();

  const onNameChange = (e) => setName(e.target.value.toUpperCase())
  const onRoleChange = (e) => setRole(e.target.value)
  const onFileInputChange = (e) => setFile(e.target.files[0])

  const canCreate = [name,  canRequest].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()

    if(file !== null) {
      formData.append('file', file)
    }
    if (canCreate) {
      setCanRequest(false);
      const data = {
        crew : {
          id : crew.id,
          name,
          role,
        },
        formData
      }
      dispatch(updateCrew(data))
      setCanRequest(true);
    }
  };

  const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
      if(status === 'update_success' || status === 'update_failed') {
          setShowAlert(true)
      }
    },[status])
    
    const onHide = () => {
      setShowAlert(false)
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
      <Row className='d-flex justify-content-evenly min-vh-100 py-5'>
        <Col sm='6' className={classes.crew_info}>
          <Image src={`${IMAGE_URL}/crew/${crew.id}.jpg`} alt="cinema"  />
        </Col>
        <Col sm='4' className={classes.crew_update}>
        <Form onSubmit={onSubmit} className={classes.form}>
            <h3>EDIT FORM</h3>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text" 
                value={name} 
                onChange={onNameChange}
                placeholder="Enter Name..."
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose Role *</Form.Label>
              <Form.Select 
                aria-label="Role" 
                value={role}
                onChange={onRoleChange} >
                <option value="Starring">Starring</option>
                <option value="Director">Director</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Image *</Form.Label>
              <Form.Control
                type="file" 
                onChange={onFileInputChange}
                placeholder="Enter imageName..."
              />
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type="submit"  disabled={!canCreate} >
                SAVE
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieCrewDetail