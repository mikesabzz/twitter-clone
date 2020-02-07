import React from 'react'
import { getAllTweets } from '../../services/apiService'

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
            console.log(tweets)
            return tweets.map(tweet => {
                return (
                    <div key={tweet.userId}>
                        <p>{tweet.tweet}</p>
                        <p>{tweet.createdAt}</p>
                    </div>
                )
            })
        }
    }
    
    render() {
        return (
            <div>
                <h1>Tweets</h1>
                <div>{this.renderTweets()}</div>
            </div>
        )
    }
}
export default Tweets