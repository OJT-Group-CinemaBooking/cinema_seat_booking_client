import React from "react";
import { Card } from "react-bootstrap";

const TicketDetail = ({ movieTitle, showTime, boughtSeats,cinema,actualPrice,totalPrice }) => {

    const dateTime = new Date(showTime)

  return (
      <Card
        bg="dark"
        text="light"
        border="info"
        className="m-3 g-3"
        style={{ width: "15rem" }}
      >
        <Card.Header>
          {" "}
          <b> {movieTitle} </b>{" "}
        </Card.Header>
        <Card.Header>
          {" "}
          <b> Cinema: </b> {cinema}
        </Card.Header>
        <Card.Body className="d-inline-block">
          {" "}
          <b> Date: </b> {dateTime.toLocaleDateString()}
        </Card.Body>
        <Card.Body className="d-inline-block">
          {" "}
          <b> ShowTime: </b> {dateTime.toLocaleTimeString()}
        </Card.Body>
        <Card.Body>
          {" "}
          <b> SeatNumbers: </b>
          {boughtSeats.map((seat) => (
            <b>{seat.name}, </b>
          ))}
        </Card.Body>
        <Card.Header>
          {" "}
          <b> Discount: </b> {totalPrice-actualPrice} MMK
        </Card.Header>
        <Card.Header>
          {" "}
          <b> TotalPrcie: </b> {totalPrice} MMK
        </Card.Header>
      </Card>
  );
};

export default TicketDetail;
