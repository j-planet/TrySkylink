import React, { Component } from 'react';
import { connect } from 'react-redux';


// prop:
//      user: { id: 0, name: 'Self', stream: null }
class SingleUserArea extends Component {

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
        return 'video' + this.props.user.skylinkId;
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
        console.log('Component (SingleUserArea) did mount.');

        this.attachStream();
    }

    componentDidUpdate() {
        console.log('Component (SingleUserArea) did update.');

        this.attachStream();
    }

    renderStatusMsg() {

        const { isSelf, stream, error } = this.props.user;

        var res = '';

        if (stream === null && isSelf)
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

        const { isSelf, stream, error } = this.props.user;

        if (stream !== null && !error)
        {
            // mute self to avoid sound feedback
            if (isSelf)
                return <video id={this.videoId()} autoPlay muted />;
            else
                return <video id={this.videoId()} autoPlay />;
        }
    }

    render() {

        return (
            <div>
                <ul>
                    <li>Skylink User Id: {this.props.user.skylinkId}</li>
                    <li>User Name: {this.props.user.name}</li>
                    <li>User Stream: { this.props.user.stream === null ? 'null' : 'available' }</li>
                </ul>

                { this.renderStatusMsg() }
                { this.renderVideo() }

            </div>
        );
    }
}

class UsersArea extends Component {

    render() {

        return (
            <div>
                <p>{this.props.users.length} User(s):</p>

                {this.props.users.map(
                    user =>
                    <SingleUserArea key={user.id} user={user} />)}
            </div>
        );
    }
}


// ======== REDUX STUFF ==========
function mapStateToProps(state)
{
    return {
        users: state.users
    };
}
export default connect(mapStateToProps)(UsersArea);