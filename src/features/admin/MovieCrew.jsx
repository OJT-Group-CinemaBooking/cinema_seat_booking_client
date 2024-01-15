import React from 'react'
import classes from './MovieCrew.module.css'
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from 'react-bootstrap'
import { FileEarmarkXFill, PencilSquare, Search } from 'react-bootstrap-icons'

const MovieCrew = () => {
  return (
    <Container>
      <Row xs={1} md={2} className='d-flex justify-content-evenly'>
        <Col xs='7' className={classes.crew_table}>
          <Row xs={2} className='d-flex justify-content-between'>
            <Col xs='3'>
              <Form.Select size='sm'>
                <option value="All">All Crew</option>
                <option value="Strraing">Strraing</option>
                <option value="Director">Director</option>
              </Form.Select>
            </Col>
            <Form as={Col} xs='6'>
              <InputGroup size='sm'>
                  <Form.Control
                  type='search'
                  placeholder="Enter Name"
                  />
                  <Button variant="outline-secondary" id="button-addon">
                      <Search size={20}/>
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
                <th>Role</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Image src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                  alt='movie_crew' 
                  className={classes.crew_image}/>
                </td>
                <td>KO SHIBASAKI</td>
                <td>staring</td>
                <td>
                  <div className='d-flex justify-content-evenly pt-2'>
                    <PencilSquare color='#0079FF'/>
                    <FileEarmarkXFill color='red'/>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          </Row>
        </Col>

        <Col xs='4' className={classes.form_col}>
          <Form className={classes.form}>
            <h3>NEW CREW</h3>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control type='text' required placeholder='Enter Name...'/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose Role *</Form.Label>
              <Form.Select aria-label="Role">
                <option value="Strraing">Strraing</option>
                <option value="Director">Director</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Image *</Form.Label>
              <Form.Control type='file' required/>
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type='submit'>ADD</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieCrew