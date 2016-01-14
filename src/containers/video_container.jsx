import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { skylinkReadyStateChg } from '../actions/chatroom_actions.jsx';



class VideoContainer extends Component {

    constructor(props) {
        super(props);

        this.skylink = new Skylink();
    }

    componentWillMount() {
        console.log('Component (VideoContainer) will mount.');

        //debugger;
        // -------- set up how skylink handles events ---------
        this.skylink.setLogLevel(this.skylink.LOG_LEVEL.INFO);

        this.skylink.on('readyStateChange', (statusCode) => {
            switch (statusCode) {
                case 0:
            }
        });

        this.skylink.on('channelError', (error) => {

        });

        this.skylink.on('peerJoined', (peerId, peerInfo, isSelf) => {

        });

        this.skylink.on('incomingStream', (peerId, stream, isSelf) => {

        });

        this.skylink.on('peerUpdated', (peerId, peerInfo, isSelf) => {

        });

        this.skylink.on('peerLeft', (peerId, peerInfo, isSelf) => {

        });

        this.skylink.on('roomLock', (isLocked) => {

        });

        this.skylink.on('systemAction', (action, message, reason) => {

        });


    }

    componentDidMount() {
        console.log('Component (VideoContainer) did mount.');

    }

    render() {
        return <h1>Hello from App.</h1>;
    }
}

// ======== REDUX STUFF ==========
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ skylinkReadyStateChg }, dispatch);
}

export default connect(null, mapDispatchToProps)(VideoContainer);