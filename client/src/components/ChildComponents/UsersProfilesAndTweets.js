import React from 'react'
import { getAllTweets, getAllProfiles, deleteTweet } from '../../services/apiService'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { FaBirthdayCake } from 'react-icons/fa'
import UserImage from './UserImage'
import './styles.css'

class UsersProfilesAndTweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tweets: [],
        }
    }
    componentDidMount = async () => {
        await this.getTweets()
        await this.getProfile()
    }
    getProfile = async () => {
        const profiles = await getAllProfiles()
        this.setState({ profiles })
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({ tweets })
    }
    handleDelete = async (id) => {
        this.state.tweets.splice(id, 1)
        await deleteTweet(id);
        await this.getTweets()
        alert("You have deleted a Tweet!")
    }
    renderProfile = () => {
        let id = this.props.match.params.id
        const { profiles } = this.state
            const userProfile = profiles.filter(profile => profile.userId == id)
            if (userProfile.length == 0) {
                return (
                    <div className="w-75">
                        <div id="profile-image">
                        <img className="profile-image" 
                            src="https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg" />
                        </div>
                        {localStorage.getItem('userId') == id ?
                            <Link to={{ pathname: '/dashboard/user/create' }}>
                                <button className="btn btn-primary font-weight-bold m-2">Create Profile</button>
                            </Link> : ""
                        }
                    </div>
                )
            } else {
            return userProfile.map(profile => {
                return (
                    <div className="user-profile" key={profile.id}>
                        <div>
                            <UserImage id={this.props.match.params.id} name={this.props.match.params.name} />
                            <h3>{this.props.match.params.name}</h3>
                            <p className="font-weight-normal h4">{profile.bio}</p>
                            <br />
                            <p className="text-secondary font-weight-normal">
                                {profile.location === null ? "" :
                                    <span className="mr-3"><span className="glyphicon glyphicon-map-marker"></span>{profile.location}</span>}
                                {profile.website === null ? "" :
                                    <span className="glyphicon glyphicon-link mr-3"><a href={profile.website} target="_blank">{profile.website}</a></span>}
                                <FaBirthdayCake /> Born {dateFormat(profile.birthdate.replace(/-/g, '\/'), "mmm dS, yyyy")}
                                <span className="ml-3 glyphicon glyphicon-calendar"></span> Joined {dateFormat(this.props.createdAt, "mmmm yyyy")}</p>
                        </div>
                        {localStorage.getItem('userId') == id ?
                            <Link to={{
                                pathname: `/user/${this.props.name}/${id}/update`,
                                state: {
                                    editProfile: profile.bio,
                                    editLocation: profile.location,
                                    editWebsite: profile.website,
                                    editBirthdate: profile.birthdate
                                }
                            }}><button className="btn btn-primary font-weight-bold m-2">Edit Profile</button></Link> : ""
                        }
                    </div>
                )           
            })  
        } 
    }
    renderTweets = () => {
        let id = this.props.match.params.id
        if (this.state.tweets) {
            const userTweets = this.state.tweets.filter(tweet => tweet.userId == id)
            const sortTweets = userTweets.sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            })
            return sortTweets.map(tweet => {
                const imageUrl = (tweet.user.image == null) ? 'https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg' : tweet.user.image.url
                return (
                    <div className="tweet-box" key={tweet.id}>
                        <img className="tweet-image" src={imageUrl} />
                        <div id="tweet-container">
                            <p className="text-dark h4 font-weight-bold">{tweet.user.name}</p>
                            <p className="user-tweet-date text-secondary font-weight-normal pull-right">
                                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                            <p className="font-weight-normal">{tweet.tweet}</p>
                        </div>
                            {localStorage.getItem('userId') == tweet.userId ?
                                <div className="tweet-edit-delete-button">
                                <Link to={{
                                        pathname: `/dashboard/tweet/${tweet.id}/update`,
                                        state: { editTweet: tweet.tweet }
                                    }}>
                                        <span className="glyphicon glyphicon-edit"></span>
                                    </Link>
                                    <button onClick={() => this.handleDelete(tweet.id)}>
                                        <span className="text-danger glyphicon glyphicon-trash"></span>
                                    </button>
                                </div> : ""
                            }
                        </div>
                        
                    
                )
            })
        }
    }
    render() {
        return (
            <div className="user-profile-container">
                <div>{this.renderProfile()}</div>
                <div>{this.renderTweets().reverse()}</div>
            </div>
        )
    }
}

export default UsersProfilesAndTweets
