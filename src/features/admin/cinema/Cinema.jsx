import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import classes from './Cinema.module.css'
import { useDispatch } from 'react-redux'
import { createCinema} from '../../../slice/CinemaSlice'
import SingleCinema from './SingleCinema'

const NewCinemaForm = ({allCinema}) => {

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [canRequest, setCanRequest] = useState(true)

  const onNameInputChange = (e) => setName(e.target.value)
  const onLocationInputChange = (e) => setLocation(e.target.value)
  const onImageInputChange = (e) => setImage(e.target.files[0])

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
                  { allCinema.map((cinema) => 
                    <SingleCinema 
                      key={cinema.id} 
                      cinema={cinema}
                    />
                  )}
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