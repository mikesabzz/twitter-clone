import React from 'react'
import { getAllUploads } from '../../services/apiService'

class UserImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: []
        }
    }
    componentDidMount = async () => {
        await this.getImage()
    }
    getImage = async () => {
        const image = await getAllUploads()
        this.setState({ image })
    }
    renderImage = () => {
        const id = this.props.userId
        const { image } = this.state
        if (image) {
            return image.map(img => {
                return (
                    <div key={img.id}>
                        <p>{img.name}</p>
                        <img src={img.poster} className="img-responsive" />
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