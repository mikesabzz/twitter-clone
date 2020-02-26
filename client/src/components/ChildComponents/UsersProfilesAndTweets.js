import React from 'react'
import axios from 'axios'
import { getOneTweet } from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    // constructor(props){
    //     super(props)
        state = {
            tweets: ""
        }
    // }
    componentDidMount = async () => {
        let id = this.props.match.params.id
        let tweets = await axios.get(`/app/tweets/${id}`)
        console.log("tweets", tweets.data)
        this.setState({tweets: tweets.data})
    }
    render() {
        const {tweet} = this.state.tweets
        return (
            <div>
                <p>Users Profile and Tweets</p>
                <p>{tweet}</p>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
