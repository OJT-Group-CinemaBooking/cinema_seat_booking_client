import React from 'react'
import classes from './OTPForm.module.css'
import { useState } from 'react';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';

const OTPForm = () => {
    const [opt,setOpt] = useState(new Array(4).fill(""))

    const handleChange = (element,index) =>{
      if(isNaN(element.value)){
        return false;
      }
      setOpt([...opt.map((d,idx) => (idx === index ? element.value : d))])
  
      if(element.nextSibling) {
        element.nextSibling.focus()
      }
    }
  
    return (
      <div className={classes.outer}>
        <div className={classes.otp_form}>
          <div className={classes.icon}>
            <ShieldFillCheck />
          </div>
          <p className={classes.header}>Enter OPT Code</p>
          <Form className={classes.form}>
            <div className={classes.input_div}>
              {
                opt.map((data,index) => {
                 return( <Form.Control
                type="text"
                inputMode="numeric"
                key={index}
                value={data}
                maxLength={1}
                onChange={e => handleChange(e.target,index)}
                onFocus={e => e.target.select()}
                required
              />
                 )
                })
              }
              
            </div>
  
            <div className={classes.btn}>
              <Button variant="danger" type="button" onClick={e => setOpt([...opt.map(v=>"")])}>
                Reset
              </Button>
              <Button variant="primary" type="submit">
                VERIFY
              </Button>
            </div>
          </Form>
  
          <p className={classes.sent_again}>
            Didn't receive code? <span>Resent again</span>
          </p>
        </div>
      </div>
    );
  };

export default OTPForm