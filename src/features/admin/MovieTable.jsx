import React from 'react'
import classes from './MovieTable.module.css'
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { CalendarPlusFill, FileEarmarkXFill, PencilSquare, Search } from 'react-bootstrap-icons'

const MovieTable = () => {
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
                        <th>Code</th>
                        <th>Title</th>
                        <th>ReleaseDate</th>
                        <th>CreatedAt</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>The Boy and the Heron</td>
                        <td>July 14 2023</td>
                        <td>Jun 1 2023</td>
                        <td>Now Showing</td>
                        <td>
                            <div className={classes.action}>
                                <CalendarPlusFill color='gold' size={20}/>
                                <PencilSquare color='blue' size={20}/>
                                <FileEarmarkXFill color='red' size={20} />
                            </div>
                        </td>
                    </tr>
                </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieTable