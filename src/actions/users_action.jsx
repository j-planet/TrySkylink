// Doesn't do ANYTHING with Skylink. Concerned with the state of Users only.

export const ADD_PEER_NO_STREAM = 'ADD_PEER_NO_STREAM';

export function add_peer_no_stream(id, name) {

    const payload = {
        id: id,
        name: name,
        stream: null,
        updatedStreamRender: 0,
        error: null
    };

    console.log('Action (add_peer_no_stream) fired a payload: ', payload);

    return {
        type: ADD_PEER_NO_STREAM,
        payload: payload
    };
}