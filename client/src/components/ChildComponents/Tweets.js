import React from 'react'
import { getAllTweets, getAllProfiles } from '../../services/apiService'
import { getUserNames, deleteTweet } from '../../services/apiService'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import CreateTweets from '../CreateComponents/CreateTweets'

class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            names: [],
            photo: [],
            deleted: false
        }
    }

    async componentDidMount() {
        await this.getTweets()
        await this.getUser()
        await this.getProfile()
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
    getProfile = async () => {
        const photo = await getAllProfiles()
        this.setState({photo})
    }
    handleDelete = async (id) => {
        await deleteTweet(id);
        this.setState({deleted: true})
    }
   
    renderTweets = () => {
        if (this.state.deleted) {
            return window.location.reload()
        }
        const { tweets } = this.state
        const { names } = this.state
        // console.log(this.state.photo)
        return tweets.map(tweet => {
            return names.map(name => {
                if (name.id === tweet.userId) {
                    return <div className="border border-dark" key={tweet.id}>
                        <Link to={{ pathname: `/user/${name.name}/${name.id}`, state: { names: name } }} className="text-dark">{name.name}</Link>
                        <p className="text-secondary font-weight-normal">{dateFormat(tweet.createdAt, "mmmm dS, yyyy")}</p>
                        <div className="font-weight-normal">{tweet.tweet}</div>
                        {localStorage.getItem('userId') == tweet.userId ?
                            <button onClick={() => this.handleDelete(tweet.id)}>Delete</button> : <div></div>
                        }
                    </div>
                }
            })
        })
    }

    
    render() {
        return (
            <div>
                <h1>Tweets</h1>
                <CreateTweets {...this.props} />
                <div>{this.renderTweets().reverse()}</div>
            </div>
        )
    }
}
export default Tweets