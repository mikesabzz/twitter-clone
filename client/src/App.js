import React, { Component } from 'react'
import './App.css'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Link } from 'react-router-dom'
import { login } from './services/apiService'

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
    const { isSignedIn } = this.state

    return (
      <div className='App'>
        <nav>
          <div>
            <Link to='/'>Home</Link>
          </div>
          <div>
            <Link to='/dashboard'>Dashboard</Link>
          </div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
        </nav>

        <main>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
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
