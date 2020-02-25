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
    componentDidMount = async () => {
        console.log("props", this.props)
        let id = this.props.match.params.id
        // let tweets = await axios.get(`app/tweets/${id}`)
        // console.log(tweets.data)
    }
    render = () => {
        return (
            <div>
                <p>Users Profile and Tweets</p>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
