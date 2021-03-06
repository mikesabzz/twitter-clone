import React from 'react'
import { Link } from 'react-router-dom'
import { getImages } from '../../services/apiService'

class UserImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: [],
            userId: this.props.id
        }
    }
    componentDidMount = async () => {
        await this.getImage()
    }
    getImage = async () => {
        const image = await getImages()
        this.setState({ image }) 
    }

    renderImage = () => {
        const { image, userId } = this.state
        const userImage = image.filter(poster => poster.userId == userId)
        if (userImage.length == 0) {
            return (
                <div key={image.id} id="profile-image">
                    <img className="profile-image"
                        src="https://res.cloudinary.com/mikesabz/image/upload/v1589940574/iu3kvrmdpvpw1lp0aoru.jpg"
                    />
                </div>
            )
        }
        else {
            return userImage.map(image => {
                console.log(image)
                return (
                    <div key={image.id} id="profile-image">
                        <img className="profile-image"
                            src={image.url}
                        />
                        {localStorage.getItem('userId') == this.state.userId ?
                            <Link to={{ pathname: `/user/upload/${this.props.name}/${this.state.userId}/edit`, 
                                state: {imageId: image.id} }}>
                                <button className="btn btn-outline-light font-weight-bold">Edit Image</button>
                            </Link>
                            
                            : ""
                        }
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>{this.renderImage()}</div>
        )
    }
}

export default UserImage