import React from 'react'
import getOneTweet from '../../services/apiService'

const UsersProfilesAndTweets = (props) => {

    const renderTweets = () => {
        if (props.location.state) {
            return props.location.state.tweets.map(tweet => {
                return (
                    <div>{tweet.tweet}</div>
                )
            })
        }
    }
    return (
        <div>
            <p>Users Profile and Tweets</p>
            <div>{renderTweets()}</div>
        </div>
    )

}

export default UsersProfilesAndTweets