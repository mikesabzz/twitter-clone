import React from "react";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Tweets from './ChildComponents/Tweets'
  import UserProfile from './ChildComponents/UserProfile'
  import UserNames from './ChildComponents/UserNames'


function Navbar (props) {
    return (
        <div>
            <div>
                <Link to='/tweets'>Tweets</Link>
                <Link to={`/${props.name}`}> {props.name}</Link>
                <Link to='/users'> Users</Link>
            </div>
            <Switch>
                <Route path='/tweets'><Tweets /></Route>
                <Route path={`/${props.name}`} render={() => <UserProfile name={props.name} />} />
                <Route path='/users'><UserNames /></Route>
            </Switch>
        </div>
    );
  }

export default Navbar;