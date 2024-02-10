import React, { useEffect } from 'react'
import classes from './SeatTypePatternOfTheater.module.css'
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import SeatPatternCard from './SeatPatternCard'
import { ArrowLeft, ChevronRight, PlusSquareDotted } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { 
    fetchAllSeatPattern, 
    getAllSeatTypePattern, 
    getSeatTypePatternError, 
    getSeatTypePatternStatus, 
    setSeatSliceStatusToIdle
} from '../../../slice/SeatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCinema, getCinemaById, getCinemaStatus } from '../../../slice/CinemaSlice'
import { fetchAllTheater, getTheaterById, getTheaterStatus } from '../../../slice/TheaterSlice'

const SeatTypePatternOfTheater = () => {

    const { cinemaId, theaterId } = useParams()

    const seatPatternStatus = useSelector(getSeatTypePatternStatus)
    const cinemaStatus = useSelector(getCinemaStatus)
    const theaterStatus = useSelector(getTheaterStatus)
    const error = useSelector(getSeatTypePatternError)
    const allSeatTypePattern = useSelector(getAllSeatTypePattern)
    const seatTypePatternList = allSeatTypePattern.filter(sp => 
        sp.theater.id === Number(theaterId)
    )

    const cinema = useSelector(state => getCinemaById(state,cinemaId))
    const theater = useSelector(state => getTheaterById(state,theaterId))

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(seatPatternStatus === 'idle') {
            dispatch(fetchAllSeatPattern())
        }
        if(cinemaStatus === 'idle') {
            dispatch(fetchAllCinema())
        }
        if(theaterStatus === 'idle') {
            dispatch(fetchAllTheater())
        }
    },[seatPatternStatus,cinemaStatus,theaterStatus,dispatch])

    const onHandleBackArrow = () => {
        navigate(`/admin/dashboard/cinema/${cinemaId}/theater`)
    }

    const onAddNew = () => {
        if(seatPatternStatus === 'create_success') {
            dispatch(setSeatSliceStatusToIdle())
        }
        navigate(`/admin/dashboard/cinema/${cinemaId}/theater/${theaterId}/seat-form`)
    }

  return (
    <Container className={classes.container}>

        {seatPatternStatus === 'loading' && 
            <div className="w-100 mt-5 d-flex justify-content-center">
                <Spinner animation="border" variant="secondary" />
            </div>
        }

        {(seatPatternStatus.includes('_success'))&& 
        <>
        <Row className={classes.back_arrow}>
            <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
        </Row> 
        <Row className={classes.header}>
            <h3>
                {cinema?.name} Cinema <ChevronRight /> 
                {theater?.name} Theater <ChevronRight /> 
                SeatPattern
            </h3>
        </Row>
        <Row className='px-5 py-5 g-5'>
            {
                seatTypePatternList.map( seatTypePattern => 
                    <SeatPatternCard 
                        key={seatTypePattern.id} 
                        cinemaId={cinemaId} 
                        theaterId={theaterId}
                        seatTypePattern={seatTypePattern}
                    />
                )
            }
            <Col xs='4' className={classes.new}>
                <Card className={classes.card} 
                onClick={onAddNew}
                >
                    <PlusSquareDotted 
                        color='white' 
                        size={60}
                    />
                </Card>
            </Col>
        </Row>
        </>
        }

        {seatPatternStatus === 'fetch_failed' && <p>{error}</p>}
    </Container>
  )
}

export default SeatTypePatternOfTheater