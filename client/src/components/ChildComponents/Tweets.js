import React from 'react'
import { 
    getAllTweets, 
    getUserNames, 
    deleteTweet, 
    getImages 
} from '../../services/apiService'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import CreateTweets from '../CreateComponents/CreateTweets'
import './styles.css'

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
        await this.getImage()
    }
    getTweets = async () => {
        try {
            const tweets = await getAllTweets()
            this.setState({ tweets })
        } catch (e) {
            console.error(e)
        }
    }
    getUser = async () => {
        const names = await getUserNames()
        this.setState({ names })
    }
    getImage = async () => {
        const photo = await getImages()
        this.setState({ photo })
    }
    handleDelete = async (id) => {
        await deleteTweet(id);
        this.setState({ deleted: true })
    }

    renderTweets = () => {
        if (this.state.deleted) {
            return window.location.reload()
        }
        const { tweets, names, photo } = this.state
        const sortTweets = tweets.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        });

        return sortTweets.map(tweet => {
            return names.map(name => {
                return photo.map(img => {                
                if ((name.id == tweet.userId) && (name.id == img.userId)) {
                    return <div className="tweet-box" key={tweet.id}>
                        <img className="tweet-image" src={window.location.origin + `/uploads/${img.poster}`} />
                        <div id="tweet-container">
                        <Link to={{ pathname: `/dashboard/user/${name.name}/${name.id}`, state: { names: name } }} 
                            className="text-dark h4 font-weight-bold">
                                {name.name}
                        </Link>
                        <p className="tweet-date text-secondary font-weight-normal pull-right">
                                {dateFormat(tweet.createdAt, "mmm dd, yyyy")}</p>
                        <div className="font-weight-normal">{tweet.tweet}</div>
                        </div>
                        {localStorage.getItem('userId') == tweet.userId ?
                            <div className="tweet-edit-delete-button">
                                <button><Link to={{ pathname: `/dashboard/tweet/${tweet.id}/update`, state: { editTweet: tweet.tweet } }}>
                                    <span className="glyphicon glyphicon-edit"></span></Link>
                                </button>
                                <button onClick={() => this.handleDelete(tweet.id)}><span className="glyphicon glyphicon-trash"></span></button></div> : ""
                        }
                    </div>
                }
            })
            })
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