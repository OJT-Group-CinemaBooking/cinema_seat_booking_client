import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import "./ContactUs.css"

const CU = () => {
  return (
    <section className="contact-section">
    <div className="container">
      <ToastContainer position="top-center" />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="wrapper">
            <div className="row no-gutters">
              <div className="col-md-6">
                <div className="contact-wrap w-100 p-lg-5 p-4">
                  <h3 className="mb-4">Send us a message</h3>
                  <form
                    id="contactForm"
                    className="contactForm"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            placeholder="Subject"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            type="text"
                            className="form-control"
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
                            className="btn btn-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="info-wrap w-100 p-lg-5 p-4 img">
                  <h3 className='text-warning'>Contact us</h3>
                  <p className="mb-4 text-warning">
                    We're open for any suggestion or just to have a chat
                  </p>
                  <div className="dbox w-100 d-flex align-items-start">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-map-marker"></span>
                    </div>
                    <div className="text pl-3">
                      <p className='text-warning'>
                        <span>Address:</span> W37R+9W8, Mandalay, Myanmar
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-phone"></span>
                    </div>
                    <div className="text pl-3">
                      <p className='text-warning'>
                        <span>Phone:</span>
                        <a href="#">959 456 325 659</a>
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-paper-plane"></span>
                    </div>
                    <div className="text pl-3">
                      <p className='text-warning'>
                        <span>Email:</span>
                        <a href="mailto:blabla@gmail.com">
                        kyimal@cinema.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="dbox w-100 d-flex align-items-center">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-globe"></span>
                    </div>
                    <div className="text pl-3">
                      <p className='text-warning'>
                        <span>Website:</span>
                        <a href="#">KyiMal</a>
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