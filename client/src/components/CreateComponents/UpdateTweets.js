import React from 'react'
import { Redirect } from 'react-router-dom'
import { editTweet } from '../../services/apiService'
import './styles.css'

class UpdateTweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweetId: this.props.match.params.id,
            updated: false
        }
    }
    handleUpdate = (e) => {
        const element = e.target
        const { name, value } = element
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const { userId, name, tweet } = this.state
        const tweets = { userId, name, tweet }
        const id = this.state.tweetId
        await editTweet(id, tweets)
        this.setState({ updated: true })
    }
    render() {
        if (this.state.updated) {
            return <Redirect to={`/dashboard/user/${this.props.user.name}/${this.props.user.id}`} />
        }
        return (
            <div className="edit-tweet-container">
                <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
                    <label htmlFor="tweet">Edit Tweet</label>
                    <br />
                    <textarea name="tweet" defaultValue={this.props.location.state.editTweet}></textarea>
                    <br />
                    <button className="btn btn-primary font-weight-bold">Save</button>
                </form>
            </div>
        )
    }
}

export default UpdateTweets