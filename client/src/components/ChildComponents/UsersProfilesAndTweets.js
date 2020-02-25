import React from 'react'
import axios from 'axios'
import { getOneTweet } from '../../services/apiService'

class UsersProfilesAndTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: ""
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id
        axios(`/app/tweets/${id}`).then(res => {return this.setState({data: res.data})})
    }
    render = () => {
        return (
            <div>
                <p>Users Profile and Tweets</p>
                <div>{this.state.data}</div>
            </div>
        )
    }

}

export default UsersProfilesAndTweets
