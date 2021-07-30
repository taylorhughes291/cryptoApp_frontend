import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {useState} from 'react'
import {withRouter} from 'react-router-dom'


const Login = (props) => {

  const [user, setUser] =  useState({username: "", password: ""}) 
  const [createSequence, setCreateSequence] = useState(false)
  const handleSubmit = () => {
    props.getLogin(user.username, user.password)
  }
  const handleChange = (event) => {
      const name = event.target.name 
      setUser({
        ...user,
        [name]: event.target.value
      })
    }
    
  const handleCreate = () => {
    console.log("testing")
    setCreateSequence(true)
    setTimeout(() => props.history.push('/create'), 900)
    document.body.classList.remove("animation")
  }
    
    return (
      <div className="login">
        <div className={createSequence ? "login-page create-sequence" : "login-page open-sequence"}>
          <div className="form-forgot-cont">
            <div id= 'form'>
              <h2>Sign In</h2>
                <Form inline>
                  <FormGroup >
                      <p>Mobile Phone*</p>
                      <Input onChange={handleChange} type="username" name="username" id="exampleUsername" placeholder="Enter your mobile phone" />
                  </FormGroup>
                  {' '}
                  <FormGroup >
                      <p>Password*</p>
                      <Input onChange={handleChange} type="password" name="password" id="examplePassword" placeholder="Enter your password (6-12 characters)" />
                  </FormGroup>
                  {' '}
                  <Button className="btn btn-med btn-block" onClick={handleSubmit}>Sign Up</Button>
                  
                </Form>
            </div>
            <p><a style={{textDecoration: 'none'}} href='/create'>Forgot Password?</a></p>
          </div>
          <div className="bottom">
            <p>Don't have an account? <span onClick={handleCreate}>Create an Account</span></p>
          </div>
        </div>
      </div>
      );
}
export default withRouter(Login)