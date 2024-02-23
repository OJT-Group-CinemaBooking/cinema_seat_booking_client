import React, { useEffect, useRef, useState } from "react";
import classes from "./MovieCrew.module.css";
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewCrew, fetchAllCrew, getAllCrews, getCreatedCrew, getCrewCreateStatus, getCrewDeleteStatus, getCrewUpdateStatus, getUpdatedCrew, setCrewCreateStatusToIdle, setCrewDeleteStatusToIdle,setCrewUpdateStatusToIdle } from "../../../slice/CrewSlice";
import SingleCrew from "./SingleCrew";

const MovieCrew = () => {

  const createStatus = useSelector(getCrewCreateStatus)
  const updateStatus = useSelector(getCrewUpdateStatus)
  const deleteStatus = useSelector(getCrewDeleteStatus)
  const crews = useSelector(getAllCrews)
  const createdCrew = useSelector(getCreatedCrew)
  const updatedCrew = useSelector(getUpdatedCrew)

  const dispatch = useDispatch();
  const [ allCrew, setAllCrew ] = useState(crews)
  const [ newCrew, setNewCrew ] = useState({})

  useEffect(() => {
    if(createStatus === 'success') {
      setAllCrew(crews)
      setNewCrew(createdCrew)
      dispatch(fetchAllCrew)
      dispatch(setCrewCreateStatusToIdle())
    }
    if(deleteStatus === 'success') {
      setAllCrew(crews)
      dispatch(setCrewDeleteStatusToIdle())
    }
    if(updateStatus === 'success') {
      setAllCrew(crews)
      setNewCrew(updatedCrew)
      dispatch(fetchAllCrew)
      dispatch(setCrewUpdateStatusToIdle())
    }
  },[allCrew,dispatch,createStatus,crews,newCrew,createdCrew,updateStatus,updatedCrew,deleteStatus])

  const [file, setFile] = useState(null)
  const [name, setName] = useState("");
  const [role, setRole] = useState("Starring");
  const [canRequest, setCanRequest] = useState(true);

  const onSelectRole = (e) => {
    switch (e.target.value) {
      case 'crew':
        setAllCrew(crews)
        break;
      case 'starring':
        setAllCrew(crews.filter(c => c.role === 'Starring'))
        break;
      case 'director':
        setAllCrew(crews.filter(c => c.role === 'Director'))
        break;
      default:
        setAllCrew(crews)
        break;
    }
  }

  const onNameChange = (e) => setName(e.target.value.toUpperCase())
  const onRoleChange = (e) => setRole(e.target.value)
  const onFileInputChange = (e) => setFile(e.target.files[0])

  const fileInputRef = useRef()

  const imageInputHandler = () => {
    fileInputRef.current.click();
  }

  const canCreate = [file, name, role, canRequest].every(Boolean);

  const onSubmit = (event) => {
    event.preventDefault();
    if (canCreate) {
      setCanRequest(false);
      const formData = new FormData()

      if(file !== null) {
        formData.append('file', file)
      }
      const data = {
        crew : {
          name,
          role
        },
        formData
      }
      dispatch(createNewCrew(data));
      setName("")
      setRole("Starring")
      setFile(null)
      setCanRequest(true);
    }
  };

  const handleChange = (event) => {
    const enterValue = (event.target.value).toUpperCase()
    setAllCrew(crews.filter(crew => 
      (crew.name).toUpperCase().includes(enterValue)
    ))
  }

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
              <InputGroup size="sm" className={classes.search}>
                <Form.Control type="search" placeholder="Search With Name" onChange={handleChange} />
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
                { allCrew.map((crew) => 
                  <SingleCrew 
                    key={crew.id} 
                    crew={crew} 
                    newCrew={newCrew}
                  />
                )}
              </tbody>
            </Table>
          </Row>
        </Col>

        <Col xs="4" className={classes.form_col}>
          <Form onSubmit={onSubmit} className={classes.form}>
            <h3>NEW CREW</h3>
            <Form.Group className={classes.photo_row}>

              <div className={classes.movie_file} onClick={imageInputHandler}>
                { file ? (
                  <Image src={URL.createObjectURL(file)} alt="crew" className={classes.file} />
                ) : (
                  <div className={classes.file_holder}>
                    <h2>Photo</h2>
                    <h1>3 / 4</h1>
                  </div>
                )}
                <Form.Control 
                  type="file" 
                  ref={fileInputRef}
                  onChange={onFileInputChange}
                  style={{display : 'none'}}
                  required
                />
              </div>

            </Form.Group>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                value={name}
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
