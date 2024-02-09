import React, { useEffect, useState } from 'react'
import classes from './SignUP.module.css'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Eye, EyeSlash, PersonCircle } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCreateStatus, registerNewUser } from '../../slice/userSlice'
import DelayModal from '../../components/ui/DelayModal'

const SignUp = () => {

  const status = useSelector(getCreateStatus)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ show, setShow ] = useState(false)
  const [ failed, setFailed ] = useState(false)

  const [firstname,setFirstName] = useState("")
  const [lastname,setLastName] = useState("")
  const [username,setUserName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const [canRequest,setCanRequest] = useState(true)

  const [passwordTypeChange,setPasswordTypeChange] = useState("password")
  const [eyeChange,setEyeChange] = useState(<Eye/>)

  useEffect(() => {
    if(status === 'loading') {
      setShow(true)
    }
    if(status === 'success') {
      navigate('/otp', {replace : true})
    }
    if(status === 'failed') {
      setShow(false)
      setFailed(true)
    }
  },[status, navigate])

  const onFirstnameInputChange = (e) => { setFirstName(e.target.value) }
  const onLastnameInputChange = (e) => { setLastName(e.target.value) }
  const onUserNameInputChange = (e) => { setUserName(e.target.value) }
  const onEmailInputChange = (e) => { setEmail(e.target.value) }
  const onPasswordInputChange = (e) => { setPassword(e.target.value) }

  const canLogin = [ firstname,lastname,email,password,canRequest ].every(Boolean)

  const onSubmit = (event) => {
    event.preventDefault()

    if(canLogin){
      setCanRequest(false)
      const user = {
        firstname, 
        lastname, 
        username, 
        email, 
        password,
      }

      setFirstName('')
      setLastName('')
      setUserName('')
      setEmail('')
      setPassword('')
      setCanRequest(true)

      dispatch(registerNewUser(user))
    }
  }

  const onLogin = () => {
    navigate('/login')
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
    <>
    <DelayModal 
    show={show} 
    message={'Sending Mail.Please Wait..'}
    />
    <div className={classes.signup}>
    
      <div className={`${classes.signup_card} bg-light`}>
        
        <div className={classes.signup_form_wapper}>
          <div className={classes.signup_form}>
        <h3 className={classes.signup_form_header}>SignUp</h3>
          <h1><PersonCircle/></h1>
            <Form onSubmit={onSubmit}>
              <Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control type='text' placeholder='Firstname' onChange={onFirstnameInputChange}/>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type='text' placeholder='Lastname' onChange={onLastnameInputChange}/>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Username' onChange={onUserNameInputChange}/>
                {
                  failed && 
                  <p className='text-danger text-bold p-0 m-0 '>
                    username or email already exist!
                  </p>
                }
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                  <Form.Control type='email' placeholder='email' onChange={onEmailInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>

                <InputGroup hasValidation className={classes.password}>
                  <Form.Control type={passwordTypeChange} placeholder='Password' onChange={onPasswordInputChange}/>
                  <InputGroup.Text id="inputGroupPrepend" onClick={onShowPassword}>{eyeChange}</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              
              <Button type='submit' disabled={!canLogin}>Sign up</Button>
              <Form.Group className="mt-1" controlId="formBasicCheckbox">
                <p>
                  Already have an account?
                  <span className={classes.sing_in} onClick={onLogin}> Login </span>
                </p>
              </Form.Group>
            </Form>
          </div>
        </div>

        <img src="./images/actor.jpg" alt="actress" />

      </div>
    </div>
    </>
  )
}

export default SignUp