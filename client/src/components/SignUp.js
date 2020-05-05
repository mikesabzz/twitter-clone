import React from 'react'
import SignUpForm from './SignUpForm'
import './SignIn.css'

function SignUp (props) {
  return (
    <div className="signup-component">
      <h3>Create your account</h3>
      <SignUpForm {...props} />
    </div>
  )
}

export default SignUp