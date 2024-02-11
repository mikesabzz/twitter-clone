import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import Tweets from "./ChildComponents/Tweets";
import UserNames from "./ChildComponents/UserNames";
import UsersProfilesAndTweets from "./ChildComponents/UsersProfilesAndTweets";
import FileUpload from "./CreateComponents/FileUpload";
import CreateProfile from "./CreateComponents/CreateProfile";
import UpdateTweets from "./CreateComponents/UpdateTweets";
import UpdateProfile from "./CreateComponents/UpdateProfile";
import EditImage from "./CreateComponents/EditImage";

const Navbar = (props) => {
  const { user } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative flex">
      <div className="hidden lg:block bg-blue-50 border border-blue-500 p-4 w-40">
        <ul>
          <li>
            <Link to="/dashboard/tweets" className="flex items-center">
              <HomeIcon className="h-6 w-6" />
              <span className="ml-2 font-bold">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: `/dashboard/user/${user.name}/${user.id}` }}
              className="flex items-center"
            >
              <UserIcon className="h-6 w-6" />
              <span className="ml-2 font-bold">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/users/" className="flex items-center">
              <SearchIcon className="h-6 w-6" />
              <span className="ml-2 font-bold">Search</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="lg:hidden absolute top-0 left-0 mt-12 z-10">
        <button className="block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6 " />
          )}
        </button>
        <ul
          className={`absolute top-full left-0 bg-blue-50 border border-blue-500 p-4 w-40 ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/dashboard/tweets">Home</Link>
          </li>
          <li>
            <Link to={{ pathname: `/dashboard/user/${user.name}/${user.id}` }}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/users/">Search</Link>
          </li>
        </ul>
      </div>
      <div
        className={
          sidebarOpen
            ? "lg:hidden fixed inset-0 bg-black opacity-50 z-0"
            : "hidden"
        }
        onClick={toggleSidebar}
      ></div>
      <div className="flex flex-col flex-1">
        <Switch>
          <Route path="/dashboard/tweets">
            <Tweets {...props} />
          </Route>
          <Route
            path="/users/"
            render={(routeProps) => <UserNames {...routeProps} user={user} />}
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
            render={(routeProps) => (
              <UpdateTweets {...routeProps} user={user} />
            )}
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
          <Route
            path="/dashboard/user/upload"
            render={(routeProps) => <FileUpload {...routeProps} user={user} />}
          />
          <Route
            path="/user/upload/:name/:id/edit"
            render={(routeProps) => <EditImage {...routeProps} user={user} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Navbar;
