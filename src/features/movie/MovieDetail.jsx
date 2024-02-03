import React, { useState } from "react";
import classes from "./MovieDetail.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import MovieInformation from "./MovieInformation";
import MovieShowTime from "./MovieShowTime";
import { IMAGE_URL } from "../config/baseURL";
import { ClockFill, GlobeCentralSouthAsia, StarFill } from "react-bootstrap-icons";

const MovieDetail = ({ movie, cinemas }) => {

  const [change, setChange] = useState("information");

  const onChangeInfo = (info) => setChange(info);

  return (
    <Container fluid>
      <Row xs={1} className="d-flex justify-content-end">
        <Col xs="12" 
        className={classes.background}
        style={{
          backgroundImage : `url(${IMAGE_URL}/movie/${movie.id}B.jpg)`,
          backgroundSize : 'cover',
          backgroundPosition : 'center',
          backgroundAttachment : 'fixed',
        }}
        >
        </Col>
      </Row>
      <Row xs={1} className={classes.movie_container}>
        <Col xs="2 offset-1" className={classes.movie_image_con}>
          <Image
            className={classes.movie_image}
            src={`${IMAGE_URL}/movie/${movie.id}.jpg`}
            alt="movie poster"
          />
        </Col>
        <Col xs="4 offset-1" className={classes.movie_info}>
          <h6 className={classes.movie_release_date}>{movie.releaseDate}</h6>
          <h3 className={classes.movie_title}>{movie.title}</h3>
          <p> <ClockFill/> {movie.duration} - min</p>
          <p> <GlobeCentralSouthAsia/> {movie.language}</p>
          <p> <StarFill/> {movie.rating}</p>
        </Col>
      </Row>
      <Row xs={2} className={classes.btn_group}>
        <Col
          xs="2 offset-1"
          onClick={() => onChangeInfo("information")}
          className={`${classes.btn} ${
            change === "information" && classes.active
          }`}
        >
          Movie information
        </Col>
        <Col
          xs="2"
          onClick={() => onChangeInfo("showtime")}
          className={`${classes.btn} ${
            change === "showtime" && classes.active
          }`}
        >
          Showtime
        </Col>
      </Row>
      <Row>
        {change === "information" && 
          <MovieInformation movieCrew={movie.movieCrew} synopsis={movie.synopsis} />
        }
        {change === "showtime" && 
          <MovieShowTime movieId={movie.id} cinemas={cinemas} />
        }
      </Row>
    </Container>
  );
};

export default MovieDetail;
