import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
  }

  async handleSubmitForm (event) {
    event.preventDefault()
    console.log(`submitting the form`)
  
    const { email, password } = this.state
    const { handleLogin } = this.props
  
    try {
      await handleLogin({ email, password})
    } catch (e) {
      console.log(e)
    }
  }

  handleTextInput (event) {
    const fieldName = event.target.name
    const value = event.target.value

    this.setState(state => {
      return { [fieldName]: value }
    })
  }

  render () {
    const { isSignedIn } = this.props

    if (isSignedIn) {
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmitForm}>
          <div>
            <label>Email</label>
            <input
              type='text'
              name='email'
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm