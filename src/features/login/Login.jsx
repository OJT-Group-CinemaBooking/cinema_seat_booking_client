import React, { useState } from 'react'
import classes from './Login.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Eye, EyeSlash, PersonCircle } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [canRequest,setCanRequset] = useState(true)

  const [passwordTypeChange,setPasswordTypeChange] = useState("password")
  const [eyeChange,setEyeChange] = useState(<Eye/>)

  const onEmailInputChange = (e) => { setEmail(e.target.value) }
  const onPasswordInputChange = (e) => { setPassword(e.target.value) }

  const canLogin = [ email,password,canRequest ].every(Boolean)

  const onSubmit = (event) => {
    event.preventDefault()

    if(canLogin){
      setCanRequset(false)
    }
  }

  const onSignUp = () => {
    navigate('/sign-up')
  }

  const onShowPassword = () => {
    if(passwordTypeChange === 'password'){
      setPasswordTypeChange('text')
      setEyeChange(<EyeSlash/>)
    }else{
      setPasswordTypeChange('password')
      setEyeChange(<Eye/>)
    }
  }

  return (
    <div className={classes.login}>
    
      <div className={`${classes.login_card} bg-light`}>
        <img src="./images/actress.jpg" alt="actress" />
        <div className={classes.login_form_wapper}>
          <div className={classes.login_form}>
        <h3 className={classes.login_form_header}>Login</h3>
          <h1><PersonCircle/></h1>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Username or Email</Form.Label>
                <Form.Control placeholder='Username or Email' onChange={onEmailInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>

                <InputGroup hasValidation className={classes.password}>
                  <Form.Control type={passwordTypeChange} placeholder='Password' onChange={onPasswordInputChange}/>
                  <InputGroup.Text id="inputGroupPrepend" onClick={onShowPassword}>{eyeChange}</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Check type='checkbox' label='Remember me' />
              </Form.Group>
              <Button type='submit' disabled={!canLogin}>Login</Button>
              <Form.Group className="mt-1" controlId="formBasicCheckbox">
                <p>
                  You don't have account?
                  <span className={classes.sing_in} onClick={onSignUp}> Register </span>
                </p>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login