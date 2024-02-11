import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import classes from "./Cinema.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createCinema ,getCinemaStatus,getCreatedCinema,getUpdatedCinema } from "../../../slice/CinemaSlice";
import SingleCinema from "./SingleCinema";

const NewCinemaForm = ({ allCinema }) => {

  const status = useSelector(getCinemaStatus)
  const createdCinema = useSelector(getCreatedCinema)
  const updatedCinema = useSelector(getUpdatedCinema)
  const [newCinema, setNewCinema] = useState({})

  useEffect(() => {
    if(status === 'create_success') {
      setNewCinema(createdCinema)
    }
    if(status === 'update_success') {
      setNewCinema(updatedCinema)
    }
  },[status,createdCinema,updatedCinema])

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [canRequest, setCanRequest] = useState(true);

  const onNameInputChange = (e) => setName(e.target.value);
  const onLocationInputChange = (e) => setLocation(e.target.value);
  const onImageInputChange = (e) => setImage(e.target.files[0]);

  const fileInputRef = useRef();

  const imageInputHandler = () => {
    fileInputRef.current.click();
  };

  const canCreate = [name, location, canRequest].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    if (canCreate) {
      setCanRequest(false);
      const formData = new FormData();
      formData.append("file", image);
      const data = {
        cinema: {
          name,
          location,
        },
        formData,
      };
      dispatch(createCinema(data));
      setName("");
      setLocation("");
      setCanRequest(true);
    }
  };

  let cinemaDetail = "";

  if (status === "loading") {
    cinemaDetail = <tbody>Contents are Loading...</tbody>;
  } else {
    cinemaDetail = (
      <tbody>
        {allCinema.map((cinema) => (
          <SingleCinema key={cinema.id} cinema={cinema} newCinema={newCinema} />
        ))}
      </tbody>
    );
  }

  

  return (
    <Container>
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.cinema_table}>
          <Row className='text-light'>
            <h3>Cinema</h3>
          </Row>
          <Row xs={1}>
            <Table className={classes.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Loaction</th>
                  <th className="text-center">Theaters</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              {cinemaDetail}
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>NEW Cinema</h3>
            <Form.Group className={classes.image_row}>
              <div className={classes.cinema_file} onClick={imageInputHandler}>
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="cinema"
                    className={classes.file}
                  />
                ) : (
                  <div className={classes.file_holder}>
                    <h2>Photo</h2>
                    <h1>1 / 1</h1>
                  </div>
                )}
                <Form.Control
                  type="file"
                  ref={fileInputRef}
                  onChange={onImageInputChange}
                  style={{ display: "none" }}
                  required
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                onChange={onNameInputChange}
                placeholder="Eg.Mingalar"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Loaction *</Form.Label>
              <Form.Control
                type="text"
                onChange={onLocationInputChange}
                placeholder="Eg.Yangon"
                required
              />
            </Form.Group>
            <div className={classes.button_wapper}>
              <Button type="submit" disabled={!canCreate}>
                ADD
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCinemaForm;
