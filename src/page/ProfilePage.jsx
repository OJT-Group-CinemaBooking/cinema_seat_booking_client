import React from "react";
import { Container, Row } from "react-bootstrap";
import UserDetail from "../features/user/UserDetail";
import UserPaymentDetail from "../features/user/UserPaymentDetail";
import UserTicketList from "../features/user/UserTicketList";

const ProfilePage = () => {
  const DUMMY_PAYMENT = {
    holderName: "Hnin Hayman",
    cardNumber: "1111-2222-3333-4444",
    expiryMonth: "03",
    expiryYear: "2026",
    cardType: "VISA",
    cvv: "338",
  };

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

  return (
    <Container>
      <Row>
        <UserDetail />
        <UserPaymentDetail data={DUMMY_PAYMENT} />
      </Row>
      <UserTicketList tickets={DUMMY_TICKETS} />
    </Container>
  );
};

export default ProfilePage;
