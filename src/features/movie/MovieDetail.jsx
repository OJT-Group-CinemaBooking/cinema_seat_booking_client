import React, { useEffect, useState } from "react";
import classes from "./MovieDetail.module.css";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import MovieInformation from "./MovieInformation";
import MovieShowTime from "./MovieShowTime";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovie, getMovieById, getMovieStatus } from "../../slice/MovieSlice";
import { IMAGE_URL } from "../config/baseURL";
import { fetchAllCinema, getAllCinema, getCinemaStatus } from "../../slice/CinemaSlice";

const MovieDetail = () => {

  const { movieId } = useParams()
  const movieStatus = useSelector(getMovieStatus)
  const cinemaStatus = useSelector(getCinemaStatus)
  const movie = useSelector((state) => getMovieById(state,movieId))
  const cinemas = useSelector(getAllCinema)

  const dispatch = useDispatch()

  useEffect(() => {
    if(movieStatus === 'idle') {
      dispatch(fetchAllMovie())
    }
    if(cinemaStatus === 'idle') {
      dispatch(fetchAllCinema())
    }
  })

  const [change, setChange] = useState("information");

  const onChangeInfo = (info) => setChange(info);

  return (
    <>
      { movieStatus === 'loading' && 
        <div className="w-100 mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      }
      { movieStatus.includes('_success') && 
      <Container fluid>
        <Row xs={1} className="d-flex justify-content-end">
          <Col xs="12" className={classes.background}>
            <Image
              className={classes.background_image}
              src={`${IMAGE_URL}/movie/${movie.id}B.jpg`}
              alt="movie banner"
            />
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
          <Col xs="4 offset-1">
            <p className={classes.movie_release_date}>{movie.releaseDate}</p>
            <h3 className={classes.movie_title}>{movie.title}</h3>
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
            <MovieShowTime movieId={movie.id} cinemas={cinemas}/>
          }
        </Row>
      </Container>
      }
      {
        movieStatus === <p>Failed to load. Some thing Wrong! Please try again.</p>
      }
    </>
  );
};

export default MovieDetail;
