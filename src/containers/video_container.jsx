import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../constants.jsx';
import { change_room_status } from '../actions/room_actions.jsx';
import { add_peer_no_stream, update_peer_stream } from '../actions/users_actions.jsx';
import UsersArea from '../Components/users_area.jsx';

// TODO: a sense of which users are allowed in which room


class VideoContainer extends Component {

    constructor(props) {
        super(props);

        this.skylink = new Skylink();
        this.joinRoom = this.joinRoom.bind(this);
        this.setUpSkylink = this.setUpSkylink.bind(this);
        //this.renderUsers = this.renderUsers.bind(this);
        this.isRoomLocked = this.isRoomLocked.bind(this);
    }

    isRoomLocked() {
        return this.props.room.status == Constants.RoomState.LOCKED;
    }

    // room is a string
    joinRoom(room) {
        if (room === undefined) return;

        console.log('Attempting to joinRoom. room: ', room);

        if (this.isRoomLocked())
        {
            console.log('Room is locked. Cannot join. Giving up...');
            return;
        }

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

    setUpSkylink() {
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

        this.skylink.on('channelError', (err) => {
            this.props.change_room_status(Constants.RoomState.IDLE);

            alert('An error has occurred with Skylink :( :( :( : ' + error.toString());

        });

        this.skylink.on('peerJoined', (peerId, peerInfo, isSelf) => {

            if (isSelf)
            {
                console.log('Self issuing peerJoined.');
                this.selfSkylinkId = peerId;
            }

            if (this.props.room.status == Constants.RoomState.LOCKED ||
                this.props.room.status == Constants.RoomState.IDLE)
            {
                return;
            }

            this.props.add_peer_no_stream(peerId, 'Guest ' + peerId, isSelf);
        });

        this.skylink.on('incomingStream', (peerId, stream, isSelf) => {

            // update stream for the user
            this.props.update_peer_stream(peerId, stream, isSelf);

            // lock the room if it's full
            if (this.props.users.length === Constants.MaxUsersPerRoom)
            {
                console.log('The room has just become full.');
                this.skylink.lockRoom();
            }
        });

        this.skylink.on('peerUpdated', (peerId, peerInfo, isSelf) => {

        });

        this.skylink.on('peerLeft', (peerId, peerInfo, isSelf) => {

        });

        this.skylink.on('roomLock', (isLocked) => {
            if (isLocked) this.props.change_room_status(Constants.RoomState.LOCKED);
        });

        this.skylink.on('systemAction', (action, message, reason) => {
            if (reason === this.skylink.SYSTEM_ACTION_REASON.ROOM_LOCKED)
            {
                console.log('ROOM LOCK skylink systemAction fired.');
                this.props.change_room_status(Constants.RoomState.LOCKED);
            }
        });
    }

    componentWillMount() {
        console.log('Component (VideoContainer) will mount.');

        this.setUpSkylink();
    }

    componentDidMount() {
        console.log('Component (VideoContainer) did mount.');

        this.joinRoom('defaultroom');

    }

    render() {
        return (
            <div>
                <h1>Room status: {this.props.room.status} </h1>
                <hr />
                <UsersArea selfSkylinkId={this.selfSkylinkId} />
            </div>
        );
    }
}

// ======== REDUX STUFF ==========
function mapStateToProps(state)
{
    return {
        room: state.room,
        users: state.users
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators(
        {
            'change_room_status': change_room_status,
            'add_peer_no_stream': add_peer_no_stream,
            'update_peer_stream': update_peer_stream
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);