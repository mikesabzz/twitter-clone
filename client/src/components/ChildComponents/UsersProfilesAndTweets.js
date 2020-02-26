import React from 'react'
import { getAllTweets, getAllProfiles } from '../../services/apiService'
import dateFormat from 'dateformat'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            profiles: [],
            tweets: []
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
                                <p>{profile.bio}</p>
                            </div> :
                            <div></div>
                        }
                    </div>
                )
            })
        }
    }
    renderTweets = () => {
        let id = this.props.match.params.id
        if (this.state.tweets) {
            return this.state.tweets.map(tweet => {
                return (
                    <div key={tweet.id}>
                        {tweet.userId == id ? 
                        <div className="border border-dark">
                            <p className="text-danger">{this.props.location.state.names.name}</p>
                            <p className="text-success">{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
                            <p>{tweet.tweet}</p>
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
                <h3>{this.props.location.state.names.name}</h3>
                <div>{this.renderProfile()}</div>
                <div className="border border-dark">{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
