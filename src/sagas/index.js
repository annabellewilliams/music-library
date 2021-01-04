import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import querystring from "querystring";

import { SONG_FETCH_REQUESTED, SONG_FETCH_SUCCEEDED, SONG_FETCH_FAILED } from "../actions/types";

function* fetchSongs(action) {
    try {
        // Get Access Token
        const postAuthConfig = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify(
                    { "grant_type": "client_credentials" }
                ),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)}`
            }
        };
        const auth = yield call(axios, postAuthConfig);

        // Fetch songs
        const getSongsConfig = {
            method: 'get',
            url: 'https://api.spotify.com/v1/browse/new-releases',
            headers: { 'Authorization': `Bearer ${auth.data.access_token}`}
        }
        const songs = yield call(axios, getSongsConfig);

        yield put({ type: SONG_FETCH_SUCCEEDED, payload: songs.data.albums.items })
    } catch (e) {
        yield put({ type: SONG_FETCH_FAILED, payload: e.message });
    }
}

function* rootSaga() {
    yield takeLatest(SONG_FETCH_REQUESTED, fetchSongs);
}

export default rootSaga;