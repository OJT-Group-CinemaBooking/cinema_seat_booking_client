import React from 'react'
import classes from './NewMovieForm.module.css'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'

const NewMovieForm = () => {

  const generes =[
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Animation' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Crime' },
    { id: 6, name: 'Documentary' },
    { id: 7, name: 'Drama' },
    { id: 8, name: 'Family' },
    { id: 9, name: 'Fantasy' },
    { id: 10, name: 'History' },
    { id: 11, name: 'Horror' },
    { id: 12, name: 'Music' },
    { id: 13, name: 'Mystery' },
    { id: 14, name: 'Romance' },
    { id: 15, name: 'Science Fiction' },
    { id: 16, name: 'Thriller' },
    { id: 17, name: 'War' },
    { id: 18, name: 'Western' },
    { id: 19, name: 'Biography' },
    { id: 20, name: 'Film Noir' },
    { id: 21, name: 'Musical' },
    { id: 22, name: 'Sport' },
    { id: 23, name: 'Superhero' },
    { id: 24, name: 'Supernatural' },
    { id: 25, name: 'Teen' },
    { id: 26, name: 'True Crime' },
    { id: 27, name: 'Urban' },
    { id: 28, name: 'Coming of Age' },
    { id: 29, name: 'Espionage' },
    { id: 30, name: 'Mockumentary' },
    { id: 31, name: 'Period Drama' },
    { id: 32, name: 'Psychological Thriller' },
    { id: 33, name: 'Satire' },
    { id: 34, name: 'Silent Film' },
    { id: 35, name: 'Surreal' },
    { id: 36, name: 'Techno Thriller' },
    { id: 37, name: 'Tragedy' },
    { id: 38, name: 'Parody' },
    { id: 39, name: 'Zombie' },
  ]
  

  return (
    <Container>
      <Form className={classes.form}>
      <Row xs={2} className={classes.form_container}>

        <Col xs='10' md='6'>{/** input Group */}
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} md="10">
            <Form.Label>Movie Title *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Title-"
            />
            </Form.Group>
          </Row>

          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} md="10">
            <Form.Label>Movie Release Date *</Form.Label>
            <Form.Control
              required
              type="date"
              placeholder="ReleaseDate-"
            />
            </Form.Group>
          </Row>

          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} md="10">
            <Form.Label>Country *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Country-"
            />
            </Form.Group>
          </Row>

          <Row xs={2} className={classes.form_row}>
            <Form.Group as={Col} md="5">
            <Form.Label>Duration *</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Duration min-"
            />
            </Form.Group>
            <Form.Group as={Col} md="5">
            <Form.Label>Rating *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Rating-"
            />
            </Form.Group>
          </Row>

          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} md='10' className="mb-3" controlId="genere">
              <Form.Label>Choose Movie Generes*</Form.Label>
              <div md='10' className={classes.genere_form}>
              { generes.map( (g) => 
                    <Form.Check
                      inline
                      id={g.id}
                      type="checkbox"
                      label={g.name}
                    />
                  )}
              </div>
            </Form.Group>
          </Row>

          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} md="10">
            <Form.Label>Movie Synopsis *</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Synopsis"/>
            </Form.Group>
          </Row>

          <Row xs={1} className={classes.form_check}>
            <Col xs='4 offset-1 mb-2'>
              <Form.Check type="switch" id="custom-switch1" label="NowShowing" />
            </Col>
            <Col xs='4 offset-1 mb-2'>
              <Form.Check type="switch" id="custom-switch2" label="ComingSoon" />
            </Col>
            <Col xs='4 offset-1 mb-2'>
              <Form.Check type="switch" id="custom-switch3" label="PopularNow" />
            </Col>
            <Col xs='4 offset-1 mb-2'>
              <Form.Check type="switch" id="custom-switch4" label="Show" />
            </Col>
          </Row>
        </Col>

        <Col xs='10' md='6'>{/** image Group */}
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} xs="10">
            <Form.Label>Movie Trailer *</Form.Label>
            <Form.Control
              type="link"
              placeholder="Trailer Link-"
            />
            </Form.Group>
          </Row>
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} xs='10' className="mb-3" controlId="formfile1">
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control type="file"/>
            </Form.Group>
          </Row>
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} xs='10' className="mb-3" controlId="formfile2">
              <Form.Label>Movie Banner</Form.Label>
              <Form.Control type="file"/>
            </Form.Group>
          </Row>
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} xs='10' className="mb-3" controlId="starring">
              <Form.Label>Choose Movie Directors*</Form.Label>
              <div className={classes.director_form}>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
              </div>
            </Form.Group>
          </Row>
          <Row xs={1} className={classes.form_row}>
            <Form.Group as={Col} xs='10' className="mb-3" controlId="starring">
              <Form.Label>Choose Movie Starring*</Form.Label>
              <div className={classes.starring_form}>
                  <div className={classes.director}>
                    <Image 
                      src='https://image.tmdb.org/t/p/w500/dv2qhorxFHfLdWQHjhGXOi1YUXy.jpg' 
                      className={classes.crew_image}
                      />
                    <div className={classes.crew_name}>KO SABAKIKO</div>
                    <Form.Check
                      inline
                      id='1'
                      type="checkbox"
                    />
                  </div>
              </div>
            </Form.Group>
          </Row>
        </Col>

        <Col xs='12' className='text-center'>
          <Button className={classes.create_btn} type="submit">CREATE</Button>
        </Col>

      </Row>
      </Form>
    </Container>
  )
}

export default NewMovieForm