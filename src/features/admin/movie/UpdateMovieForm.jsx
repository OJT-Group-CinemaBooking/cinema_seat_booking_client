import React, { useEffect, useRef, useState } from 'react'
import classes from './UpdateMovieForm.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../../config/baseURL';
import { getMovieStatus, updateMovie } from '../../../slice/MovieSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import InfoAlert from '../../../components/ui/InfoAlert';
import ReactFlagsSelect from "react-flags-select";

const UpdateMovieForm = ({ existedGeneres, existedCrews, movie, generes, starrings, directors }) => {
  const navigate = useNavigate()

  const status = useSelector(getMovieStatus)

  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(movie?.title)
  const [releaseDate, setReleaseDate] = useState(movie?.releaseDate)
  const [country, setCountry] = useState(movie?.country)
  const [language, setLanguage] = useState(movie?.language)
  const [duration, setDuration] = useState(movie?.duration)
  const [rating, setRating] = useState(movie?.rating)
  const [genere, setGenere] = useState(existedGeneres)
  const [synopsis, setSynopsis] = useState(movie?.synopsis)
  const [nowShowing, setNowShowing] = useState(movie?.nowShowing)
  const [comingSoon, setComingSoon] = useState(movie?.comingSoon)
  const [popularNow, setPopularNow] = useState(movie?.popularNow)
  const [showing, setShowing] = useState(movie?.showing)
  const [trailer, setTrailer] = useState(movie?.trailer)
  const [director, setDirector] = useState(existedCrews.filter( c => c.role === 'Director'))
  const [starring, setStarring] = useState(existedCrews.filter( c => c.role === 'Starring'))
  const [canRequest, setCanRequest] = useState(true)

  const dispatch = useDispatch();
  const posterRef = useRef()
  const bannerRef = useRef()

  const onPosterClick = () => {
    posterRef.current.click();
  }

  const onBannerClick = () => {
    bannerRef.current.click();
  }

  const onPosterInputChange = (e) => {
    setPoster(e.target.files[0])
  }
  const onBannerInputChange = (e) => {
    setBanner(e.target.files[0])
  }
  const onTitleInputChange = (e) => {
    setTitle(e.target.value);
  };
  const onReleaseDateInputChange = (e) => {
    setReleaseDate(e.target.value);
  };
  const onLanguageInputChange = (e) => {
    setLanguage(e.target.value);
  };
  const onDurationInputChange = (e) => {
    setDuration(e.target.value);
  };
  const onRatingInputChange = (e) => {
    setRating(e.target.value);
  };
  const onSynopsisInputChange = (e) => {
    setSynopsis(e.target.value);
  };
  const onNowShowingHandleChange = (e) => {
    setNowShowing(e.target.checked);
  };
  const onComingSoonHandleChange = (e) => {
    setComingSoon(e.target.checked);
  };
  const onPopularNowHandleChange = (e) => {
    setPopularNow(e.target.checked);
  };
  const onShowingHandleChange = (e) => {
    setShowing(e.target.checked);
  };
  const onTrailerInputChange = (e) => {
    setTrailer(e.target.value);
  };

  /** genere select */
  const onselectGenere = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const selectedGenere = generes.find((gen) => gen.id === Number(value));
      setGenere([...genere, selectedGenere]);
    } else {
      const selectedGenere = genere.filter((gen) => gen.id !== Number(value));
      setGenere(selectedGenere);
    }
  };

  /** select director */
  const onselectDirector = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const selectedDirector = directors.find((d) => d.id === Number(value));
      setDirector([...director, selectedDirector]);
    } else {
      const selectedDirector = director.filter((d) => d.id !== Number(value));
      setDirector(selectedDirector);
    }
  };

  /** select starring */
  const onselectStarring = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const selectedStarring = starrings.find((s) => s.id === Number(value));
      setStarring([...starring, selectedStarring]);
    } else {
      const selectedStarring = starring.filter((s) => s.id !== Number(value));
      setStarring(selectedStarring);
    }
  };

  const canCreate = [
    canRequest,
  ].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    
    if (canCreate) {
      setCanRequest(false);
      const posterFormData = new FormData()
      const bannerFormData = new FormData()

      if(poster !== null) {
        posterFormData.append('file',poster)
      }

      if(banner !== null) {
        bannerFormData.append('file',banner)
      }

      const data = {
        movie : {
          id : movie.id,
          title,
          releaseDate,
          country,
          language,
          duration,
          rating,
          synopsis,
          nowShowing,
          comingSoon,
          popularNow,
          showing,
          trailer
        },
        genereList : genere,
        crewList : [...starring,...director],
        posterFormData,
        bannerFormData
      };
      dispatch(updateMovie(data))
      setCanRequest(true)
    }
  };

  const [ showAlert, setShowAlert ] = useState(false)

    useEffect(() => {
      if(status === 'update_success' || status === 'update_failed') {
          setShowAlert(true)
      }
    },[status])
    
    const onHide = () => {
      setShowAlert(false)
    }

    const onHandleBackArrow = () => {
      navigate('/admin/dashboard/movie')
    }

  return (
    <Container>
      <Form className={classes.form} onSubmit={onSubmit}>
        {
          showAlert && <InfoAlert 
            onHide={onHide}
            variant={(status === 'update_success')? 'success' : 'danger'}
            information={(status === 'update_success')? 'Successifully updated!' : 'Update Failed!'}
          />
        }
        <Row xs={2} className={classes.form_container}>
          <Col xs='12'>
            <Row className={classes.back_arrow}>
              <ArrowLeft color="#D4AF37" size={30} onClick={onHandleBackArrow}/>
            </Row>
          </Col>
          <Col xs='12' className='text-center text-light'>
            <h2>Movie Update Form</h2>
          </Col>

          <Col xs="10" md="6">
            {/** image Group */}

            <Row xs={1} className={classes.form_row}>
              <Form.Group
                as={Col}
                xs="10" 
                className={classes.poster_form}
                controlId="formfile1"
              >
                <Form.Label>Movie Poster</Form.Label>

                <div className={classes.movie_poster} onClick={onPosterClick}>
                  { poster ? (
                    <Image src={URL.createObjectURL(poster)} alt="poster" className={classes.poster} />
                  ) : (
                    <Image src={`${IMAGE_URL}/movie/${movie.id}.jpg`} alt="poster" className={classes.poster} />
                  )}
                  <Form.Control 
                    type="file" 
                    ref={posterRef}
                    onChange={onPosterInputChange} 
                    style={{display : 'none'}}
                  />
                </div>
              </Form.Group>
            </Row>
            <Row xs={1} className={classes.form_row}>
              <Form.Group
                as={Col}
                xs="10"
                className="mb-3"
                controlId="formfile2"
              >
                <Form.Label>Movie Banner</Form.Label>

                <div className={classes.movie_banner} onClick={onBannerClick}>
                  { banner ? (
                    <Image src={URL.createObjectURL(banner)} alt="banner" className={classes.banner} />
                  ) : (
                    <Image src={`${IMAGE_URL}/movie/${movie.id}B.jpg`} alt="banner" className={classes.banner} />
                  )}
                  <Form.Control 
                    type="file" 
                    ref={bannerRef}
                    onChange={onBannerInputChange} 
                    style={{display : 'none'}}
                  />
                </div>
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group as={Col} xs="10">
                <Form.Label>Movie Trailer *</Form.Label>
                <Form.Control
                  type="text" 
                  value={trailer}
                  placeholder="Trailer Link-"
                  onChange={onTrailerInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group as={Col} md="10">
                <Form.Label>Movie Synopsis *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3} 
                  value={synopsis}
                  placeholder="Synopsis"
                  onChange={onSynopsisInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_check}>
              <Col xs="4 offset-1 mb-2">
                <Form.Check
                  type="switch" 
                  checked={nowShowing}
                  id="custom-switch1"
                  label="NowShowing"
                  onChange={onNowShowingHandleChange}
                />
              </Col>
              <Col xs="4 offset-1 mb-2">
                <Form.Check
                  type="switch" 
                  checked={comingSoon}
                  id="custom-switch2"
                  label="ComingSoon"
                  onChange={onComingSoonHandleChange}
                />
              </Col>
              <Col xs="4 offset-1 mb-2">
                <Form.Check
                  type="switch" 
                  checked={popularNow}
                  id="custom-switch3"
                  label="PopularNow"
                  onChange={onPopularNowHandleChange}
                />
              </Col>
              <Col xs="4 offset-1 mb-2">
                <Form.Check
                  type="switch" 
                  checked={showing}
                  id="custom-switch4"
                  label="Show"
                  onChange={onShowingHandleChange}
                />
              </Col>
            </Row>

          </Col>

          <Col xs="10" md="6">
            {/** input Group */}
            <Row xs={1} className={classes.form_row}>
              <Form.Group as={Col} md="10">
                <Form.Label>Movie Title *</Form.Label>
                <Form.Control
                  required
                  type="text" 
                  value={title}
                  placeholder="Title-"
                  onChange={onTitleInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group as={Col} md="10">
                <Form.Label>Movie Release Date *</Form.Label>
                <Form.Control
                  required
                  type="date"
                  value={releaseDate}
                  placeholder="ReleaseDate-"
                  onChange={onReleaseDateInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={2} className={classes.form_row}>
              <Form.Group as={Col} md="5">
                <Form.Label>Country *</Form.Label>
                {/* <Form.Control
                  required
                  type="text"
                  value={country}
                  placeholder="Country -"
                  onChange={onCountryInputChange}
                /> */}
                <ReactFlagsSelect 
                  className={classes.flags_select}
                  selected={country}
                  onSelect={(code) => setCountry(code)}
                  placeholder="Select Country" 
                  searchable 
                  searchPlaceholder="Search countries"
                />
              </Form.Group>
              <Form.Group as={Col} md="5">
                <Form.Label>Language *</Form.Label>
                <Form.Control
                  required
                  type="text" 
                  value={language}
                  placeholder="Language -"
                  onChange={onLanguageInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={2} className={classes.form_row}>
              <Form.Group as={Col} md="5">
                <Form.Label>Duration Minutes *</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={duration}
                  placeholder="Minutes -"
                  onChange={onDurationInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="5">
                <Form.Label>IMDB Rating *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={rating}
                  placeholder="Rating -"
                  onChange={onRatingInputChange}
                />
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group as={Col} md="10" className="mb-3" controlId="genere">
                <Form.Label>Choose Movie Generes*</Form.Label>
                <div md="10" id="genere" className={classes.genere_form}>
                  {generes.map((g) => (
                    <Form.Check
                      key={g.id}
                      inline
                      type="checkbox"
                      value={g.id}
                      id={`${g.id}g`}
                      label={g.name}
                      checked={genere?.some(sg => sg.id === g.id)}
                      onChange={onselectGenere}
                    />
                  ))}
                </div>
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group
                as={Col}
                xs="10"
                className="mb-3"
                controlId="starring"
              >
                <Form.Label>Choose Movie Directors*</Form.Label>
                <div className={classes.director_form}>
                  {directors.map((d) => (
                    <div className={classes.director} key={d.id}>
                      <Image
                        src={`${IMAGE_URL}/crew/${d.id}.jpg`}
                        className={classes.crew_image}
                      />
                      <div className={classes.crew_name}>{d.name}</div>
                      <Form.Check
                        inline
                        id={`${d.id}d`}
                        value={d.id}
                        checked={director.some( sd => sd.id === d.id)}
                        type="checkbox"
                        onChange={onselectDirector}
                      />
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Row>

            <Row xs={1} className={classes.form_row}>
              <Form.Group
                as={Col}
                xs="10"
                className="mb-3"
                controlId="starring"
              >
                <Form.Label>Choose Movie Starring*</Form.Label>
                <div className={classes.starring_form}>
                  {starrings.map((actor) => (
                    <div className={classes.director} key={actor.id}>
                      <Image
                        src={`${IMAGE_URL}/crew/${actor.id}.jpg`}
                        className={classes.crew_image}
                      />
                      <div className={classes.crew_name}>{actor.name}</div>
                      <Form.Check
                        inline
                        id={`${actor.id}s`}
                        checked={starring.some(sa => sa.id === actor.id)}
                        value={actor.id}
                        type="checkbox"
                        onChange={onselectStarring}
                      />
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Row>

          </Col>

          <Col xs="12" className="text-center">
            <Button 
              className={classes.create_btn} 
              type="submit" 
            >
              SAVE
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateMovieForm