import { combineReducers } from "redux";

import { SONG_SELECTED } from "../actions/types";

const songsReducer = () => {
    // TODO: Spotify API GET songs
    return [
        { title: 'Savage ft. Beyoncé', duration: '4:05' },
        { title: 'Formation', duration: '3:55' },
        { title: 'Daddy Lessons', duration: '3:45' },
        { title: 'Freedom', duration: '4:15' }
    ];
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