import React, {useMemo, useState} from 'react';
import TracksList from "../TracksList/TracksList";
//https://music.yandex.ru/#access_token=y0_AgAAAAAoKO4OAAG8XgAAAADa0SeL4xloS0AfSMqjzhYsRSdHTnpVzqs&token_type=bearer&expires_in=31536000
//https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d
import {YandexMusicApi} from '../../services/yandexMusicApi';

var jsmediatags = require("jsmediatags/dist/jsmediatags.min");

const SearchWithList = () => {
    const [requestText, setRequestText] = useState("")
    const [tracksList, setTracksList] = useState([])
    const clientID = '23cabbbdc6cd418abb4b39c32c41195d';
    const userId = '673771022';
    const token = 'y0_AgAAAAAoKO4OAAG8XgAAAADa0SeL4xloS0AfSMqjzhYsRSdHTnpVzqs'

    const api = useMemo(() => new YandexMusicApi(), [])

    const clickHandler = () => {
        api.search(requestText)
            .then(res => {
                console.log(res)
                setTracksList(res)
                return res
            })
    }

    const clickHandlerUserUid = () => {
        api.authorization(token)
            .then(res => console.log(res))
    }

    const clickHandlerPlaylists = () => {
        api.getPlaylists()
            .then(res => console.log(res))
    }

    const clickHandlerCreatePlaylist = () => {
        api.createPlaylists('new test')
            .then(res => console.log(res))
    }

    const clickHandlerAddTrack = () => {
        api.addTrackById()
            .then(res => console.log(res))
    }
    const filesChanged = (e) => {
        console.log(e.target.files)
        for(let index = 0; index < e.target.files.length; index++) {
            let file = e.target.files[index];
            new jsmediatags.Reader(file)
                .setTagsToRead(["title", "artist"])
                .read({
                    onSuccess: function(tag) {
                        console.log({title: tag.tags.title, artist: tag.tags.artist});
                    },
                    onError: function(error) {
                        console.log(':(', error.type, error.info);
                    }
                });
        }
    };
    return (
        <div>
            <input type={"text"} onChange={(e) => setRequestText(e.target.value)}/>
            <input type={"file"} onChange={e =>filesChanged(e)} multiple/>
            <button onClick={() => api.authorization('y0_AgAAAAAoKO4OAAG8XgAAAADa0SeL4xloS0AfSMqjzhYsRSdHTnpVzqs')}>authorization</button>
            <button onClick={clickHandler}>search</button>
            <button onClick={clickHandlerPlaylists}>getPlaylists</button>
            <button onClick={clickHandlerUserUid}>getUserUid</button>
            <button onClick={clickHandlerCreatePlaylist}>Создать плейлист</button>
            <button onClick={clickHandlerAddTrack}>Добавить трек</button>

            <TracksList tracksList={tracksList}/>
        </div>
    );
};

export default SearchWithList;