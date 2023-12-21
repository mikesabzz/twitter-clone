import React, {useState, useEffect} from 'react'
import { getAllTweets, getAllProfiles, deleteTweet } from '../../services/apiService'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { FaBirthdayCake } from 'react-icons/fa'
import UserImage from './UserImage'

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
        // alert("You have deleted a Tweet!");
    }
    const renderProfile = () => {
        let id = props.match.params.id;
        const userProfile = profiles.filter(profile => profile.userId == id);
        
            if (userProfile.length == 0) {
                return (
                    <div className="w-75">
                        <div>
                        {/* <img src="https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" /> */}
                        </div>
                        {localStorage.getItem('userId') == id ? (
                            // <Link to={{ pathname: '/dashboard/user/upload' }}>
                            //     <button className="btn btn-primary font-weight-bold m-2">Create Profile</button>
                            // </Link> 
                            
                            //Temporary Link to create profile until upload photo is working
                            <Link to={{ pathname: '/dashboard/user/create' }}>
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
                    <div className="flex flex-col sm:flex-row items-start justify-between bg-white border border-gray-300 p-4 rounded mb-4" key={profile.id}>
                        <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-4">
                            <UserImage id={props.match.params.id} name={props.match.params.name} />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold">{props.match.params.name}</h3>
                            <p className="font-weight-normal text-lg">{profile.bio}</p>
                            <br />
                            <p className="text-secondary font-weight-normal">
                                {profile.location === null ? ("") : (
                                    <span className="mr-3"><span className="glyphicon glyphicon-map-marker"></span>{profile.location}</span>
                                )}
                                {profile.website === null ?( "" ): (
                                    <span className="glyphicon glyphicon-link mr-3"><a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></span>
                                )}
                                <FaBirthdayCake /> Born{' '}{dateFormat(profile.birthdate.replace(/-/g, '\/'), 'mmm dS, yyyy')}
                                <span className="ml-3 glyphicon glyphicon-calendar"></span> Joined{' '}{dateFormat(props.createdAt, 'mmmm yyyy')}</p>
                        </div>
                        {localStorage.getItem('userId') == id ? (
                            <Link to={{
                                pathname: `/user/${props.name}/${id}/update`,
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
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            // return sortTweets.map(tweet => {
                // const imageUrl = (tweet.user.image == null) ? 'https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg' : tweet.user.image.url
                return (
                    <div className="mx-auto">
                        {sortTweets.map(tweet => (
                            <div className="bg-white border border-gray-300 p-4 rounded mb-4 relative" key={tweet.id}>
                        <div className="flex items-start">
                         {/* <img className="tweet-image w-12 h-12 rounded-full" src={imageUrl} /> */}
                         <div className="ml-4 flex-grow">
                            <p className="text-dark font-bold">{tweet.user.name}</p>
                            <p className="font-normal">{tweet.tweet}</p>
                        </div>
                        <div className="text-secondary text-right">
                        <p className="text-secondary font-normal">
                                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                                </div>
                        </div>
                            {localStorage.getItem('userId') == tweet.userId && (
                                <div className="absolute bottom-0 right-0 mb-2 mr-2">
                                <Link to={{
                                        pathname: `/dashboard/tweet/${tweet.id}/update`,
                                        state: { editTweet: tweet.tweet }
                                    }}>
                                        <span className="text-blue-500 cursor-pointer mr-2">Edit</span>
                                    </Link>
                                    <button onClick={() => handleDelete(tweet.id)}>
                                        <span className="text-red-500 cursor-pointer">Delete</span>
                                    </button>
                                </div> 
                            )}
                        </div>
                        ))}
                    </div>
                );
    };
        return (
            <div>
                <div>{renderProfile()}</div>
                <div>{renderTweets()}</div>
            </div>
        );
};

export default UsersProfilesAndTweets
