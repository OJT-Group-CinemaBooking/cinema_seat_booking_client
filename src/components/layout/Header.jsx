import classes from "./Header.module.css";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Header = () => {
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
            <Link className={classes.person} as={Link} to={"/user/profile"}>
              <PersonCircle />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
