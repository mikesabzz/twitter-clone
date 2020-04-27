import React from 'react'
// import { getOneUpload } from '../../services/apiService'


class UserImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: {},
            poster: ''
        }
    }
    // componentDidMount = async () => {
    //     await this.getImage()
    // }
    // getImage = async () => {
    //     const image = await getOneUpload()
    //     this.setState({ image })
        
    // }
    renderImage = () => {
        const { image } = this.state
        return (
            // <div key={image.id}>
            //     <img src={image.poster}
            //         onError={(e) => {
            //             e.target.onerror = null;
            //             e.target.src = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            //         }}
            //     />
            // </div>
            <div>Image</div>
        )
    }

    render() {
        return (
            <div>{this.renderImage()}</div>
        )
    }
}

export default UserImage