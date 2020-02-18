import React from 'react'
import {getAllTweets, getOneProfile} from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweets: [],
            profile: {}
        }
    }
    async componentDidMount () {
        await this.getTweets()
        await this.getProfile()
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({tweets})
    }
    getProfile = async () => {
        const profile = await getOneProfile()
        this.setState({profile})
    }
    renderTweets = () => {
        return this.state.tweets.map(tweet => {
            if (this.props.location.state.userId === (tweet.userId) ) {
                return (
                    <div key={tweet.userId}>{tweet.tweet}</div>
                )
            }
        })
    }
    renderProfile = () => {
        const {profile} = this.state
        if (this.props.location.state.userId === (profile.userId) ) {
            return (
                <div key={profile.userId}>
                    <img src={profile.photo} alt=""></img>
                    <h3>{profile.bio}</h3>
                </div>
            )
        }
    }
    render(){
        return (
            <div>
                <p>Users Profile and Tweets</p>
                <div>{this.renderProfile()}</div>
                <div>{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets