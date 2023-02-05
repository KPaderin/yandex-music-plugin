import React, {useMemo} from 'react';
import styles from './Result.module.css';
import TracksList from "../../components/TracksList/TracksList";
import {YandexMusicApi} from '../../services/yandexMusicApi';
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import useIdV3ReaderSearchApiWithProgressBar from "../../hooks/useIdV3ReaderSearchApiWithProgressBar";

const Result = ({filesSelected}) => {
    const api = useMemo(() => new YandexMusicApi(), []);

    const [progressBarIsActive, progressBarCurrent, progressBarMax, tracksList] =
        useIdV3ReaderSearchApiWithProgressBar(useMemo(() => api.search.bind(api), [api]), filesSelected)

    return (
        <div className={styles.container}>
            {progressBarIsActive &&
                <LoadingBar cur={progressBarCurrent} max={progressBarMax}/>
            }
            <TracksList tracksList={tracksList}/>
        </div>
    );
};

export default React.memo(Result);