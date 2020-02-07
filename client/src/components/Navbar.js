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
    const {user} = props
    return (
        <div>
            <div key={user.id}>
                <Link to='/tweets'>Tweets</Link>
                <Link to={`/${props.name}`}> {props.name}</Link>
                <Link to='/users/'> Users</Link>
            </div>
            <Switch>
                <Route path='/tweets'render={(props)=> <Tweets {...props} />}/>
                <Route path={`/${props.name}`} render={() => <UserProfile {...props} name={props.name} />} />
                <Route path='/users/' render={(props)=> <UserNames {...props} user={user}/>}/>
            </Switch>
        </div>
    );
  }

export default Navbar;