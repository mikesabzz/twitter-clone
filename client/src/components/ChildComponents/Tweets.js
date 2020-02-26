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
   
    renderTweets = () => {
        const { tweets } = this.state
        const { names } = this.state
            return tweets.map(tweet => {
                return names.map(name => {
                    if (name.id === tweet.userId) {
                        return <div className="border border-dark" key={tweet.id}>
                            <div className="text-danger">{name.name}</div>
                            <div className="text-success">{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</div>
                            <div>{tweet.tweet}</div>
                        </div>
                    }
                })
            })
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