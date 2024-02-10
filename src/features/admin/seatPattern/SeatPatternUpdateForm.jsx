import React, { useEffect, useState } from 'react'
import classes from './SeatPatternAddForm.module.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSeatTypePatternById, getSeatTypePatternStatus, updateSeatTypePattern } from '../../../slice/SeatSlice'
import InfoAlert from '../../../components/ui/InfoAlert'

const SeatPatternUpdateForm = () => {

    const { cinemaId, theaterId, seatTypePatternId } = useParams()
    const [ showAlert, setShowAlert ] = useState(false)
    const status = useSelector(getSeatTypePatternStatus)
    const seatTypePattern = useSelector( state => getSeatTypePatternById(state,seatTypePatternId) )

    const [ seatType, setSeatType ] = useState(seatTypePattern?.seatType)
    const [ seatPrice, setSeatPrice ] = useState(seatTypePattern?.seatPrice)
    const [ rowCount, setRowCount ] = useState(seatTypePattern?.rowCount)
    const [ columnCount, setColumnCount ] = useState(seatTypePattern?.columnCount)
    const [ canRequest, setCanRequest ] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSelectSeatType = (e) => {setSeatType(e.target.value)}
    const onPriceInputChange = (e) => {setSeatPrice(e.target.value)}
    const onRowInputChange = (e) => {setRowCount(e.target.value)}
    const onColumnInputChange = (e) => {setColumnCount(e.target.value)}

    const canCreate = [ seatType, seatPrice, rowCount, columnCount, canRequest ].every(Boolean)

    const onSubmit = (event) => {
        event.preventDefault()

        setCanRequest(false)
        if(canCreate) {
            const data = {
                seatTypePattern : {
                  id : seatTypePattern.id,
                  seatType,
                  seatPrice,
                  rowCount,
                  columnCount
                },
                theaterId 
            }

            dispatch(updateSeatTypePattern(data))
            setCanRequest(true)
        }
    }

    useEffect(() => {
        if(status === 'update_success' || status === 'update_failed') {
            setShowAlert(true)
        }
    },[status])

    const onHide = () => {
        setShowAlert(false)
    }

    const onHandleBackArrow = () => {
        navigate(`/admin/dashboard/cinema/${cinemaId}/theater/${theaterId}/seat-pattern`)
    }
  return (
    <Container className={classes.container}>
        {
            showAlert && <Row className='w-100'>
            <InfoAlert 
                onHide={onHide}
                variant={(status === 'update_success')? 'success' : 'danger'}
                information={(status === 'update_success')? 'Successifully updated!' : 'Update Failed!'}
            />
            </Row>
        }
        <Row className={classes.back_arrow}>
            <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
        </Row>
        <Row xs={1} className={classes.form_container}>
            <Form className={classes.form} onSubmit={onSubmit}>
                <h3>Update SeatTypes Group</h3>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Choose Type *</Form.Label>
                    <Form.Select 
                        onChange={onSelectSeatType}
                        value={seatType}
                    >
                        <option value='STANDARD'>STANDARD</option>၂
                        <option value='PREMIUM'>PREMIUM</option>
                        <option value='TWIN'>TWIN</option>
                        <option value='RECLINER'>RECLINER</option>
                        <option value='VIP'>VIP</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Price *</Form.Label>
                    <Form.Control
                    required
                    type="number" 
                    value={seatPrice}
                    placeholder="Enter Price -"
                    onChange={onPriceInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Total Row *</Form.Label>
                    <Form.Control
                    required
                    type="number" 
                    value={rowCount}
                    placeholder="Enter Row Count -"
                    onChange={onRowInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Total Column *</Form.Label>
                    <Form.Control
                    required
                    type="number" 
                    value={columnCount}
                    placeholder="Enter Column Count -"
                    onChange={onColumnInputChange}
                    />
                </Form.Group>
                <div className='w-100 d-flex justify-content-center mt-3'>
                    <Button type="submit" 
                      disabled={!canCreate} 
                    >
                      SAVE
                    </Button>
                </div>
            </Form>
        </Row>
    </Container>
  )
}

export default SeatPatternUpdateForm