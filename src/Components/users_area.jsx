import React, { Component } from 'react';
import { connect } from 'react-redux';


// prop:
//      user: { id: 0, name: 'Self', stream: null },
//      skylinkObj
class SingleUserArea extends Component {

    constructor(props) {
        super(props);

        this.currentStreamRender = 0;

        this.attachStream = this.attachStream.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.renderStatusMsg = this.renderStatusMsg.bind(this);
        this.renderControlButtons = this.renderControlButtons.bind(this);
        this.videoId = this.videoId.bind(this);
        this.handleAudioMute = this.handleAudioMute.bind(this);
        this.handleVideoMute = this.handleVideoMute.bind(this);
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

    handleAudioMute() {
        console.log('Muting Audio for user ', this.props.user.id);
        this.props.skylinkObj[this.props.user.audioMute ? 'enableAudio' : 'disableAudio']();
    }

    handleVideoMute() {
        console.log('Muting Video for user ', this.props.user.id);
        this.props.skylinkObj[this.props.user.videoMute ? 'enableVideo' : 'disableVideo']();
    }

    renderControlButtons() {
        if (this.props.user.isSelf)
        {
            return (
                <span className="input-group">
                    <button onClick={this.handleAudioMute} > { this.props.user.audioMute ? 'Turn Audio On' : 'Turn Audio Off'} </button>
                    <button onClick={this.handleVideoMute} > { this.props.user.videoMute ? 'Turn Video On' : 'Turn Video Off'} </button>
                </span>
            );
        }
    }

    render() {

        return (
            <div>

                <table className="table table-hover">

                    <thead>
                    <tr>
                        <th> Skylink ID </th>
                        <th> Name </th>
                        <th> Stream </th>
                        <th> Audio </th>
                        <th> Video </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td> { this.props.user.skylinkId } </td>
                        <td> { this.props.user.name } </td>
                        <td> { this.props.user.stream === null ? 'null' : 'available' } </td>
                        <td> { this.props.user.audioMute ? 'Off' : 'On' } </td>
                        <td> { this.props.user.videoMute ? 'Off' : 'On' } </td>
                    </tr>
                    </tbody>

                </table>

                { this.renderStatusMsg() }
                { this.renderVideo() }
                { this.renderControlButtons() }

                <hr />

            </div>
        );
    }
}

// prop: skylinkObj
class UsersArea extends Component {

    render() {

        return (
            <div>
                <p>{this.props.users.length} User(s):</p>

                {this.props.users.map(
                    user => <SingleUserArea key={user.id} user={user} skylinkObj={this.props.skylinkObj} />
                    )}
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