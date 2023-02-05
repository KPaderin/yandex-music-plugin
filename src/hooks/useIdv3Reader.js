import {useMemo} from "react";
var jsmediatags = require("jsmediatags/dist/jsmediatags.min");

const useIdv3Reader = (filesSelected, callbackOnProgress, callbackOnComplete) => {
    useMemo(() => {
        let promiseArray = [];
        for(let index = 0; index < filesSelected.length; index++) {
            let file = filesSelected[index];
            promiseArray.push(new Promise((resolve, reject) => new jsmediatags.Reader(file)
                .read({
                    onSuccess: function (tag) {
                        callbackOnProgress()
                        if(tag.tags.title !== undefined || tag.tags.artist !== undefined)
                            resolve({
                                title: tag.tags.title,
                                artist: tag.tags.artist
                            })
                        else
                            reject('undefined title and artist')
                    },
                    onError: function (error) {
                        callbackOnProgress()
                        reject(':(' + error.type + error.info)
                    }
                })))
        }

        Promise.allSettled(promiseArray)
            .then(arr => {
                callbackOnComplete(
                    arr.filter(item => item.status === "fulfilled").map(item => item.value)
                )
        })
    }, [callbackOnComplete, callbackOnProgress, filesSelected])
};

export default useIdv3Reader
