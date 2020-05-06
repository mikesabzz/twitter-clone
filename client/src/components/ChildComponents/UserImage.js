import React from 'react'
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
        if (image) {
            return image.filter(poster => poster.userId == userId)
                .map(image => {
                    return (
                        <div key={image.id}>
                            <img className="w-25 p-3 rounded-circle"
                                src={window.location.origin + `/uploads/${image.poster}`}
                            />
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