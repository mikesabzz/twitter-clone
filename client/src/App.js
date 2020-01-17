import React, { Component } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Link } from 'react-router-dom'
import { login } from './services/apiService'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      user: {}
    }

    this.loginUser = this.loginUser.bind(this)
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

  render() {
    const { isSignedIn, user } = this.state

    return (
      <div className='App'>
        <nav>
          { !isSignedIn &&
            <div className='nav-section'>
              <Link to='/login'>Login</Link>
            </div>
          }

          { isSignedIn &&
            <div className='nav-section'>
              <Link to='/dashboard'>Dashboard</Link>
            </div>
          }
        </nav>

        <main>
          <ProtectedRoute 
            path='/dashboard' 
            user={user}
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
        </main>
      </div>
    )
  }
}

export default App
