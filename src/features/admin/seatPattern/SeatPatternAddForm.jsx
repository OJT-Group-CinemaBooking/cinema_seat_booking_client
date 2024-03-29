import React, { useEffect, useState } from 'react'
import classes from './SeatPatternAddForm.module.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSeatTypePattern, getSeatTypePatternStatus } from '../../../slice/SeatSlice'
import InfoAlert from '../../../components/ui/InfoAlert'

const SeatPatternAddForm = () => {

    const { cinemaId, theaterId } = useParams()

    const status = useSelector(getSeatTypePatternStatus)

    const [ seatType, setSeatType ] = useState('STANDARD')
    const [ seatPrice, setSeatPrice ] = useState('')
    const [ rowCount, setRowCount ] = useState('')
    const [ columnCount, setColumnCount ] = useState('')
    const [ rowsOrder, setRowsOrder ] = useState(0)
    const [ canRequest, setCanRequest ] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSelectSeatType = (e) => {setSeatType(e.target.value)}
    const onPriceInputChange = (e) => {setSeatPrice(e.target.value)}
    const onRowInputChange = (e) => {setRowCount(e.target.value)}
    const onColumnInputChange = (e) => {setColumnCount(e.target.value)}
    const onRowsOrderInputChange = (e) => {setRowsOrder(e.target.value)}

    const canCreate = [ seatType, seatPrice, rowCount, columnCount, canRequest ].every(Boolean)

    const onSubmit = (event) => {
        event.preventDefault()

        setCanRequest(false)
        if(canCreate) {
            const data = {
                seatTypePattern : {
                    seatType,
                    seatPrice,
                    rowCount,
                    columnCount,
                    rowsOrder
                },
                theaterId 
            }

            dispatch(createSeatTypePattern(data))
            setSeatType('')
            setSeatPrice('')
            setRowCount('')
            setColumnCount('')
            setRowsOrder(0)
            setCanRequest(true)
        }
    }

    const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
        if(status === 'create_success' || status === 'create_failed') {
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
            showAlert && <InfoAlert 
                onHide={onHide}
                variant={(status === 'create_success')? 'success' : 'danger'}
                information={(status === 'create_success')? 'Successifully created!' : 'Create Failed!'}
            />
        }
        <Row className={classes.back_arrow}>
            <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
        </Row>
        <Row xs={1} className={classes.form_container}>
            <Form className={classes.form} onSubmit={onSubmit}>
                <h3>Add SeatTypes Group</h3>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Choose Type *</Form.Label>
                    <Form.Select 
                        onChange={onSelectSeatType}
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
                    min={1} 
                    max={10}
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
                    min={1}
                    max={(seatType !== 'TWIN')? 8 : 24}
                    onChange={onColumnInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} xs='12' className='mb-2'>
                    <Form.Label>Rows Order *</Form.Label>
                    <Form.Control
                    required
                    type="number" 
                    value={rowsOrder}
                    placeholder="Enter Order Of This Pattern -" 
                    min={0}
                    onChange={onRowsOrderInputChange}
                    />
                </Form.Group>
                <div className='w-100 d-flex justify-content-center mt-3'>
                    <Button type="submit" 
                        disabled={!canCreate}
                    >
                        ADD
                    </Button>
                </div>
            </Form>
        </Row>
    </Container>
  )
}

export default SeatPatternAddForm