// Reducer for USERS in a chatroom

const _initialState =
    [
        {
            id: 0,
            stream: null
        }
    ];

export default function(state = _initialState, action)
{
    console.log('>>> Reducer (users) received an action: ', action);

    return state;
}