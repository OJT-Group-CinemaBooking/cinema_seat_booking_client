import React, { useState } from 'react'
import classes from './MovieTable.module.css'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { CalendarPlusFill, FileEarmarkXFill, PencilSquare, Search } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { deleteMovie } from '../../../slice/MovieSlice'

const MovieTable = ({ movies }) => {
    const [ showModal, setShowModal ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onUpdate = (movieId) => {
        navigate(`/admin/update-movie/${movieId}`)
    }

    const onDelete = () => {
        setShowModal(true)
    }

    const onModalClose = () => {
        setShowModal(false)
    }

    const onConfirm = (id) => {
        dispatch(deleteMovie(id))
    }
  return (
    <Container className={classes.table_container} fluid>
        <Row xs={1}>
            <Col xs='12' className={classes.header}>
                <Form.Select className={classes.select_box} size='sm' data-bs-theme="dark">
                    <option value="1">All</option>
                    <option value="2">Now Showing</option>
                    <option value="3">Coming Soon</option>
                </Form.Select>

                <InputGroup className={classes.search_box} size='sm'>
                    <Form.Control
                    type='search'
                    placeholder="Search with title"
                    />
                    <Button variant="outline-secondary" id="button-addon">
                        <Search/>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
        <Row xs={1}>
            <Col xs='12'>
                <Table striped bordered hover className='text-white'>
                <thead className={classes.table_header}>
                    <tr>
                        <th>Title</th>
                        <th>ReleaseDate</th>
                        <th>CreatedAt</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className={classes.table_body}>
                    {movies.map( movie => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.releaseDate}</td>
                            <td>{(new Date(movie.createdAt)).toLocaleString()}</td>
                            <td className={`text-${movie.showing? 'success' : 'secondary'}`}>{movie.showing ? 'SHOWING' : 'SHOW OFF'}</td>
                            <td>
                                <div className={classes.action}>
                                    <CalendarPlusFill 
                                        color='gold' 
                                        size={20} 
                                    />
                                    <PencilSquare 
                                        color='blue' 
                                        size={20} 
                                        onClick={() => {onUpdate(movie.id)}}
                                    />
                                    <FileEarmarkXFill 
                                        color='red' 
                                        size={20} 
                                        onClick={onDelete}
                                    />
                                </div>{
                                        showModal && <ConfirmModal
                                            onClose={onModalClose} 
                                            onAction={() => {onConfirm(movie.id)}} 
                                            title='Delete Confirmation' 
                                            body={`Delete ${movie.title} ??`}
                                        />
                                    }
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieTable