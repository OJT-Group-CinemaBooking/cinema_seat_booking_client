import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import classes from './ContactUs.module.css'
import { Link } from 'react-router-dom'

const CU = () => {
  return (
    <section className={`${classes.contact_section} ${classes.contactUsCss}`}>
    <div className="container">
      <ToastContainer position="top-center" />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className={classes.wrapper}>
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className={`${classes.contact_wrap} w-100 p-lg-5 p-4`}>
                  <h3 className={`mb-4 ${classes.header}`}>Send us a message</h3>
                  <form
                    className={classes.contactForm}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className={`form-control ${classes.form_control}`}
                            name="name"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="email"
                            className={`form-control ${classes.form_control}`}
                            name="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className={`form-control ${classes.form_control}`}
                            name="subject"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            className={`form-control ${classes.form_control}`}
                            name="message"
                            placeholder="Message"
                            cols="30"
                            rows="6"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="submit"
                            value="Send Message"
                            className={`${classes.btn} ${classes.btn_primary}`}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                <div className={`${classes.info_wrap} w-100 p-lg-5 p-4 ${classes.img}`}>
                  <h2 className={classes.header} style={{textDecoration:'underline', textDecorationColor:'#d62196'}}>Contact us</h2>
                  <p className="mb-4 text-warning">
                    We're open for any suggestion or just to have a chat
                  </p>
                  <div className={`${classes.dbox} w-100 d-flex align-items-start`}>
                    <div className={`${classes.icon} d-flex align-items-center justify-content-center`}>
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className={`${classes.text} pl-3`}>
                      <p className='text-warning'>
                        <span>Address:</span> W37R+9W8, Mandalay, Myanmar
                      </p>
                    </div>
                  </div>
                  <div className={`${classes.dbox} w-100 d-flex align-items-start`}>
                    <div className={`${classes.icon} d-flex align-items-center justify-content-center`}>
                      <span className="fa fa-phone"></span>
                    </div>
                    <div className={`${classes.text} pl-3`}>
                      <p className='text-warning'>
                        <span>Phone : </span>
                        <span className={classes.link}> 959 456 325 659</span>
                      </p>
                    </div>
                  </div>
                  <div className={`${classes.dbox} w-100 d-flex align-items-start`}>
                    <div className={`${classes.icon} d-flex align-items-center justify-content-center`}>
                      <span className="fa fa-paper-plane"></span>
                    </div>
                    <div className={`${classes.text} pl-3`}>
                      <p className='text-warning'>
                        <span>Email : </span>
                       <span className={classes.link}> kyimal@cinema.com</span>
                      </p>
                    </div>
                  </div>
                  <div className={`${classes.dbox} w-100 d-flex align-items-start`}>
                    <div className={`${classes.icon} d-flex align-items-center justify-content-center`}>
                      <span className="fa fa-globe"></span>
                    </div>
                    <div className={`${classes.text} pl-3`}>
                      <p className='text-warning'>
                        <span>Website : </span>
                        <Link to={'/'} className={classes.link}>KyiMal</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default CU