import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from 'react-bootstrap'
import classes from './Cinema.module.css'
import { useDispatch } from 'react-redux'
import { createCinema, deleteCinema } from '../../../slice/CinemaSlice'
import { useNavigate } from 'react-router-dom'
import { FileEarmarkXFill, PencilSquare, Search } from 'react-bootstrap-icons'
import { IMAGE_URL } from '../../config/baseURL'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const NewCinemaForm = ({allCinema}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [canRequest, setCanRequest] = useState(true)

  const [ showModal, setShowModal ] = useState(false)

  const onNameInputChange = (e) => setName(e.target.value)
  const onLocationInputChange = (e) => setLocation(e.target.value)
  const onImageInputChange = (e) => setImage(e.target.files[0])

  const onDelete = () => {
    setShowModal(true)
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onConfirm = (cinemaId) => {
    dispatch(deleteCinema(cinemaId))
  }

  const navigateDetail = (cinemaId) => {
    navigate(`/admin/cinema-detail/${cinemaId}`)
  }



  const canCreate = [name,location,canRequest].every(Boolean)

  const onSubmit = (event) =>{
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)
      const formData = new FormData()
      formData.append('file',image)
      const data = {
        cinema : {
          name,
          location
        },
        formData
      }
      dispatch(createCinema(data))
      setName('')
      setLocation('')
      setCanRequest(true)
    }
  }

  return (

    <Container>
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.cinema_table}>
          <Row xs={2} className="d-flex justify-content-between">
            <Col xs="3">
            </Col>
            <Form as={Col} xs="6">
              <InputGroup size="sm">
                <Form.Control type="search" placeholder="Enter Name" />
                <Button variant="outline-secondary" id="button-addon">
                  <Search size={20} />
                </Button>
              </InputGroup>
            </Form>
          </Row>

          <Row xs={1}>
            <Table className={classes.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Loaction</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                { allCinema.map((cinema) => (
                  <tr key={cinema.id}>
                    <td className="ps-3">
                      <Image
                        src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`}
                        alt="cinema"
                        className={classes.cinema_image}
                      />
                    </td>
                    <td>{cinema.name}</td>
                    <td>{cinema.location}</td>
                    <td>
                      <div className="d-flex justify-content-evenly pt-2">
                        <PencilSquare color="#0079FF" onClick={() => {navigateDetail(cinema.id)}}/>
                        <FileEarmarkXFill color="red"  onClick={onDelete}/>
                      </div>
                    </td>{
                      showModal && <ConfirmModal
                        onClose={onCancel}
                        onAction={() => {onConfirm(cinema.id)}}
                        title='Delete Confirmation'
                        body={`Delete ${cinema.name} ??`}
                      />
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>NEW Cinema</h3>
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
              <Form.Label>Loaction *</Form.Label>
              <Form.Control
                type="text"
                onChange={onLocationInputChange}
                placeholder="Eg.Yangon"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image *</Form.Label>
              <Form.Control
                type="file"
                onChange={onImageInputChange}
                placeholder="Enter imageName..."
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

export default NewCinemaForm