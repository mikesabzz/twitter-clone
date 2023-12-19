import React, {useState, useEffect} from 'react'
import { getAllTweets, getAllProfiles, deleteTweet } from '../../services/apiService'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { FaBirthdayCake } from 'react-icons/fa'
import UserImage from './UserImage'
// import './styles.css'

const UsersProfilesAndTweets = (props) => {
    const [profiles, setProfiles] = useState([]);
    const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getTweets();
      await getProfile();
    };

    fetchData();
  }, []);

    const getProfile = async () => {
        const profilesData = await getAllProfiles();
        setProfiles(profilesData);
    }
    const getTweets = async () => {
        const tweetsData = await getAllTweets();
        setTweets(tweetsData);
    }
    const handleDelete = async (id) => {
        const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
        setTweets(updatedTweets);
        await deleteTweet(id);
        await getTweets();
        alert("You have deleted a Tweet!");
    }
    const renderProfile = () => {
        let id = props.match.params.id;
        const userProfile = profiles.filter(profile => profile.userId == id);
        
            if (userProfile.length == 0) {
                return (
                    <div className="w-75">
                        <div id="profile-image">
                        {/* <img className="profile-image" 
                            src="https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" /> */}
                        </div>
                        {localStorage.getItem('userId') == id ? (
                            <Link to={{ pathname: '/dashboard/user/upload' }}>
                                <button className="btn btn-primary font-weight-bold m-2">Create Profile</button>
                            </Link> 
                            ) : (
                                ""
                            )}
                    </div>
                );
            } 
            else {
            return userProfile.map((profile) => (
                    <div className="user-profile" key={profile.id}>
                        <div>
                            <UserImage id={props.match.params.id} name={props.match.params.name} />
                            <h3>{props.match.params.name}</h3>
                            <p className="font-weight-normal h4">{profile.bio}</p>
                            <br />
                            <p className="text-secondary font-weight-normal">
                                {profile.location === null ? ("") : (

                                    <span className="mr-3"><span className="glyphicon glyphicon-map-marker"></span>{profile.location}</span>
                                )}
                                {profile.website === null ?( "" ): (
                                    <span className="glyphicon glyphicon-link mr-3"><a href={profile.website} target="_blank">{profile.website}</a></span>
                                )}
                                <FaBirthdayCake /> Born{' '}
              {dateFormat(profile.birthdate.replace(/-/g, '\/'), 'mmm dS, yyyy')}
                                <span className="ml-3 glyphicon glyphicon-calendar"></span> Joined{' '}
              {dateFormat(props.createdAt, 'mmmm yyyy')}</p>
                        </div>
                        {localStorage.getItem('userId') == id ? (
                            <Link to={{
                                pathname: `/user/${this.props.name}/${id}/update`,
                                state: {
                                    editProfile: profile.bio,
                                    editLocation: profile.location,
                                    editWebsite: profile.website,
                                    editBirthdate: profile.birthdate
                                },
                            }}><button className="btn btn-primary font-weight-bold m-2">Edit Profile</button></Link>
                        ) : (
                            ""
                        )}
                    </div>
            ));           
            }
        
    };
    const renderTweets = () => {
        let id = props.match.params.id
        const userTweets = tweets.filter(tweet => tweet.userId == id);
        const sortTweets = userTweets.sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
            // return sortTweets.map(tweet => {
                // const imageUrl = (tweet.user.image == null) ? 'https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg' : tweet.user.image.url
                return (
                    <div className="mx-auto max-w-2xl">
                        {sortTweets.map(tweet => (
                            <div className="bg-white border border-gray-300 p-4 rounded mb-4" key={tweet.id}>
                        <div className="flex items-center">
                         {/* <img className="tweet-image w-12 h-12 rounded-full" src={imageUrl} /> */}
                         <div id="tweet-container" className="ml-4">
                            <p className="text-dark font-bold">{tweet.user.name}</p>
                            <p className="user-tweet-date text-secondary font-normal">
                                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                            <p className="font-normal">{tweet.tweet}</p>
                            </div>
                        </div>
                            {localStorage.getItem('userId') == tweet.userId && (
                                <div className="mt-2">
                                <Link to={{
                                        pathname: `/dashboard/tweet/${tweet.id}/update`,
                                        state: { editTweet: tweet.tweet }
                                    }}>
                                        <span className="text-blue-500 cursor-pointer">Edit</span>
                                    </Link>
                                    <button onClick={() => handleDelete(tweet.id)}>
                                        <span className="ml-2 text-red-500 cursor-pointer">Delete</span>
                                    </button>
                                </div> 
                            )}
                        </div>
                        ))}
                    </div>
                );
    };
        return (
            <div className="user-profile-container">
                <div>{renderProfile()}</div>
                <div>{renderTweets()}</div>
            </div>
        );
};

export default UsersProfilesAndTweets
