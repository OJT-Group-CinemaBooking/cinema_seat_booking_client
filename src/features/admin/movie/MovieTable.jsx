import React, { useState } from 'react'
import classes from './MovieTable.module.css'
import { Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import SingleMovie from './SingleMovie'


const MovieTable = ({ movies }) => {

    const [ movielist, setMovieList ] = useState(movies)

    const handleSelect = (e) => {
        switch (e.target.value) {
        case 'all':
            setMovieList(movies)
            break;
        case 'now':
            setMovieList(movies.filter(movie => movie.nowShowing))
            break;
        case 'soon':
            setMovieList(movies.filter(movie => movie.comingSoon))
            break;
        case 'popular':
            setMovieList(movies.filter(movie => movie.popularNow))
            break;
        case 'off':
            setMovieList(movies.filter(movie => !movie.showing))
            break;
    
        default:
            setMovieList(movies)
            break;
        }
    }

    const handleChange = (event) => {
        const insertTitle = (event.target.value).toUpperCase()
        setMovieList(movies.filter(movie => (movie.title).toUpperCase().includes(insertTitle)))
    }
    
  return (
    <Container className={classes.table_container} fluid>
        <Row xs={1}>
            <Col xs='12' className={classes.header}>
                <Form.Select 
                className={classes.select_box} 
                size='sm' 
                data-bs-theme="dark"
                onChange={handleSelect}
                >
                    <option value="all">All</option>
                    <option value="now">Now Showing</option>
                    <option value="soon">Coming Soon</option>
                    <option value="popular">Popular</option>
                    <option value="off">Showing Off</option>
                </Form.Select>

                <InputGroup className={classes.search_box} size='sm'>
                    <Form.Control
                    type='search'
                    onChange={handleChange}
                    placeholder="Search with title"
                    />
                </InputGroup>
            </Col>
        </Row>
        <Row xs={1}>
            <Col xs='12' className={classes.table_col}>
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
                    {movielist.map( movie => 
                        <SingleMovie 
                            key={movie.id} 
                            movie={movie}
                        />
                    )}
                </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieTable