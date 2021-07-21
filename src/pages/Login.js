import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {useState} from 'react'
import logo from '../assets/logo.png'


const Login = (props) => {

  const [user, setUser] =  useState({username: "", password: ""}) 
  const [createSequence, setCreateSequence] = useState(false)
  const handleSubmit = () => {
    props.getLogin(user.username, user.password)
  }
    const handleChange = (event) => {
        console.log('handleChange - value', event.target.value)
        console.log('handleChange - name', event.target.name)
        const name = event.target.name 
        setUser({
          ...user,
          [name]: event.target.value
        })
      }
      React.useEffect(() => {
        
      }, []);
  
    const handleCreate = () => {
      setCreateSequence(true)
    }
    
    return (
      <div className="login">
        <img src={logo} alt="paper-hand logo"/>
        <div className={createSequence ? "login-page create-sequence" : "login-page"}>
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
export default Login