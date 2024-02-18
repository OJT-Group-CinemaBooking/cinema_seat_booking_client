import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import UserDetail from "../features/user/UserDetail";
import UserPaymentDetail from "../features/user/UserPaymentDetail";
import UserTicketList from "../features/user/UserTicketList";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserWithRoles } from "../features/auth/authSlice";
import { getPaymentStatus, setPaymentStatusToIdle } from "../slice/PaymentSlice";

const ProfilePage = () => {
  const paymentStatus = useSelector(getPaymentStatus)
  const user = useSelector(getUser)

  const dispatch = useDispatch()

  useEffect(() => {
    if(paymentStatus === 'create_success') {
      dispatch(getUserWithRoles(localStorage.getItem('userId')))
      dispatch(setPaymentStatusToIdle())
    }
  },[dispatch,paymentStatus])

  const DUMMY_TICKETS = [
    {
      id: 1,
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
      ],
    },
    {
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
      ],
    },
    {
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
      ],
    },
    {
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
      ],
    },
    {
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
      ],
    },
    {
      movieTitle: "The Life of Pi",
      showTime: {
        showDate: "14-2-2024",
        showTime: "9:30",
      },
      boughtSeats: [
        {
          name: "E11",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
        {
          name: "E12",
        },
      ],
    },
  ];

  let contant = ''

  if(status === 'success'){
    contant = <Container>
                <Row>
                  <UserDetail />
                  <UserPaymentDetail userPayment={user.userPayment} />
                </Row>
                <UserTicketList tickets={DUMMY_TICKETS} />
              </Container>
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
