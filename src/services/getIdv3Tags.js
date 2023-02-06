var jsmediatags = require("jsmediatags/dist/jsmediatags.min");

const getIdv3Tags = (filesSelected, callbackOnProgress) => {
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
    return promiseArray;
};

export default getIdv3Tags
