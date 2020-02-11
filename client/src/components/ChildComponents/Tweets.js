import React from 'react'
import { getAllTweets } from '../../services/apiService'
import { getOneUserName } from '../../services/apiService'
import dateFormat from 'dateformat'

class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            names: {}
        }
    }

    async componentDidMount() {
        await this.getTweets()
        await this.getUser()
    }
    getTweets = async () => {
        try {
        const tweets = await getAllTweets()
        this.setState({tweets})
        } catch(e){
            console.error(e)
        }
    }
    getUser = async () => {
        const names = await getOneUserName()
        this.setState({names})
    }
    renderTweets = () => {
        const { tweets } = this.state
        const { names } = this.state
        if (tweets) {
            return tweets.map(tweet => {
                let userName = tweet.userId === names.id 
                    return (
                        <div className="border border-dark" key={tweet.id}>
                            <div key={names.id}>{userName}</div>
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
                <div>{this.renderTweets()}</div>
            </div>
        )
    }
}
export default Tweets