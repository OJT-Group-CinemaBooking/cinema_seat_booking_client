import React, { useEffect } from 'react'
import classes from './OTPForm.module.css'
import { useState } from 'react';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOTPStatus, validateOTP } from '../../slice/OtpSlice';
import { getCreatedUser, getStatus, setUserCreateStatusToIdle } from '../../slice/userSlice';

const OTPForm = () => {
    const status = useSelector(getOTPStatus)
    const registerStatus = useSelector(getStatus)
    const user = useSelector(getCreatedUser)
    const [opt,setOpt] = useState(new Array(6).fill(""))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if(registerStatus === 'success') {
        dispatch(setUserCreateStatusToIdle())
      }
      if(status === 'success') {
        navigate('/login',{replace: true})
      }
    },[status,dispatch,navigate,registerStatus])

    const handleChange = (element,index) =>{
      if(isNaN(element.value)){
        return false;
      }
      setOpt([...opt.map((d,idx) => (idx === index ? element.value : d))])
  
      if(element.nextSibling) {
        element.nextSibling.focus()
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const code = opt.join('')
      const data = {
        otp : { code },
        username : user.username
      }

      dispatch(validateOTP(data))
    }
  
    return (
      <div className={classes.outer}>
        <div className={classes.otp_form}>
          <div className={classes.icon}>
            <ShieldFillCheck />
          </div>
          <p className={classes.header}>Enter OPT Code</p>
          <Form className={classes.form} onSubmit={handleSubmit}>
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
              <Button 
              variant="primary" 
              type="submit"
              disabled={opt.length < 4}
              >
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