import { SONG_SELECTED } from "./types";

export const selectSong = (song) => {
    return {
        type: SONG_SELECTED,
        payload: song
    }
}