import React from "react";
import { Container, Row } from "react-bootstrap";
import UserDetail from "../features/user/UserDetail";
import UserPaymentDetail from "../features/user/UserPaymentDetail";

const ProfilePage = () => {
  const DUMMY = {
    holderName: "Hnin Hayman",
    cardNumber: "1111-2222-3333-4444",
    expiryMonth: "03",
    expiryYear: "2026",
    cardType: "VISA",
    cvv: "338",
  };

  return (
    <Container>
      <Row>
        <UserDetail />
        <UserPaymentDetail data={DUMMY} />
      </Row>
    </Container>
  );
};

export default ProfilePage;
