import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Link } from 'react-router-dom'
import { login, getProfile, signUp } from './services/apiService'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/authService'
import SignUp from './components/SignUp'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {}
    }
    this.signOutUser = this.signOutUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.signUpUser = this.signUpUser.bind(this)
  }

  signOutUser() {
    authService.signOut()
    this.setState({
      isSignedIn: false,
      user: {}
    })
  }

  async loginUser(credentials) {
    try {
      const user = await login(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  async signUpUser (credentials) {
    try {
      console.log('credentials in signUpUser', credentials)
      const user = await signUp(credentials)
      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (e) {
      throw e
    }
  }

  async componentDidMount() {
    try {
      const fetchedUser = await getProfile()

      this.setState({
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      })
    } catch (e) {
      console.log('Issue fetching token')
    }
  }

  render() {
    const { isSignedIn, user } = this.state
    console.log(user)
    return (
      <div className='App'>
        <nav>
          { !isSignedIn &&
            <div className='nav-section'>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          }

          { isSignedIn &&
            <div className='nav-section'>
              <Link to='/dashboard'>Dashboard</Link>
              <button onClick={this.signOutUser}>Sign out</button>
            </div>
          }
        </nav>

        <main>
          <ProtectedRoute 
            path='/dashboard' 
            user={this.state.user}
            component={Dashboard} 
          />
          <Route
            path='/login'
            render={
              (props) =>
                <Login
                  {...props}
                  handleLogin={this.loginUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
          <Route
            path='/signup'
            render={
              (props) =>
                <SignUp
                  {...props}
                  handleSignUp={this.signUpUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
        </main>
      </div>
    )
  }
}

export default App
