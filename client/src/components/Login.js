import React from 'react'
import LoginForm from './LoginForm'
import './SignIn.css'

function Login (props) {
  return (
    <div className="login-component">
      <h3>Log in to Twitter Clone</h3>
      <LoginForm {...props} />
    </div>
  )
}

export default Login