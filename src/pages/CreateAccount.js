import React from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {useState} from 'react'
import {withRouter} from 'react-router-dom'

const CreateAccount = (props) => {
    const [user, setUser] = useState({name: "", username: "", password: ""})

    const handleSubmit = (event) => {
            event.preventDefault();     // Prevent Form from Refreshing
            props.handleCreate(user)    // Submit  desired function
            
    };

    const handleChange = (event) => {
        const name = event.target.name 
        setUser({
          ...user,
          [name]: event.target.value
        })
      }
    
      React.useEffect(() => {
          
      })
    return (
        <div className="create">
            <div className="create-page sequence">
                <div id="form" tabindex="0">
                    <h2>Create Account</h2>
                    <Form inline >
                    <FormGroup >
                        <p>Full Name*</p>
                        <Input onChange={handleChange} type="name" name="name" id="exampleNAme" placeholder="Enter your full name"/>
                    </FormGroup>
                    {' '}
                    <FormGroup >
                        <p>Email</p>
                        <Input placeholder="Enter your email"/>
                    </FormGroup>
                    {' '}
                    <FormGroup >
                        <p>Mobile Phone*</p>
                        <Input onChange={handleChange} type="username" name="username" id="exampleUsername" placeholder="Enter your mobile phone" />
                    </FormGroup>
                    {' '}
                    <FormGroup >
                        <p>Password*</p>
                        <Input onChange={handleChange} type="password" name="password" id="examplePassword" placeholder="Enter Your Password (6-12 characters)" />
                    </FormGroup>
                    {' '}
                    
                    <Button
                    onClick={handleSubmit}
                    className="btn btn-med btn-danger btn-block"
                    >Submit</Button>
                    </Form>
                </div>
            </div>
        </div> 
    )
}

export default withRouter(CreateAccount)