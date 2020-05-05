import React from 'react'
import SignUpForm from './SignUpForm'
import './SignIn.css'

function SignUp (props) {
  return (
    <div className="signup-component">
      <h1>Create your account</h1>
      <SignUpForm {...props} />
    </div>
  )
}

export default SignUp