import { SONG_SELECTED, SONG_FETCH_REQUESTED } from "./types";

export const selectSong = (song) => {
    return {
        type: SONG_SELECTED,
        payload: song
    }
}

export const fetchSongs = () => {
    return {
        type: SONG_FETCH_REQUESTED
    }
}