const getTracks = (apiSearch, requests, callbackOnProgress) => {
    let promiseArray = [];
    requests.forEach(request => {
        promiseArray.push(apiSearch(request.title + ' ' + request.artist)
            .then(res => {
                if(res.length >= 1)
                    res = res[0]
                callbackOnProgress();
                return {
                    result: res,
                    request: request
                }
            }))
    })
    return promiseArray;
};

export default getTracks
