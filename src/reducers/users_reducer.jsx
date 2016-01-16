// Reducer for USERS in a chatroom

import Constants from '../constants.jsx';
import { ADD_PEER_NO_STREAM, UPDATE_PEER_STREAM, UPDATE_PEER_MUTE, REMOVE_PEER } from '../actions/users_actions.jsx';

// ===== FORMAT ====
//const _INITIAL_STATE =
//    [
//        {
//            isSelf: null,
//            name: 'Self',
//            stream: null,
//            updatedStreamRender: 0,
//            skylinkId: null,
//            audioMute: false,
//            videoMute: false,
//        }
//    ];

const _INITIAL_STATE = [];

export default function(state = _INITIAL_STATE, action)
{
    console.log('>>> Reducer (users) received an action: ', action);

    switch (action.type)
    {

        case ADD_PEER_NO_STREAM:

            if (state.length >= Constants.MaxUsersPerRoom)
            {
                console.log('Max number of allowed users reached. Not adding peer.');
                return state;
            }

            const newUser = action.payload;
            var isUserNew = true;   // is this an addition or update?

            const updatedUsers = state.map(user => {
                    if (user.skylinkId === newUser.skylinkId)
                    {
                        isUserNew = false;
                        return newUser;
                    }
                    else
                    {
                        return user;
                    }
                }
            );

            return isUserNew ? [...updatedUsers, newUser] : updatedUsers;

        case UPDATE_PEER_STREAM:

            const { skylinkId, stream } = action.payload;

            return state.map(user => {

                if (user.skylinkId == skylinkId)
                {
                    user.stream = stream;
                    user.updatedStreamRender += 1;
                }

                return user;
            });

        case UPDATE_PEER_MUTE:

            const {id, audioMute, videoMute } = action.payload;

            return state.map(user => {

                if (user.skylinkId == id)
                {
                    user.audioMute = audioMute;
                    user.videoMute = videoMute;
                }

                return user;
            });


        case REMOVE_PEER:

            const skylinkIdToBeRemoved = action.payload;

            return state.filter(user => user.skylinkId != skylinkIdToBeRemoved);
    }

    return state;
}