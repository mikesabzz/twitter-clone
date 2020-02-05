import React from 'react'
import Navbar from './Navbar'
import {BrowserRouter as Router} from 'react-router-dom'

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
      <h1>{`Good ${timeOfDay}, ${name}`}</h1>
      <Router>
        <nav>
          <Navbar name={name} user={user} />
        </nav>
      </Router>
    </div>
  )
}

export default Dashboard