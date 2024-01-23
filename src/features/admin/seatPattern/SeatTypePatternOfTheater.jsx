import React, { useEffect } from 'react'
import classes from './SeatTypePatternOfTheater.module.css'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import SeatPatternCard from './SeatPatternCard'
import { PlusSquareDotted } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAllSeatTypePatternByTheater, getAllSeatTypePatternByTheater, getSeatTypePatternError, getSeatTypePatternStatus } from '../../../slice/SeatSlice'
import { useDispatch, useSelector } from 'react-redux'

const SeatTypePatternOfTheater = () => {

    const { theaterId } = useParams()

    const seatTypePatterns = useSelector(getAllSeatTypePatternByTheater)
    const status = useSelector(getSeatTypePatternStatus)
    const error = useSelector(getSeatTypePatternError)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchAllSeatTypePatternByTheater(theaterId))
        }
    },[status,dispatch,theaterId])

  return (
    <Container className={classes.container}>
        {status === 'loading' && 
            <div className="w-100 mt-5 d-flex justify-content-center">
                <Spinner animation="border" variant="secondary" />
            </div>
        }
        {(status.includes('_success'))&&  
            <Row className='px-5 py-5 g-5'>
            {
                seatTypePatterns?.map( seatTypePattern => 
                    <SeatPatternCard 
                        key={seatTypePattern.id} 
                        theaterId={1}
                        seatTypePattern={seatTypePattern}
                    />
                )
            }
            <Col xs='4' className={classes.new}>
                <Card className={classes.card}>
                    <PlusSquareDotted 
                        className={classes.add}
                        onClick={() => navigate(`/admin/seatForm/${1}`)}
                        color='white' 
                        size={60}
                    />
                </Card>
            </Col>
        </Row>
        }
        {status === 'fetch_failed' && <p>{error}</p>}
    </Container>
  )
}

export default SeatTypePatternOfTheater