import React, { useState, useEffect } from 'react'
import TwitterLogo from './twitter-clone-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import { Route, Link } from 'react-router-dom'
import { login, getProfile, signUp } from './services/apiService'
import ProtectedRoute from './components/ProtectedRoute'
import authService from './services/authService'
import SignUp from './components/SignUp'

// Npm uninstall, npm install

// Npm audit

// ****Npm audit --force

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const signOutUser = () => {
    authService.signOut()
    setIsSignedIn(false);
    setUser({});
  }

  const loginUser = async (credentials) => {
    try {
      const fetchedUser = await login(credentials);
      setIsSignedIn(true);
      setUser(fetchedUser);
    } catch (e) {
      console.error("Error logging in:", e);
    }
  }

  const signUpUser = async (credentials) => {
    try {
      console.log('credentials in signUpUser', credentials)
      const newUser = await signUp(credentials);
      setIsSignedIn(true);
      setUser(newUser);
    } catch (e) {
      console.error("Error signing up:", e);
    }
  }

  useEffect(() => {
    const fetchedUserData = async () => {
      try {
        const fetchedUser = await getProfile();
        setIsSignedIn(authService.isAuthenticated());
        setUser(fetchedUser);
      } catch (e) {
        console.log('Issue fetching token')
      }
    };
    fetchedUserData();
  }, [])

  return (
      <div className='App'>
        <nav>
          { !isSignedIn &&
            <div className='nav-section'>
              <img className="twitter-logo-img" src={TwitterLogo} alt="" />
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          }

          { isSignedIn &&(
            <div className='nav-section'>
              <img className="twitter-logo-img" src={TwitterLogo} />
              <button className="sign-out-btn btn btn-outline-primary" onClick={signOutUser}>Sign out</button>
            </div>
          )}
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
                  handleLogin={loginUser}
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
                  userId={user.id}
                  handleSignUp={signUpUser}
                  isSignedIn={isSignedIn}
                />
            }
          />
        </main>
      </div>
    )
}

export default App
