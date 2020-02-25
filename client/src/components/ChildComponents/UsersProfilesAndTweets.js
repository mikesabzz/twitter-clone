import React from 'react'
import axios from 'axios'
import { getOneTweet } from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweets: {}
        }
    }
    async componentDidMount () {
        await this.getTweets()
    }
    getTweets = async () => {
        const tweets = await getOneTweet()
        this.setState({tweets})
    }
    renderTweets = () => {
        console.log(this.props.location.state)
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
