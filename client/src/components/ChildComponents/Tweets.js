import React from 'react'
import { getAllTweets } from '../../services/apiService'
import { getUserNames } from '../../services/apiService'
import dateFormat from 'dateformat'

class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            names: []
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
        const names = await getUserNames()
        this.setState({names})
    }
    matchUserToTweets = () => {
        try {
            const { tweets } = this.state
            const { names } = this.state
            return tweets.map(tweet => {
                return names.map(name => {
                    return (
                        <div key={tweet.userId}>
                            {tweet.userId === name.id ? name.name : ""}
                        </div>)
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    renderTweets = () => {
        const { tweets } = this.state
        if (tweets) {
            return tweets.map(tweet => {
                    return (
                        <div className="border border-dark" key={tweet.id}>
                            <p>{this.matchUserToTweets()} {dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
                            <p>{tweet.tweet}</p>
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