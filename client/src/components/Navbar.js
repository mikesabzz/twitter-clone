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
import CreateProfile from './CreateComponents/CreateProfile'


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
                    <div key={user.id}>
                        <li><Link to='/dashboard/tweets'>Tweets</Link></li>
                        <li><Link to={{ pathname: `/user/${user.name}/${user.id}` }}> {this.props.name}</Link></li>
                        <li><Link to='/users/'> Users</Link></li>
                        <li><Link to='/user/create'>Create</Link></li>
                    </div>
                </ul>
                <Switch>
                    <Route path='/dashboard/tweets' ><Tweets {...this.props} /></Route>
                    <Route path='/users/' render={(props) => <UserNames {...props} user={user} />} />
                    <Route path='/user/:name/:id' render={(props) => <UsersProfilesAndTweets {...props} name={this.props.name} />} />
                    <Route path='/user/create' render={(props) => <CreateProfile {...props} user={user} />} />
                </Switch>
            </div>
        );
    }
}
export default Navbar;