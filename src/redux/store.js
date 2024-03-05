import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state:
        {
            profilePage: {
                posts: [
                    {id: 1, message: 'Hi, how are you?', likesCount: 12},
                    {id: 2, message: 'It\'s my first post!', likesCount: 1},
                    {id: 3, message: 'Yo!!', likesCount: 2},
                    {id: 4, message: 'Fucking shit', likesCount: 15}
                ],
                newPostText: "It sample"
            },
            dialogsPage: {
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
            },
            sidebar: {},
        },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state)
    }
}

export const state = store.getState();
export default store