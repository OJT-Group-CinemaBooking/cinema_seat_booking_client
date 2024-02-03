import React from "react";
import { Row } from "react-bootstrap";
import TicketDetail from "./TicketDetail";

const UserTicketList = ({ tickets }) => {
  return (
    <Row className="mt-5">
      <header style={{color: "white", fontSize: "2rem"}}>Ticket History</header><span style={{color: 'grey'}}>(Click to view details)</span>
      {tickets?.map((ticket) => (
        <TicketDetail
          key={ticket.id}
          ticketId={ticket.id}
          movieTitle={ticket.movieTitle}
          boughtSeats={ticket.boughtSeats}
          showTime={ticket.showTime}
        />
      ))}
    </Row>
  );
};

export default UserTicketList;
