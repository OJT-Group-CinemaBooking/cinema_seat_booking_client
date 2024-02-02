import React, { useEffect } from 'react'
import Confirmation from '../features/confirmation/Confirmation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTickets, getTicketById, getTicketStatus, setTicketStatusToIdle } from '../slice/TicketSlice'
import { useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const ConfirmationPage = () => {

  const { ticketId } = useParams()

  const ticketStatus = useSelector(getTicketStatus)
  const ticket = useSelector(state => getTicketById(state,Number(ticketId)))

  const dispatch = useDispatch()

  useEffect(() => {
    if(ticketStatus === 'create_success') {
      dispatch(setTicketStatusToIdle())
    }
    if(ticketStatus === 'idle'){
      dispatch(fetchAllTickets())
    }
  },[ticketStatus,dispatch])

  let content = ''
  if(ticketStatus === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
      </div>
    )
  }
  if(ticketStatus.includes('_success')) {
    content = <Confirmation ticket={ticket} />
  }

  return (
    <>
      {content}
    </>
  )
}

export default ConfirmationPage