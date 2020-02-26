import React from 'react'
import { getAllTweets } from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweets: []
        }
    }
    componentDidMount = async () => {
        await this.getTweets()
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({tweets})
    }
    renderTweets = () => {
        let id = this.props.match.params.id
        if (this.state.tweets) {
            return this.state.tweets.forEach(tweet => {
                console.log(tweet)
                    <div>
                        {tweet.tweet}
                    </div>
                
            })
        }

    }
    render() {
        return (
            <div>
                <p>Users Profile and Tweets</p>
                <div>{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
