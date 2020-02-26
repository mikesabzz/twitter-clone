import React from 'react'
import { getAllTweets } from '../../services/apiService'
import dateFormat from 'dateformat'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweets: []
        }
    }
    componentDidMount = async () => {
        console.log(this.props)
        await this.getTweets()
    }
    getTweets = async () => {
        const tweets = await getAllTweets()
        this.setState({tweets})
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
                <p>{this.props.location.state.names.name}'s `Profile and Tweets</p>
                <div className="border border-dark">{this.renderTweets()}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
