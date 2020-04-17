import React from 'react'

class FileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            file: '',
            setFile: '',
            filename: 'Choose File',
            setFilename: ''
        }
    }
    onChange = e => {
        this.setState({file:this.state.setFile})
        this.ListeningStateChangedEvent({filename:this.state.setFilename})
        this.state.setFile(e.target.files[0])
        this.state.setFilename(e.target.files[0].name)
    }
    render () {
        return (
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
        <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
                <input type="submit" value="Upload" className="btn btn-primary btn-block" />
            </div>
        )
    }
}

export default FileUpload