import React, { useState } from 'react'
import classes from './MovieCrewDetail.module.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updateCrew } from '../../../slice/CrewSlice';

const MovieCrewDetail = ({ crew }) => {

  const [name, setName] = useState(crew?.name);
  const [role, setRole] = useState(crew?.role);
  const [file, setFile] = useState('');
  const [canRequest, setCanRequest] = useState(true);
  const dispatch = useDispatch();

  const onNameChange = (e) => setName(e.target.value.toUpperCase())
  const onRoleChange = (e) => setRole(e.target.value)
  const onFileInputChange = (e) => setFile(e.target.files[0])

  const canCreate = [name,  canRequest].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()

    formData.append('file', file)
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

  return (
    <Container className='min-vh-100 px-5' fluid>
      <Row className='d-flex justify-content-evenly min-vh-100 py-5'>
        <Col sm='6' className={classes.crew_info}>

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