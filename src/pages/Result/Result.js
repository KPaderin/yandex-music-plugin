import React, {useCallback, useMemo, useRef, useState} from 'react';
import styles from './Result.module.css';
import TracksList from "../../components/TracksList/TracksList";
import {YandexMusicApi} from '../../services/yandexMusicApi';
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import useIdv3Reader from "../../hooks/useIdv3Reader";
import useSearchApi from "../../hooks/useSearchApi";

const Result = ({filesSelected}) => {
    console.log(filesSelected)
    const loadRef = useRef();
    const allCntRef = useRef();
    const [loadingAllCnt, setLoadingAllCnt] = useState(filesSelected.length);
    const [loadingIsActive, setLoadingIsActive] = useState(true);

    const [gotTrackTags, setGotTrackTags] = useState([])

    const [tracksList, setTracksList] = useState([]);

    const api = useMemo(() => new YandexMusicApi(), []);
    const token = 'y0_AgAAAAAoKO4OAAG8XgAAAADa0SeL4xloS0AfSMqjzhYsRSdHTnpVzqs'
    //api.authorization(token)

    const callbackOnProgress = useCallback(() => {
        loadRef.current.innerText = Number(loadRef.current.innerText) + 1
    }, [])

    const callbackOnCompleteReadTags = useCallback(arr => {
        loadRef.current.innerText = 0
        allCntRef.current.innerText = arr.length
        setGotTrackTags(arr)
    }, [])

    const callbackOnCompleteSearch = useCallback(() => {
        setLoadingIsActive(false)
    }, [])

    useIdv3Reader(filesSelected, callbackOnProgress, callbackOnCompleteReadTags)
    useSearchApi(api.search.bind(api), gotTrackTags, callbackOnProgress, callbackOnCompleteSearch)

    return (
        <div className={styles.container}>
            { loadingIsActive &&
                <LoadingBar currentCountRef={loadRef} allCntRef={allCntRef}/>
            }
            <TracksList tracksList={tracksList}/>
        </div>
    );
};

export default React.memo(Result);