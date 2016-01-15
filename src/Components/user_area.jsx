import React, { Component } from 'react';
import Constants from '../constants.jsx';

// prop:
//      user: { id: 0, name: 'Self', stream: null }
class UserArea extends Component {

    constructor(props) {
        super(props);

        this.currentStreamRender = 0;

        this.attachStream = this.attachStream.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.renderStatusMsg = this.renderStatusMsg.bind(this);
        this.videoId = this.videoId.bind(this);
    }

    // a method instead of a property because it needs to be dynamic
    videoId() {
        return 'video' + this.props.user.id;
    }

    attachStream() {

        const { stream, updatedStreamRender } = this.props.user;

        if (stream !== null &&
            updatedStreamRender > this.currentStreamRender)
        {
            console.log('Attaching stream...');

            window.attachMediaStream(
                document.getElementById(this.videoId()),
                stream
            );

            this.currentStreamRender += 1;
        }
    }

    componentDidMount() {
        console.log('Component (UserArea) did mount.');

        this.attachStream();
    }

    componentDidUpdate() {
        console.log('Component (UserArea) did update.');

        this.attachStream();
    }

    renderStatusMsg() {

        const { stream, id, error } = this.props.user;

        var res = '';

        if (stream === null && id === Constants.SelfId)
        {
            res += 'Share your camera and microphone to participate in the call.';
        }
        else if (error)
        {
            res += 'Stream could not be established.';
        }
        else if (stream === null)
        {
            res += 'Joining...';
        }

        return <p>{res}</p>;
    }

    renderVideo() {

        const { stream, id, error } = this.props.user;

        if (stream !== null && !error)
        {
            // mute self to avoid sound feedback
            if (id == Constants.SelfId)
                return <video id={this.videoId()} autoPlay muted />;
            else
                return <video id={this.videoId()} autoPlay />;
        }
    }

    render() {

        return (
            <div>
                <ul>
                    <li>User ID: {this.props.user.id}</li>
                    <li>User Name: {this.props.user.name}</li>
                    <li>User Stream: { this.props.user.stream === null ? 'null' : 'available' }</li>
                </ul>

                { this.renderStatusMsg() }
                { this.renderVideo() }

            </div>
        );
    }
}

export default UserArea;