import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tweets from './ChildComponents/Tweets'
import UserNames from './ChildComponents/UserNames'
import UsersProfilesAndTweets from './ChildComponents/UsersProfilesAndTweets'
import FileUpload from './CreateComponents/FileUpload'
import CreateProfile from './CreateComponents/CreateProfile'
import UpdateTweets from './CreateComponents/UpdateTweets'
import UpdateProfile from './CreateComponents/UpdateProfile'
import './Navbar.css'


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            names: []
        }
    }
    render() {
        const { user } = this.props
        return (
            <div>
                <ul>
                    <div key={user.id} className="navbar-list">
                        <li className="glyphicon glyphicon-home"><Link to='/dashboard/tweets'>Tweets</Link></li>
                        <li className="glyphicon glyphicon-user"><Link to={{ pathname: `/dashboard/user/${user.name}/${user.id}` }}>{this.props.name}</Link></li>
                        <li className="glyphicon glyphicon-search"><Link to='/users/'>Users</Link></li>
                    </div>
                </ul>
                <Switch>
                    <Route path='/dashboard/tweets' ><Tweets {...this.props} /></Route>
                    <Route path='/users/' render={(props) => <UserNames {...props} user={user} />} />
                    <Route path='/dashboard/user/:name/:id' render={(props) => <UsersProfilesAndTweets {...props} name={this.props.name} createdAt={user.createdAt}/>} />
                    <Route path='/dashboard/tweet/:id/update' render={(props) => <UpdateTweets {...props} />} />
                    <Route path='/user/:name/:id/update' render={(props) => <UpdateProfile {...props} />} />
                    <Route path='/dashboard/user/create' render={(props) => <CreateProfile {...props} user={user} />} />
                    <Route path='/dashboard/user/upload' render={(props) => <FileUpload {...props} user={user} />} />
                </Switch>
            </div>
        );
    }
}
export default Navbar;