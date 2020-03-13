import React from 'react'
import {editTweet} from '../../services/apiService'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class UpdateTweets extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            tweetId: this.props.match.params.id,
            updated: false
        }
    }
    handleUpdate = (e) => {
        const element = e.target
        const {name, value} = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, name, tweet } = this.state
        const tweets = { userId, name, tweet}
        const id = this.state.tweetId
        await editTweet(id, tweets)
        this.setState({updated: true})
    }
    render(){     
        if (this.state.updated){
            return <Redirect to='/dashboard/tweets' />
        }
        return (
            <div>Update
                <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
                    <label htmlFor="tweet">Whats happening?</label>
                    <br />
                    <textarea name="tweet" defaultValue={this.props.location.state.editTweet}></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UpdateTweets