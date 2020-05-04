import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class SignUpForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: '',
      showError: false
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
  }

  async handleSubmitForm (event) {
    event.preventDefault()

    const { name, email, password } = this.state
    const { handleSignUp } = this.props

    this.setState({ showError: false })

    try {
      await handleSignUp({ name, email, password})
    } catch (e) {
      this.setState({ showError: true })
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
    const { showError } = this.state
    const { isSignedIn } = this.props

    let errorMessage

    if (showError) {
      errorMessage = (
        <div className='errorMessage'>
          <span>
            An error occurred, please ensure your credentials are correct
          </span>
        </div>
      )
    }

    if (isSignedIn) {
      return <Redirect to='/dashboard/user/upload' />
    }

    return (
      <div>
        { errorMessage }
        <form className='form' onSubmit={this.handleSubmitForm}>
          <div>
            <label>Name</label>
            <input
              type='text'
              name='name'
              onChange={this.handleTextInput}
              value={this.state.name.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              })}
            />
          </div>

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

          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUpForm