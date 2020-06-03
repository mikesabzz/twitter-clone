import React from 'react'
import { getAllTweets } from '../../services/apiService'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import CreateTweets from '../CreateComponents/CreateTweets'
import './styles.css'

class Tweets extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            deleted: false
        }
    }

    async componentDidMount() {
        await this.getTweets()
    }
    getTweets = async () => {
        try {
            const tweets = await getAllTweets()
            this.setState({ tweets })
        } catch (e) {
            console.error(e)
        }
    }

    renderTweets = () => {
        const { tweets } = this.state
        const sortTweets = tweets.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        });

        return sortTweets.map(tweet => {
            const imageUrl = (tweet.user.image == null) ? "https://res.cloudinary.com/mikesabz/image/upload/v1591122453/s1xym1lgmc0npdrczfhs.jpg" : tweet.user.image.url
            return <div className="tweet-box" key={tweet.id}>
                <img className="tweet-image" src={imageUrl} />
                <div id="tweet-container">
                    <Link to={{ pathname: `/dashboard/user/${tweet.user.name}/${tweet.user.id}`, state: { names: tweet.user.name } }}
                        className="text-dark h4 font-weight-bold">
                        {tweet.user.name}
                    </Link>
                    <p className="tweet-date text-secondary font-weight-normal pull-right">
                        {dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                    <div className="font-weight-normal">{tweet.tweet}</div>
                </div>
                {localStorage.getItem('userId') == tweet.userId ?
                    <div className="tweet-edit-button">
                        <Link to={{
                            pathname: `/dashboard/tweet/${tweet.id}/update`,
                            state: { editTweet: tweet.tweet }
                        }}>
                            <span className="glyphicon glyphicon-edit"></span></Link>
                    </div> : ""
                }
            </div>
        })
    }

    render() {
        return (
            <div className="tweet-data">
                <h1>Tweets</h1>
                <CreateTweets {...this.props} />
                <div>{this.renderTweets().reverse()}</div>
            </div>
        )
    }
}
export default Tweets