import {usersAPI} from "../api/api";

const SET_USER_DATA = "it-kamasutra/auth/SET_USER_DATA";


let initialState = {
    userId: null, // 2,
    email: null, //  'blabla@bla.bla',
    login: null, //  'samurai',
    isAuth: false
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await usersAPI.authMe();
    if (response.resultCode === 0) {
        let {id, login, email} = response.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginSubmit = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let response = await usersAPI.login(email, password, rememberMe)
    try {
        if (response.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            const err = response.messages?.length > 0 ? response.messages[0] : "Email or password is wrong"
            console.error("An error occurred while calling response:", err)
//        dispatch(stopSubmit("login", { _error: err }));
        }
    } catch (error) {
        console.error("An error occurred while calling usersAPI.login:", error);
    }
};

export const logout = () => async (dispatch: any) => {
    let response = await usersAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;