import classes from "./Header.module.css";
import { Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLoginStatus, logout } from "../../features/auth/authSlice";

const Header = () => {

  const dispatch = useDispatch()
  const loginStatus = useSelector(getLoginStatus)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`bg-body-tertiary ${classes.navbar}`}
    >
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          <Image
            src={`${process.env.PUBLIC_URL}/images/kyimal.png`}
            className={classes.nav_logo}
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={classes.buger_btn}
        />
        <Navbar.Collapse
          id={`responsive-navbar-nav ${classes.nav_link_holder}`}
        >
          <Nav className="me-auto">
            <Link className={classes.nav_link} as={Link} to={"/"}>
              Home
            </Link>
            <Link className={classes.nav_link} as={Link} to={"/movie"}>
              Movie
            </Link>
            <Link className={classes.nav_link} as={Link} to={"/cinema"}>
              Cinemas
            </Link>
            <Link className={classes.nav_link} as={Link} to={"/contact-us"}>
              ContactUs
            </Link>
          </Nav>
          <Nav>
            { (loginStatus === 'success') ?
            <Dropdown>
            <Dropdown.Toggle className={classes.person} variant="secondary" id="dropdown-basic">
              <PersonCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={"/user/profile"}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> 
            :
            <Link className={classes.person} as={Link} to={"/login"}>
            <PersonCircle />
          </Link>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
