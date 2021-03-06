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
      return <Redirect to={`/dashboard/user/${this.state.name}/${this.props.userId}`} />
    }

    return (
      <div className="signup-form">
        { errorMessage }
        <form className='form' onSubmit={this.handleSubmitForm}>
          <div>
            <input
              type='text'
              name='name'
              onChange={this.handleTextInput}
              value={this.state.name.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              })}
              placeholder="name"
            />
          </div>

          <div>
            <input
              type='text'
              name='email'
              onChange={this.handleTextInput}
              value={this.state.email}
              placeholder="email"
            />
          </div>

          <div>
            <input
              type='password'
              name='password'
              onChange={this.handleTextInput}
              value={this.state.password}
              placeholder="password"
            />
          </div>

          <button className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUpForm