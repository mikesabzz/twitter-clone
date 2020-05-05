import React from 'react'
import Navbar from './Navbar'
import {BrowserRouter as Router} from 'react-router-dom'
import './Dashboard.css'

function Dashboard (props) {
  const { user } = props
  const name = (user.name !== undefined) ? user.name : ''
  let timeOfDay
  const date = new Date()
  const hours = date.getHours()
  if (hours < 12) {
    timeOfDay = 'Morning'
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Afternoon'
  } else {
    timeOfDay = 'Evening'
  }
  return (
    <div>
      <h2 id="dashboard-header">{`Good ${timeOfDay}, ${name}`}</h2>
      <Router>
        <nav className="navbar-container">
          <Navbar name={name} user={user} />
        </nav>
      </Router>
    </div>
  )
}

export default Dashboard