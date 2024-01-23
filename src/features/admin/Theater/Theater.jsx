import React, { useState } from 'react'
import classes from './Theater.module.css'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { FileEarmarkXFill, PencilSquare, Search } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTheater, deleteTheater } from '../../../slice/TheaterSlice'

const Theater = ({theater,cinemaId}) => {
    
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [screen, setScreen] = useState('')
  const [canRequest, setCanRequest] = useState(true)

  const [ showModal, setShowModal ] = useState(false)

  const onNameInputChange = (e) => setName(e.target.value)
  const onScreenInputChange = (e) => setScreen(e.target.value)

  const onDelete = () => {
    setShowModal(true)
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onConfirm = (theaterId) => {
    dispatch(deleteTheater(theaterId))
  }

  const navigateDetail = (theaterId) => {
    navigate(`/admin/theater-detail/${theaterId}/${cinemaId}`)
  }



  const canCreate = [name,screen,canRequest].every(Boolean)

  const onSubmit = (event) =>{
    event.preventDefault()
    if(canCreate) {
      setCanRequest(false)
      const data = {
        theater : {
          name,
          screen
        },cinemaId
      }
      dispatch(createTheater(data))
      setName('')
      setScreen('')
      setCanRequest(true)
    }
  }

  return (
    <Container>
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.theater_table}>
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
                  <th>Name</th>
                  <th>Screen</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                { theater.map((theater) => (
                  <tr key={theater.id}>
                    <td>{theater.name}</td>
                    <td>{theater.screen}</td>
                    <td>
                      <div className="d-flex justify-content-evenly pt-2">
                        <PencilSquare color="#0079FF" onClick={() => {navigateDetail(theater.id)}}/>
                        <FileEarmarkXFill color="red"  onClick={onDelete}/>
                      </div>
                    </td>{
                      showModal && <ConfirmModal
                        onClose={onCancel}
                        onAction={() => {onConfirm(theater.id)}}
                        title='Delete Confirmation'
                        body={`Delete ${theater.name} ??`}
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
            <h3>NEW Theater</h3>
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