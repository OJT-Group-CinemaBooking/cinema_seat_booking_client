import React, { useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import UserDetail from "../features/user/UserDetail";
import UserPaymentDetail from "../features/user/UserPaymentDetail";
import UserTicketList from "../features/user/UserTicketList";
import { useDispatch, useSelector } from "react-redux";
import {  getLoginStatus, getUser, getUserWithRoles } from "../features/auth/authSlice";
import { getPaymentStatus, setPaymentStatusToIdle } from "../slice/PaymentSlice";
import { getTicketStatus, setTicketStatusToIdle } from "../slice/TicketSlice";

const ProfilePage = () => {
  const status = useSelector(getLoginStatus)
  const paymentStatus = useSelector(getPaymentStatus)
  const ticketStatus = useSelector(getTicketStatus)
  const user = useSelector(getUser)

  const dispatch = useDispatch()

  useEffect(() => {
    if(paymentStatus === 'create_success') {
      dispatch(getUserWithRoles(localStorage.getItem('userId')))
      dispatch(setPaymentStatusToIdle())
    }
    if(ticketStatus === 'fetch_success') {
      dispatch(getUserWithRoles(localStorage.getItem('userId')))
      dispatch(setTicketStatusToIdle())
    }
  },[dispatch,paymentStatus,ticketStatus])

  let contant = ''

  if(status === 'success'){
    contant = (
      <Container>
        <Row>
          <UserDetail />
          <UserPaymentDetail userPayment={user.userPayment} />
        </Row>
        <UserTicketList tickets={user.tickets} />
      </Container>
    )
  }

  if(status === 'loading'){
    contant = (
      <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  return (
    <section>
      {contant}
    </section>
  );
};

export default ProfilePage;
