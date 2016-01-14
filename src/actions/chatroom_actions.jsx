import Skylink from 'skylinkjs';

export const CHANGE_ROOM_STATUS = 'CHANGE_ROOM_STATUS';

export function change_room_status(roomStatusCode) {

    const payload = roomStatusCode;

    console.log('Action (change_room_status) fired a payload: ', payload);

    return {
        type: CHANGE_ROOM_STATUS,
        payload: payload
    };
}