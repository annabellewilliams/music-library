import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {fetchSongs, selectSong} from "../actions";

const SongList = ({ songs, selectSong, fetchSongs }) => {

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);

    const renderArtistList = (song) => {
        return song.artists.map((artist) => {
            return (
                <div key={`${artist.id}_${song.id}`}>
                    <i className="user icon" />
                    { artist.name }
                </div>
            );
        });
    }

    const renderList = () => {

        if (songs) {
            return songs.map((song) => {
                return (
                    <div className="item" key={song.name}>
                        {/*<div className="right floated content">*/}
                        {/*    <button className="ui button primary" onClick={() => selectSong(song)}>Select</button>*/}
                        {/*</div>*/}
                        {/*<img className="left floated content" src={song.images[1].url} alt=""/>*/}
                        {/*<div className="content">{song.name}</div>*/}

                        <div className="ui card">
                            <div className="image">
                                <img src={song.images[1].url} alt={song.name} />
                            </div>
                            <div className="content">
                                <h3 className="header">{song.name}</h3>
                                <div className="meta">
                                    <span className="date">Released: {song.release_date}</span>
                                </div>
                                <div className="description">
                                    Type: { song.album_type }
                                </div>
                            </div>
                            <div className="extra content">
                                <div className="right floated content">
                                    <button className="ui button primary" onClick={() => selectSong(song)}>Select</button>
                                </div>
                                { renderArtistList(song) }
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return <div>Loading...</div>;
    }

    return <div className="ui divided list">{renderList()}</div>;
}

const mapStateToProps = (state) => {
    return { songs: state.songs };
};

export default connect(mapStateToProps, {
    selectSong: selectSong,
    fetchSongs: fetchSongs
})(SongList);