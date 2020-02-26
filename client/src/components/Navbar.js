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
import UsersProfilesAndTweets from './ChildComponents/UsersProfilesAndTweets'


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }
    render() {
        const { user } = this.props
        return (
            <div>
                <ul>
                    <div key={user.id}>
                        <li><Link to='/tweets'>Tweets</Link></li>
                        <li><Link to={`/${this.props.name}`}> {this.props.name}</Link></li>
                        <li><Link to='/users/'> Users</Link></li>
                    </div>
                </ul>
                <Switch>
                    <Route path='/tweets' ><Tweets {...this.props} /></Route>
                    <Route path={`/${this.props.name}`} render={() => <UserProfile {...this.props} name={this.props.name} />} />
                    <Route path='/users/' render={(props) => <UserNames {...props} user={user} />} />
                    <Route path='/user/tweets/:id' render={(props) => <UsersProfilesAndTweets {...props} />} />
                </Switch>
            </div>
        );

    }
}
export default Navbar;