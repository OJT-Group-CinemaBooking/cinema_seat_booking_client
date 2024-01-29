import classes from './Header.module.css'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <Navbar id='navbar' expand="lg" className={classes.navbar}>
    <Container fluid>
      <Navbar.Brand as={Link} to={'/'} >
        <Image src={`${process.env.PUBLIC_URL}/images/kyimal.png`} className={classes.nav_logo} alt='logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" className={classes.nav_link_holder}>
        <Nav>
          <Link className={classes.nav_link} as={Link} to={'/'} >Home</Link>
          <Link className={classes.nav_link} as={Link} to={'/movie'} >Movie</Link>
          <Link className={classes.nav_link} as={Link} to={'/'} >Cinema</Link>
          <Link className={classes.nav_link} as={Link} to={'/contact-us'} >ContactUs</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header