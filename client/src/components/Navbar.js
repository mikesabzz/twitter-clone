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
            <ul>
            <div key={user.id}>
                <li><Link to='/tweets'>Tweets</Link></li>
                <li><Link to={`/${props.name}`}> {props.name}</Link></li>
                <li><Link to='/users/'> Users</Link></li>
            </div>
            </ul>
            <Switch>
                <Route path='/tweets' ><Tweets {...props} /></Route>
                <Route path={`/${props.name}`} render={() => <UserProfile {...props} name={props.name} />} />
                <Route path='/users/' render={(props)=> <UserNames {...props} user={user}/>}/>
            </Switch>
        </div>
    );
  
    }
export default Navbar;