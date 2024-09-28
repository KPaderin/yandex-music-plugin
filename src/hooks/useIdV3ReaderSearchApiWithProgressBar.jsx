import {useMemo, useState} from "react";
import getIdv3Tags from "../services/getIdv3Tags";
import getTracks from "../services/getTracks";

const useIdV3ReaderSearchApiWithProgressBar = (apiSearch, filesSelected) => {
    const [progressBarIsActive, setProgressBarIsActive] = useState(false)
    const [progressBarCurrent, setProgressBarCurrent] = useState(0)
    const [progressBarMax, setProgressBarMax] = useState(0)
    const [tracksList, setTracksList] = useState([])

    useMemo(() => {
        let cnt = 0;
        setProgressBarIsActive(true)
        setProgressBarMax(filesSelected.length)

        let callbackOnProgress = () => {
            cnt++
            setProgressBarCurrent(cnt)
        }

        let promiseArray = getIdv3Tags(filesSelected, callbackOnProgress)

        Promise.allSettled(promiseArray)
            .then(arr => {
               let requests = arr.filter(item => item.status === "fulfilled").map(item => item.value);
               cnt = 0;
               setProgressBarMax(requests.length)
               promiseArray = getTracks(apiSearch, requests, callbackOnProgress);

                Promise.allSettled(promiseArray)
                    .then(arr => {
                        setTracksList(arr.filter(item => item.status === "fulfilled").map(item => item.value))
                        setProgressBarIsActive(false)
                    })
            })

    }, [apiSearch, filesSelected])

    return [progressBarIsActive, progressBarCurrent, progressBarMax, tracksList]
};

export default useIdV3ReaderSearchApiWithProgressBar