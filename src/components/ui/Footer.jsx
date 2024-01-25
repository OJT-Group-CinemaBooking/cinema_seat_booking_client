import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { EnvelopeAtFill, EnvelopeFill, Facebook, Google, HouseDoorFill, Instagram, PrinterFill, TelephoneFill, Twitter } from 'react-bootstrap-icons';
import classes from './Footer.module.css'
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <MDBFooter className={`text-center text-lg-start  ${classes.footer}`}>
      

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
          <MDBCol md="3" lg="4" xl="4" className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='' />
                About KyiMal
              </h4>
              <p className={classes.aboutUs}>
              Welcome to KyiMal - Your Gateway to Seamless Cinema Experiences!

              At KyiMal, we're passionate about bringing the magic of cinema to your fingertips. Launched in 2024,
               we are on a mission to redefine the way you experience movies, making ticket booking a breeze and cinema outings an unforgettable adventure.
              </p>
            </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Movie</h4>
              <p>
                <Link href='/' className='text-reset'>
                  Now Showing
                </Link>
              </p>
              <p>
                <Link href='/' className='text-reset'>
                  Coming Soon
                </Link>
              </p>
              <p>
                <Link href='/' className='text-reset'>
                  Cinema
                </Link>
              </p>
             
            </MDBCol>

            

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Account</h4>
              <p>
                <Link href='/' className='text-reset'>
                  My Profile
                </Link>
              </p>
              <p>
                <Link href='/' className='text-reset'>
                  CardInfo
                </Link>
              </p>
              <p>
                <Link href='/' className='text-reset'>
                  History
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className={`mx-auto mb-md-0 mb-4 ${classes.contact_us}`}>
              <h4 className='text-uppercase fw-bold mb-4'>Contact</h4>
              <p>
                <HouseDoorFill className='me-3'/>
                W37R+9W8, Mandalay, Myanmar
              </p>
              <p>
                <EnvelopeFill className='me-3'/>
                kyimal@cinema.com
              </p>
              <p>
                <TelephoneFill className='me-3'/> + 959 456 325 659
              </p>
              <p>
                <PrinterFill className='me-3' /> + 959 432 654 579
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <hr />
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/' target='blank' className='me-5 fs-2 text-reset'>
            <Facebook/>
          </a>
          <a href='https://twitter.com/' target='blank' className='me-5 fs-3 text-reset'>
            <Twitter />
          </a>
          <a href='https://google.com/' target='blank' className='me-5 fs-3 text-reset'>
            <Google />
          </a>
          <a href='https://instagram.com/' target='blank' className='me-5 fs-3 text-reset'>
            <Instagram />
          </a>
        </div>
      </section>

      <div className={`text-center p-4 ${classes.copyright}`}>
        COPYRIGHT RESERVED © 2024 KYIMAL GROUP PLC. ALL RIGHTS RESERVED.
        <Link className='text-reset fw-bold' href='/'>
          Kyimal.com
        </Link>
      </div>
    </MDBFooter>
  );
}