import React, { useEffect, useState } from 'react'
import classes from './Login.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Eye, EyeSlash, PersonCircle } from 'react-bootstrap-icons'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginStatus, getRoles, login, setLoginStatusToIdle } from '../auth/authSlice'

const Login = () => {

  const status = useSelector(getLoginStatus)
  const roles = useSelector(getRoles)
  const token = localStorage.getItem('token')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const [canRequest,setCanRequest] = useState(true)

  const [passwordTypeChange,setPasswordTypeChange] = useState("password")
  const [eyeChange,setEyeChange] = useState(<Eye/>)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if(status === 'failed') {
      setFailed(true)
    }
  },[status,failed])

  const onEmailInputChange = (e) => { setUsername(e.target.value) }
  const onPasswordInputChange = (e) => { setPassword(e.target.value) }

  const canLogin = [ username,password,canRequest ].every(Boolean)
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(login({
      username,
      password
    }))
    setUsername('')
    setPassword('')
    setCanRequest(true)
  }

  if(status ==='success' && token && (roles[0]) === 'ROLE_ADMIN'){
    return (<Navigate to={'/admin/dashboard'} replace={true} />)
  }
  if(status ==='success' && token && (roles[0]) === 'ROLE_USER'){
    return (<Navigate to={from} replace={true} />)
  }

  const onSignUp = () => {
    if(status === 'failed') {
      dispatch(setLoginStatusToIdle())
    }
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
                <Form.Control 
                value={username}
                placeholder='Username or Email' 
                onChange={onEmailInputChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>

                <InputGroup hasValidation className={classes.password}>
                  <Form.Control 
                  type={passwordTypeChange} 
                  value={password}
                  placeholder='Password' 
                  onChange={onPasswordInputChange}/>
                  <InputGroup.Text id="inputGroupPrepend" onClick={onShowPassword}>{eyeChange}</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Check type='checkbox' label='Remember me' />
              </Form.Group>
              {
                failed && 
                <p className='text-danger p-0 m-0'>email or password is wrong</p>
              }
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