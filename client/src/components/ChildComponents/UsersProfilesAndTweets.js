import React from 'react'
import axios from 'axios'
import { getOneTweet } from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweets: ""
        }
    }
    async componentDidMount () {
        await this.getTweets()
    }
    getTweets = async () => {
        let id = this.props.match.params.id
        axios(`/app/tweets/${id}`)
            .then(response => {
                return this.setState({tweets: response.tweets})
            })
    }
    renderTweets = () => {
        if (this.state.tweets){
            console.log(this.state.tweets)
        }
    }
    render = () => {
        return (
            <div>
                <p>Users Profile and Tweets</p>
                <div>{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets