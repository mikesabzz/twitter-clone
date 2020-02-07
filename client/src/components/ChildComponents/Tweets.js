import React from 'react'
import { getAllTweets } from '../../services/apiService'
import dateFormat from 'dateformat'

class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }

    async componentDidMount() {
        await this.getTweets()
    }
    getTweets = async () => {
        try {
        const tweets = await getAllTweets()
        this.setState({tweets})
        } catch(e){
            console.error(e)
        }
    }
    renderTweets = () => {
        const {tweets}=this.state
        if(tweets){
            return tweets.map(tweet => {
                return (
                    <div key={tweet.userId}>
                        <p>{tweet.tweet}</p>
                        <p>{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
                    </div>
                )
            })
        }
    }
    
    render() {
        return (
            <div>
                <h1>Tweets</h1>
                <div className="border border-dark">{this.renderTweets()}</div>
            </div>
        )
    }
}
export default Tweets