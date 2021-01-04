import React from 'react';

import Header from './Header';
import SongDetail from "./SongDetail";
import SongList from "./SongList";
import './App.css';

const App = () => {
    return (
        <div className="ui container">
            <Header />
            <div className="ui segment">
                <h1 className="ui center aligned header">Music Library</h1>
                <div className="ui very relaxed grid">
                    <div className="ui row">
                        <div className="column eight wide">
                            <SongList />
                        </div>
                        <div className="column eight wide">
                            <SongDetail />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;