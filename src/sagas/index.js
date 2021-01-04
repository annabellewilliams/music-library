import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import querystring from "querystring";

import {
    SONG_FETCH_REQUESTED,
    SONG_FETCH_SUCCEEDED,
    SONG_FETCH_FAILED,
    AUTH_REQUESTED,
    AUTH_SUCCEEDED,
    AUTH_FAILED
} from "../actions/types";

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
                "Authorization": `Basic ${btoa('5b6a8cefabc8453fab7e42892ff20a03:f61aa61419384d70893a360e9d3b2d66')}`
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

function* authenticate(action) {
    // TODO: authenticate via Spotify API
    console.log('from sagas/index.js', action);
    const config = {
        method: 'get',
        url: 'http://localhost:3001/login',
        // headers: { 'Origin': 'http://localhost:3000' }
    };
    const auth = yield call(axios, config);
    try {
        yield put({ type: AUTH_SUCCEEDED, payload: auth });
    } catch (e) {
        yield put({ type: AUTH_FAILED, payload: e.message })
    }
}

function* rootSaga() {
    yield takeLatest(SONG_FETCH_REQUESTED, fetchSongs);
    yield takeLatest(AUTH_REQUESTED, authenticate);
}

export default rootSaga;