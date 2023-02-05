import {useMemo} from "react";

const useSearchApi = (apiSearch, requests, callbackOnProgress, callbackOnComplete) => {
    useMemo(() => {
        let promiseArray = [];
        requests.forEach(request => {
            promiseArray.push(apiSearch(request.title + ' ' + request.artist)
                .then(res => {
                    callbackOnProgress();
                    return {
                        result: res,
                        request: request
                    }
                }))
        })
        Promise.allSettled(promiseArray)
            .then(res => callbackOnComplete(
                res.filter(item => item.status === "fulfilled").map(item => item.value)
            ))
    }, [apiSearch, callbackOnComplete, callbackOnProgress, requests])
};

export default useSearchApi
