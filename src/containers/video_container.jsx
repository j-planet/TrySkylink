import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Constants from '../constants.jsx';
import { change_room_status } from '../actions/room_actions.jsx';
import { add_peer_no_stream, update_peer_stream, remove_peer } from '../actions/users_actions.jsx';
import UsersArea from '../Components/users_area.jsx';
var $ = require('jquery');


// TODO: a sense of which users are allowed in which room


class VideoContainer extends Component {

    constructor(props) {
        super(props);

        this.skylink = new Skylink();
        this.selfSkylinkId = null;

        this.joinRoom = this.joinRoom.bind(this);
        this.setUpSkylink = this.setUpSkylink.bind(this);
        this.isRoomEnterable = this.isRoomEnterable.bind(this);
    }

    // cannot enter if locked and not already in room
    isRoomEnterable() {

        const isSelfInRoom = () => {

            if (this.selfSkylinkId === null) return false;

            for (let user of this.props.users)
            {
                if (user.skylinkId == this.selfSkylinkId) return true;
            }

            return false;
        };

        return !(this.props.room.status == Constants.RoomState.LOCKED)
            || isSelfInRoom();
    }

    // room is a string
    joinRoom(room) {
        if (room === undefined) return;

        console.log('Attempting to joinRoom. room: ', room);

        if (!this.isRoomEnterable())
        {
            console.log('Not already in a locked room. Cannot join. Giving up...');
            return;
        }

        // TODO: call some join room action

        $.ajax(
            {
                type: 'get',
                url: 'skylink_api_key'
            })
            .done((apiKey) => {

                console.log('AJAX retrieved successfully.');

                this.skylink.init(
                    {
                        apiKey: apiKey,
                        defaultRoom: room
                    },
                    (error) => {

                        if (error)
                        {
                            alert('An error has occurred while connecting to SkylinkJS.');
                            return;
                        }

                        this.skylink.joinRoom({
                            audio: true,
                            video: true
                        })
                    });
            })
            .fail((err) => {
                alert('An error has occurred while retrieving the Skylink API key from the server.');
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
            console.log('Channel error!!!');
            this.props.change_room_status(Constants.RoomState.IDLE);

            alert('An error has occurred with Skylink :( :( :( : ' + error.toString());

        });

        this.skylink.on('peerJoined', (peerId, peerInfo, isSelf) => {

            if (isSelf)
            {
                this.selfSkylinkId = peerId;

                console.log('...setting selfSkylinkId', this.selfSkylinkId);
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
            this.props.update_peer_stream(peerId, stream);

            // lock the room if it's full
            if (this.props.users.length === Constants.MaxUsersPerRoom)
            {
                console.log('The room has just become full.');
                this.skylink.lockRoom();
                console.log('LOCKED THE ROOM.');
            }
        });

        this.skylink.on('peerUpdated', (peerId, peerInfo, isSelf) => {
            console.log('Doing NOTHING for peerUpdated.');
        });

        this.skylink.on('peerLeft', (peerId, peerInfo, isSelf) => {
            console.log(`Peer ${peerId} left.`);

            // remove peer from the list of users
            this.props.remove_peer(peerId);

            // unlock room if it was full before
            if (this.props.users.length === Constants.MaxUsersPerRoom - 1)
            {
                this.skylink.unlockRoom();
            }
        });

        this.skylink.on('roomLock', (isLocked) => {
            this.props.change_room_status(
                isLocked ?
                    Constants.RoomState.LOCKED
                    : Constants.RoomState.CONNECTED
            );
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

        if (this.isRoomEnterable())
        {
            return (
                <div>
                    <h1>Room status: {this.props.room.status} </h1>
                    <hr />
                    <UsersArea />
                </div>
            );
        }
        else {
            return <h1>A gated area.</h1>;
        }

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
            'update_peer_stream': update_peer_stream,
            'remove_peer': remove_peer
        },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);