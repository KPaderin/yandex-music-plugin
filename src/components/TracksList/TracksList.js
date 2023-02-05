import React from 'react';
import styles from './TracksList.module.css';
import Track from "../Track/Track";

const TracksList = ({tracksList}) => {

    const clickHandler = (e) => {
        e.preventDefault();
        window.location.assign('https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d&redirect_uri=https://tangerine-zuccutto-452844.netlify.app')
        /*api.getToken('', '')
            .then(account => {
                api.authorization(account.access_token).then(res => {
                    api.createPlaylists(res.result.account.uid).then(playlist => {
                        let kind = playlist.result.kind
                        let revision = playlist.result.revision
                        let tracks = tracksList.filter(track => track.selected).map(track => ({
                            "id": track.result.id,
                            "albumId": track.result.albums[0].id
                        }))
                        api.addTrackById(tracks, kind, revision)
                            .then(res => {
                                if (res.hasOwnProperty('result'))
                                    alert('okay')
                                navigate('/main')
                            })
                    })
                })
            })*/
    }

    return (
        <>
            <ul className={styles.listContainer}>
                {tracksList.map(track => {
                    if (track.result.length === 0)
                        return null
                    return <Track key={track.result.id} track={track}/>
                })}
            </ul>
            <div className={styles.footContainer}>
                <button onClick={clickHandler}>Создать плейлист и добавить выбранные</button>
            </div>
        </>
    );
};

export default React.memo(TracksList);