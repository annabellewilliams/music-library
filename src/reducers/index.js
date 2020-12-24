import { combineReducers } from "redux";

import {SONG_SELECTED, SONG_FETCH_REQUESTED, SONG_FETCH_SUCCEEDED} from "../actions/types";
import { fetchSongs } from "../actions";


const songsReducer = (songs = null, action) => {
    // TODO: Spotify API GET songs
    if (action.type === SONG_FETCH_SUCCEEDED) {
        return action.payload;
    }
    return songs;
    // return [
    //     { title: 'Savage ft. Beyoncé', duration: '4:05' },
    //     { title: 'Formation', duration: '3:55' },
    //     { title: 'Daddy Lessons', duration: '3:45' },
    //     { title: 'Freedom', duration: '4:15' }
    // ];
};

const selectedSongReducer = (selectedSong= null, action) => {
    if (action.type === SONG_SELECTED) {
        return action.payload;
    }
    return selectedSong;
}

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});