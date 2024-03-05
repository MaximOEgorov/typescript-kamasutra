import {profileAPI, usersAPI} from "../api/api";
import keyNextValue from "../api/keyIncrement";

const ADD_POST = "it-kamasutra/profile/ADD-POST";
const SET_USER_PROFILE = 'it-kamasutra/profile/SET_USER_PROFILE';
const SET_STATUS = 'it-kamasutra/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'it-kamasutra/profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post!', likesCount: 1},
        {id: 3, message: 'Yo!!', likesCount: 2},
        {id: 4, message: 'Fucking shit', likesCount: 15}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state, posts: [...state.posts, {
                    id: keyNextValue(state.posts, 'id'),
                    message: action.newText,
                    likesCount: 0
                }],
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state, status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPost = (text) => ({type: ADD_POST, newText: text});

const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
const setStatus = (status) => ({type: SET_STATUS, status});
const savePhotosSuccess = (photos) => ({type:SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response))
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotosSuccess(response.data.data.photos));
    }
}

export default profileReducer
