import { SONG_SELECTED, SONG_FETCH_REQUESTED, AUTH_REQUESTED } from "./types";

export const selectSong = (song) => {
    return {
        type: SONG_SELECTED,
        payload: song
    };
}

export const fetchSongs = () => {
    return {
        type: SONG_FETCH_REQUESTED
    };
}

export const authenticate = (auth) => {
    console.log('from actions/index.js', auth);
    return {
        type: AUTH_REQUESTED,
        payload: auth
    };
}