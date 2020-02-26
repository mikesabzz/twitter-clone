import React from 'react'
import { getAllTweets, getOneProfile } from '../../services/apiService'
import dateFormat from 'dateformat'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            profile: {},
            tweets: []
        }
    }
    componentDidMount = async () => {
        await this.getTweets()
        await this.getProfile()
    }
    getProfile = async () => {
        try {
            const profile = await getOneProfile()
            this.setState({profile})
        } catch(e){
            console.log(e)
        }
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({tweets})
    }
    renderProfile = () => {
        let id = this.props.match.params.id
        const { profile } = this.state
        if (profile.userId == id) {
            return (
                <div key={profile.userId}>
                    <img src={profile.photo} alt=""></img>
                    <p>{profile.bio}</p>
                </div>
            )
        }
    }
    renderTweets = () => {
        let id = this.props.match.params.id
        if (this.state.tweets) {
            return this.state.tweets.map(tweet => {
                return (
                    <div key={tweet.id}>
                        {tweet.userId == id ? 
                        <div>
                            <p>{this.props.location.state.names.name}</p>
                            <p>{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
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
                <p>{this.props.location.state.names.name}'s Profile and Tweets</p>
                <div>{this.renderProfile()}</div>
                <div className="border border-dark">{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
