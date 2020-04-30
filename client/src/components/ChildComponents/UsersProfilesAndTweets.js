import React from 'react'
import { getAllTweets, getAllProfiles, deleteTweet } from '../../services/apiService'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'
import { FaBirthdayCake } from 'react-icons/fa'
import UserImage from './UserImage'

class UsersProfilesAndTweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: [],
            tweets: [],
            deleted: false,
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
        await deleteTweet(id);
        this.setState({ deleted: true })
    }
    renderProfile = () => {
        let id = this.props.match.params.id
        const { profiles } = this.state
        if (profiles) {
            const userProfile = profiles.filter(profile => profile.userId == id)
            return userProfile.map(profile => {
                return (
                    <div key={profile.id}>
                        <div>
                            <img src={profile.photo} alt=""></img>
                            <h3>{this.props.match.params.name}</h3>
                            <p className="font-weight-normal">{profile.bio}</p>
                            <br />
                            <p className="text-secondary font-weight-normal">
                                {profile.location === null ? "" :
                                    <span><span className="glyphicon glyphicon-map-marker"></span>{profile.location}</span>}
                                {profile.website === null ? "" :
                                    <span className="glyphicon glyphicon-link"><a href={profile.website} target="_blank">{profile.website}</a></span>}
                                <FaBirthdayCake /> Born {dateFormat(profile.birthdate, "mmmm dS, yyyy")}
                                    <span className="glyphicon glyphicon-calendar"></span> Joined {dateFormat(this.props.createdAt, "mmmm yyyy")}</p>
                        </div>
                        {localStorage.getItem('userId') == id && localStorage.getItem('userId') == profile.id ?
                            <button><Link to={{
                                pathname: `/user/${this.props.name}/${id}/update`,
                                state: {
                                    editProfile: profile.bio,
                                    editLocation: profile.location,
                                    editWebsite: profile.website,
                                    editBirthdate: profile.birthdate
                                }
                            }}>Edit</Link>
                            </button> :
                            ""
                        }
                    </div>
                )
            })
        }
    }
    renderTweets = () => {
        if (this.state.deleted) {
            return window.location.reload()
        }
        let id = this.props.match.params.id
        if (this.state.tweets) {
            const userTweets = this.state.tweets.filter(tweet => tweet.userId == id)
            const sortTweets = userTweets.sort((a,b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            })
            return sortTweets.map(tweet => {
                return (
                    <div key={tweet.id}>
                        <div className="border border-dark">
                            <p>{this.props.match.params.name}</p>
                            <p className="text-secondary font-weight-normal">{dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                            <p className="font-weight-normal">{tweet.tweet}</p>
                            {localStorage.getItem('userId') == tweet.userId ?
                                <div>
                                    <button><Link to={{ pathname: `/dashboard/tweet/${tweet.id}/update`, state: { editTweet: tweet.tweet } }}>Edit</Link></button>
                                    <button onClick={() => this.handleDelete(tweet.id)}>Delete</button></div> : ""}
                                </div>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <UserImage userId={this.props.match.params.id} />
                <div>{this.renderProfile()}</div>
                <div className="border border-dark">{this.renderTweets().reverse()}</div>
            </div>
        )
    }
}

export default UsersProfilesAndTweets
