import React from 'react'
import { getAllTweets, getAllProfiles, deleteTweet } from '../../services/apiService'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
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
        this.setState({profiles})
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({tweets})
    }
    handleDelete = async (id) => {
        await deleteTweet(id);
        this.setState({deleted: true})
    }
    renderProfile = () => {
        let id = this.props.match.params.id
        const { profiles } = this.state
        if (profiles) {
            return profiles.map(profile => {
                return (
                    <div key={profile.id}>
                        {profile.userId == id ?
                            <div>
                                <img src={profile.photo} alt=""></img>
                                <h3>{this.props.match.params.name}</h3>
                                <p className="font-weight-normal">{profile.bio}</p>
                            </div> : <div></div>
                        }
                        {localStorage.getItem('userId') == id && localStorage.getItem('userId') == profile.id ?
                            <button><Link to={{pathname: `/user/${this.props.name}/${id}/update`, state: { editProfile: profile.bio }}}>Edit</Link></button> :
                            ""
                        }
                    </div>
                )
            })
        }
    }
    renderTweets = () => {
        if (this.state.deleted){
            return window.location.reload()
        }
        let id = this.props.match.params.id
        if (this.state.tweets) {
            return this.state.tweets.map(tweet => {
                return (
                    <div key={tweet.id}>
                        {tweet.userId == id ? 
                        <div className="border border-dark">
                            <p>{this.props.match.params.name}</p>
                            <p className="text-secondary font-weight-normal">{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
                            <p className="font-weight-normal">{tweet.tweet}</p>
                            {localStorage.getItem('userId') == tweet.userId ?
                            <div>
                            <button><Link to={{pathname:`/dashboard/tweet/${tweet.id}/update`, state: {editTweet: tweet.tweet } }}>Edit</Link></button>
                            <button onClick={() => this.handleDelete(tweet.id)}>Delete</button></div> : "" }
                        </div> : 
                        <div></div>
                        }
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <div>{this.renderProfile()}</div>
                <div className="border border-dark">{this.renderTweets().reverse()}</div>
            </div>
        )
    }
}

export default UsersProfilesAndTweets
