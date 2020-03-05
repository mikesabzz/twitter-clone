import React from 'react'
import { createTweets } from '../../services/apiService'
import { Redirect } from 'react-router-dom'

class CreateTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            created: false,
            name: '',
            userId: this.props.user.id
        }
    }
    handleChange = (event) => {
        const currentElement = event.target
        const { name, value } = currentElement
        const newState = {}
        newState[name] = value
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { userId, name, tweet } = this.state
        const tweets = { userId, name, tweet }
        await createTweets(tweets)
        this.setState({created: true})
    }
    render(){
        if (this.state.created) {
            return <Redirect to='/dashboard'></Redirect>
        }
        return (
            <div>
                <form onChange={this.handleChange}>
                    <label htmlFor="tweet">Whats happening?</label>
                    <br />
                    <textarea name="tweet" type="text" />
                    <button onSubmit={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateTweets