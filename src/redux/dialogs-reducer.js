import keyNextValue from "../api/keyIncrement";

const SEND_MESSAGE = "it-kamasutra/dialogs/SEND-MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yes'},
        {id: 5, message: 'Happy New Year'},
        {id: 6, message: 'Marry Chrystmas'},
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state, messages: [...state.messages, {id: keyNextValue(state.messages,'id'), message: action.newMessageBody}]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});
export default dialogsReducer;