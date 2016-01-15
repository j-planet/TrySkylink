import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../constants.jsx';
import { change_room_status } from '../actions/chatroom_actions.jsx';



class VideoContainer extends Component {

    constructor(props) {
        super(props);

        this.skylink = new Skylink();
        this.joinRoom = this.joinRoom.bind(this);
    }

    // room is a string
    joinRoom(room) {
        if (room === undefined) return;

        console.log('joinRoom. room: ', room);

        // TODO: call some join room action

        this.skylink.init(
            {
                apiKey: '86c593e0-6ad9-4ccf-8220-f40f8c23cdef',
                defaultRoom: room
            }, () => {
                this.skylink.joinRoom({
                    audio: true,
                    video: true
                })
            });
    }

    componentWillMount() {
        console.log('Component (VideoContainer) will mount.');

        //debugger;
        // -------- set up how skylink handles events ---------
        this.skylink.setLogLevel(this.skylink.LOG_LEVEL.INFO);

        this.skylink.on('readyStateChange', (statusCode) => {
            switch (statusCode) {
                case 0:
                    this.props.change_room_status(Constants.RoomState.IDLE);
                    return;
                case 1:
                    this.props.change_room_status(Constants.RoomState.CONNECTING);
                    return;
                case 2:
                    this.props.change_room_status(Constants.RoomState.CONNECTED);
                    return;
                case 3:
                    this.props.change_room_status(Constants.RoomState.LOCKED);
                    return;
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

        this.joinRoom('');

    }

    render() {
        return (
            <div>
                <h1>Room status: {this.props.room.status} </h1>
                <h2>{this.props.users.length} Users:</h2>
                <ul>
                    {
                        this.props.users.map(
                            user =>
                            <li key={user.id}> {user.id} -> {user.name} </li>
                            )
                        }
                </ul>
            </div>
        );
    }
}

// ======== REDUX STUFF ==========
function mapStatetoProps(state)
{
    return {
        room: state.room,
        users: state.users
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ change_room_status }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(VideoContainer);