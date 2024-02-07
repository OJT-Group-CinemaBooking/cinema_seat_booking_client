import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TicketDetail = ({ ticketId, movieTitle, showTime, boughtSeats }) => {

    const navigate = useNavigate()
    const onCardClick = () => {
        navigate(`/ticket/${ticketId}`)
    }

  return (
      <Card
       onClick={onCardClick}
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
        <Card.Body className="d-inline-block">
          {" "}
          <b> Date: </b> {showTime.showDate}
        </Card.Body>
        <Card.Body className="d-inline-block">
          {" "}
          <b> ShowTime: </b> {showTime.showTime}
        </Card.Body>
        <Card.Body>
          {" "}
          <b> SeatNumbers: </b>
          {boughtSeats.map((seat) => (
            <b>{seat.name}, </b>
          ))}
        </Card.Body>
      </Card>
  );
};

export default TicketDetail;
