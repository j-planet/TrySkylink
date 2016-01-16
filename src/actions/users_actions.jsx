// Doesn't do ANYTHING with Skylink. Concerned with the state of Users only.
// Most of these "actions" are just pass-thrus. :(

import Constants from '../constants.jsx';

export const ADD_PEER_NO_STREAM = 'ADD_PEER_NO_STREAM';
export const UPDATE_PEER_STREAM = 'UPDATE_PEER_STREAM';
export const REMOVE_PEER = 'REMOVE_PEER';
export const UPDATE_PEER_MUTE = 'UPDATE_PEER_MUTE';


export function add_peer_no_stream(id, name, isSelf, audioMute, videoMute) {

    const payload = {
        isSelf: isSelf,
        name: isSelf ? 'Self' : name,
        stream: null,
        updatedStreamRender: 0,
        skylinkId: id,
        audioMute: audioMute,
        videoMute: videoMute
    };

    console.log('Action (add_peer_no_stream) fired a payload: ', payload);

    return {
        type: ADD_PEER_NO_STREAM,
        payload: payload
    };
}

export function update_peer_stream(id, stream) {

    const payload = {skylinkId: id, stream: stream};

    console.log('Action (update_peer_stream) fired a payload: ', payload);

    return {
        type: UPDATE_PEER_STREAM,
        payload: payload
    };
}

export function update_peer_mute(id, audioMute, videoMute) {

    const payload = {id: id, audioMute: audioMute, videoMute: videoMute};

    console.log('Action (update_peer_mute) fired a payload: ', payload);

    return {
        type: UPDATE_PEER_MUTE,
        payload: payload
    };
}

export function remove_peer(skylinkId) {

    const payload = skylinkId;

    console.log('Action (remove_peer) fired a payload: ', payload);

    return {
        type: REMOVE_PEER,
        payload: payload
    };
}