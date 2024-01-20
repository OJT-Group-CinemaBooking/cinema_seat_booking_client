import React, { useState } from "react";
import classes from "./MovieCrew.module.css";
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from "react-bootstrap";
import { FileEarmarkXFill, PencilSquare, Search } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { createNewCrew, deleteCrew, getAllDirectors, getAllStarrings } from "../../../slice/CrewSlice";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../config/baseURL";
import ConfirmModal from "../../../components/ui/ConfirmModal";

const MovieCrew = ({ crews }) => {
  const starrings = useSelector(getAllStarrings)
  const directors = useSelector(getAllDirectors)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [ allCrew, setAllCrew ] = useState(crews)

  const [ showModal, setShowModal ] = useState(false)

  const onDelete = () => {
    setShowModal(true)
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onConfirm = (crewId) => {
    dispatch(deleteCrew(crewId))
  }

  const onSelectRole = (e) => {
    switch (e.target.value) {
      case 'crew':
        setAllCrew(crews)
        break;
      case 'starring':
        setAllCrew(starrings)
        break;
      case 'director':
        setAllCrew(directors)
        break;
      default:
        setAllCrew(crews)
        break;
    }
  }

  const navigateDetail = (crewId) => {
    navigate(`/admin/crew-detail/${crewId}`)
  }

  const [file, setFile] = useState('')
  const [name, setName] = useState("");
  const [role, setRole] = useState("Starring");
  const [canRequest, setCanRequest] = useState(true);

  const onNameChange = (e) => setName(e.target.value.toUpperCase())
  const onRoleChange = (e) => setRole(e.target.value)
  const onFileInputChange = (e) => setFile(e.target.files[0])

  const canCreate = [file, name, role, canRequest].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    if (canCreate) {
      setCanRequest(false);
      const formData = new FormData()

      formData.append('file', file)
      const data = {
        crew : {
          name,
          role
        },
        formData
      }
      dispatch(createNewCrew(data));
      setName("")
      setRole("")
      setCanRequest(true);
    }
  };
  return (
    <Container>
      <Row xs={1} md={2} className="d-flex justify-content-evenly">
        <Col xs="7" className={classes.crew_table}>
          <Row xs={2} className="d-flex justify-content-between">
            <Col xs="3">
              <Form.Select onChange={onSelectRole}>
                <option value='crew'>All Crew</option>
                <option value='starring'>Strraing</option>
                <option value='director'>Director</option>
              </Form.Select>
            </Col>
            <Form as={Col} xs="6">
              <InputGroup size="sm">
                <Form.Control type="search" placeholder="Enter Name" />
                <Button variant="outline-secondary" id="button-addon">
                  <Search size={20} />
                </Button>
              </InputGroup>
            </Form>
          </Row>

          <Row xs={1}>
            <Table className={classes.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                { allCrew.map((crew) => (
                  <tr key={crew.id}>
                    <td className="ps-3">
                      <Image
                        src={`${IMAGE_URL}/crew/${crew.id}.jpg`}
                        alt="movie_crew"
                        className={classes.crew_image}
                      />
                    </td>
                    <td>{crew.name}</td>
                    <td>{crew.role}</td>
                    <td>
                      <div className="d-flex justify-content-evenly pt-2">
                        <PencilSquare color="#0079FF" onClick={() => {navigateDetail(crew.id)}}/>
                        <FileEarmarkXFill color="red"  onClick={onDelete}/>
                      </div>
                    </td>{
                      showModal && <ConfirmModal
                        onClose={onCancel}
                        onAction={() => {onConfirm(crew.id)}}
                        title='Delete Confirmation'
                        body={`Delete ${crew.name} ??`}
                      />
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>NEW CREW</h3>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                onChange={onNameChange}
                placeholder="Enter Name..."
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose Role *</Form.Label>
              <Form.Select aria-label="Role" onChange={onRoleChange}>
                <option value="Starring">Starring</option>
                <option value="Director">Director</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image *</Form.Label>
              <Form.Control
                type="file"
                onChange={onFileInputChange}
                placeholder="Enter imageName..."
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

export default MovieCrew;
