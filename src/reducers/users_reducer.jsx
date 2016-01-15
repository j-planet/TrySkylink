// Reducer for USERS in a chatroom

import Constants from '../constants.jsx';
import { ADD_PEER_NO_STREAM, UPDATE_PEER_STREAM } from '../actions/users_actions.jsx';

const _INITIAL_STATE =
    [
        {
            id: Constants.SelfId,
            name: 'Self',
            stream: null,
            updatedStreamRender: 0,
            error: null
        }
    ];

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
            const updatedUsers = state.map(user => (user.id === newUser.id) ? newUser : user);

            return [...updatedUsers, newUser];

        case UPDATE_PEER_STREAM:

            const peerId = action.payload.id;
            const isPeerSelf = action.payload.isSelf;
            const stream = action.payload.stream;

            return state.map(user => {

                if ((isPeerSelf && user.id === Constants.SelfId) ||
                    user.id == peerId)
                {
                    user.stream = stream;
                    user.updatedStreamRender += 1;
                }

                return user;
            });
    }

    return state;
}