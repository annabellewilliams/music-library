import { combineReducers } from "redux";

import { SONG_SELECTED, SONG_FETCH_SUCCEEDED, AUTH_SUCCEEDED } from "../actions/types";


const songsReducer = (songs = null, action) => {
    if (action.type === SONG_FETCH_SUCCEEDED) {
        return action.payload;
    }
    return songs;
};

const selectedSongReducer = (selectedSong= null, action) => {
    if (action.type === SONG_SELECTED) {
        return action.payload;
    }
    return selectedSong;
}

const authReducer = (auth = null, action) => {
    console.log('from reducers/index.js', action);
    if (action.type === AUTH_SUCCEEDED) {
        return action.payload;
    }
    return auth;
}

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer,
    auth: authReducer
});