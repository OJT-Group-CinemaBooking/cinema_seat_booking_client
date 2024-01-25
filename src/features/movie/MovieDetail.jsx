import React, { useState } from "react";
import classes from "./MovieDetail.module.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import MovieInformation from "./MovieInformation";
import MovieShowTime from "./MovieShowTime";
import { useSelector } from "react-redux";
import { fetchAllCinema, getAllCinema } from "../../slice/CinemaSlice";

const MovieDetail = () => {
  const [change, setChange] = useState("information");

  const cinema = useSelector(getAllCinema)

  const onChangeInfo = (info) => setChange(info);

  return (
    <Container fluid>
      <Row xs={1} className="d-flex justify-content-end">
        <Col xs="12" className={classes.background}>
          <Image
            className={classes.background_image}
            src="https://media.cinemacloud.co.uk/imageFilm/1702_1_1.jpg"
            alt="background"
          />
          {/* <div className={classes.background_cover}></div> */}
        </Col>
      </Row>
      <Row xs={1} className={classes.movie_container}>
        <Col xs="2 offset-1" className={classes.movie_image_con}>
          <Image
            className={classes.movie_image}
            src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/192/2023/10/06110031/zbMRm6P6wPe9SQ6qJ7ZTAvCMS6e-683x1024.jpg"
            alt="movie"
          />
        </Col>
        <Col xs="4 offset-1">
          <p className={classes.movie_release_date}>11 JAN 2024</p>
          <h3 className={classes.movie_title}>The Boy and the Heron</h3>
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
        {change === "information" && <MovieInformation />}
        {change === "showtime" && <MovieShowTime cinema={cinema}/>}
      </Row>
    </Container>
  );
};

export default MovieDetail;
