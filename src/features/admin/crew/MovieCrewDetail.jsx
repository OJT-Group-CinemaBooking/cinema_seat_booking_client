import React, { useEffect, useRef, useState } from 'react'
import classes from './MovieCrewDetail.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getCrewUpdateStatus, setCrewUpdateStatusToIdle, updateCrew } from '../../../slice/CrewSlice';
import InfoAlert from '../../../components/ui/InfoAlert';
import { IMAGE_URL } from '../../config/baseURL';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const MovieCrewDetail = ({ crew }) => {

  const status = useSelector(getCrewUpdateStatus)

  const [name, setName] = useState(crew?.name);
  const [role, setRole] = useState(crew?.role);
  const [file, setFile] = useState(null);
  const [canRequest, setCanRequest] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onNameChange = (e) => setName(e.target.value.toUpperCase())
  const onRoleChange = (e) => setRole(e.target.value)
  const onFileInputChange = (e) => setFile(e.target.files[0])
 
  const fileInputRef = useRef()

  const imageInputHandler = () => {
    fileInputRef.current.click();
  }

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
      dispatch(setCrewUpdateStatusToIdle())
    }
  };

  const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
      if(status === 'success' || status === 'failed') {
          setShowAlert(true)
      }
    },[status])
    
    const onHide = () => {
      setShowAlert(false)
    }

    const onHandleBackArrow = () => {
      navigate('/admin/crew')
    }

  return (
    <Container className='min-vh-100 px-5' fluid>
      {
        showAlert && <InfoAlert 
          onHide={onHide}
          variant={(status === 'success')? 'success' : 'danger'}
          information={(status === 'success')? 'Successifully updated!' : 'Update Failed!'}
        />
      }
      <Row className={classes.back_arrow}>
            <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
      </Row>
      <Row className='d-flex justify-content-evenly py-5'>
      <Form onSubmit={onSubmit} className={classes.form}>

        <Col sm='6' className={classes.crew_info}>
          
          <div className={classes.movie_file} onClick={imageInputHandler}>
            { file ? (
              <Image src={URL.createObjectURL(file)} alt="crew"  className={classes.file}/>
            ) : (
              <Image src={`${IMAGE_URL}/crew/${crew.id}.jpg`} alt="crew"  className={classes.file} />
            )}
            <Form.Control 
              type="file" 
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{display : 'none'}}
            />
          </div>

        </Col>

        <Col sm='4' className={classes.crew_update}>
            <h3>CREW EDIT</h3>
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
            <div className={classes.button_wapper}>
              <Button type="submit"  disabled={!canCreate} >
                SAVE
              </Button>
            </div>
        </Col>
        </Form>
      </Row>
    </Container>
  )
}

export default MovieCrewDetail