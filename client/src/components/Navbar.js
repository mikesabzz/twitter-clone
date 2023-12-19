import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Tweets from './ChildComponents/Tweets';
import UserNames from './ChildComponents/UserNames';
import UsersProfilesAndTweets from './ChildComponents/UsersProfilesAndTweets';
import FileUpload from './CreateComponents/FileUpload';
import CreateProfile from './CreateComponents/CreateProfile';
import UpdateTweets from './CreateComponents/UpdateTweets';
import UpdateProfile from './CreateComponents/UpdateProfile';
import EditImage from './CreateComponents/EditImage';

const Navbar = (props) => {
  const { user } = props;

  return (
    <div>

      <ul className="navbar-list">
        <div key={user.id} className="sidebar">
          <li>
            <Link to="/dashboard/tweets">
              <span className="glyphicon glyphicon-home">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: `/dashboard/user/${user.name}/${user.id}` }}
            
            >
              <span className="glyphicon glyphicon-user">User</span>
            </Link>
          </li>
          <li>
            <Link to="/users/">
              <span className="glyphicon glyphicon-search">Search</span>
            </Link>
          </li>
        </div>
      </ul>
      <Switch>
        <Route path="/dashboard/tweets">
          <Tweets {...props} />
        </Route>
        <Route
          path="/users/"
          render={(routeProps) => (
            <UserNames {...routeProps} user={user} />
          )}
        />
        <Route
          path="/dashboard/user/:name/:id"
          render={(routeProps) => (
            <UsersProfilesAndTweets
              {...routeProps}
              name={props.name}
              createdAt={user.createdAt}
            />
          )}
        />
        <Route
          path="/dashboard/tweet/:id/update"
          render={(routeProps) => <UpdateTweets {...routeProps} user={user} />}
        />
        <Route
          path="/user/:name/:id/update"
          render={(routeProps) => <UpdateProfile {...routeProps} />}
        />
        <Route
          path="/dashboard/user/create"
          render={(routeProps) => (
            <CreateProfile {...routeProps} user={user} />
          )}
        />
        {/* <Route
          path="/dashboard/user/upload"
          render={(routeProps) => <FileUpload {...routeProps} user={user} />}
        /> */}
        <Route
          path="/user/upload/:name/:id/edit"
          render={(routeProps) => <EditImage {...routeProps} user={user} />}
        />
      </Switch>
    </div>
  );
};

export default Navbar;
