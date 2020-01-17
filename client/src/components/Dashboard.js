import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tweets from './ChildComponents/Tweets'

function Dashboard (props) {
  const { user } = props
  const name = (user.name !== undefined) ? user.name : ''
  let timeOfDay
  const date = new Date()
  const hours = date.getHours()

  if (hours < 12) {
    timeOfDay = 'morning'
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'afternoon'
  } else {
    timeOfDay = 'evening'
  }

  return (
    <div>
      <h1>{`Good ${timeOfDay}, ${name}`}</h1>
      <Router>
      <div>
        <Link to='/tweets'>Tweets</Link>
        <Route path='/tweets'><Tweets /></Route>
      </div>
      </Router>
    </div>
  )
}

export default Dashboard