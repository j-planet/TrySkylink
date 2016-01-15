import React, { Component } from 'react';
import Constants from '../constants.jsx';

// prop:
//      user: { id: 0, name: 'Self', stream: null }
class User extends Component {

    constructor(props) {
        super(props);

        this.userId = this.props.user.id;
        this.name = this.props.user.name;
        this.stream = this.props.user.stream;
        this.updatedStreamRender = this.props.user.updatedStreamRender;
        this.error = this.props.user.error;

        this.currentStreamRender = 0;
        this.videoId = 'video' + this.userId;

        this.attachStream = this.attachStream.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.renderStatusMsg = this.renderStatusMsg.bind(this);
    }


    attachStream() {
        if (this.stream !== null &&
            this.updatedStreamRender > this.currentStreamRender)
        {
            console.log('Attaching stream...');

            window.attachMediaStream(
                document.getElementById(this.videoId),
                this.stream
            );

            this.currentStreamRender += 1;
        }
    }

    componentDidMount() {
        console.log('Component (User) did mount.');

        this.attachStream();
    }

    componentDidUpdate() {
        console.log('Component (User) did update.');

        this.attachStream();
    }

    renderStatusMsg() {

        var res = '';

        if (this.stream === null && this.userId === Constants.SelfId)
        {
            res += 'Share your camera and microphone to participate in the call.';
        }
        else if (this.error)
        {
            res += 'Stream could not be established.';
        }
        else if (this.stream === null)
        {
            res += 'Joining...';
        }

        return <p>{res}</p>;
    }

    renderVideo() {
        if (this.stream !== null && !this.error)
        {
            // mute self to avoid sound feedback
            if (this.userId == Constants.SelfId)
                return <video id={this.videoId} autoplay muted />;
            else
                return <video id={this.videoId} autoplay />;
        }
    }

    render() {

        return (
            <div>
                <ul>
                    <li>User ID: {this.props.user.id}</li>
                    <li>User Name: {this.name}</li>
                </ul>

                { this.renderStatusMsg() }
                { this.renderVideo() }

            </div>
        );
    }
}

export default User;