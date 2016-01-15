// Reducer for USERS in a chatroom

const _INITIAL_STATE =
    [
        {
            id: 0,
            name: 'Self',
            stream: null
        }
    ];

export default function(state = _INITIAL_STATE, action)
{
    console.log('>>> Reducer (users) received an action: ', action);

    return state;
}