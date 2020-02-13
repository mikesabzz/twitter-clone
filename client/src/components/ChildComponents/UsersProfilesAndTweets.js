import React from 'react'
import getOneTweet from '../../services/apiService'

const UsersProfilesAndTweets = (props) => {

    const renderTweets = () => {
        console.log(props.location)
    }
    return (
        <div>{renderTweets()}</div>
    )

}

export default UsersProfilesAndTweets