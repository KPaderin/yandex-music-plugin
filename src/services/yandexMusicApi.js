export class YandexMusicApi {
    constructor() {
        console.log('init api')
    }

    request(url, headers, args = {}) {
        console.log({...args, headers:headers})
        return fetch(url, {...args, headers:headers})
            .then(res => res.json())
    }

    authorization(token) {
        const url = `account/status`
        this.headers = {...this.headers, 'Authorization': `OAuth ${token}`}
        return this.request(url, this.headers)
            .then(json => {
                this.userId = json.result.account.uid
                return json
            })
    }

    getPlaylists() {
        const url = `/users/${this.userId}/playlists/list`
        return this.request(url, this.headers)
    }

    search(req, type = 'track', nocorrect = false) {
        const url = `search?text=${req}&page=0&type=${type}&nocorrect=${nocorrect}&perPage=1`
        return this.request(url)
            .then(json => json.result.tracks.results)
    }

    createPlaylists(playlistName, visibility = 'private') {
        const url = `/users/${this.userId}/playlists/create`

        let formData = new FormData();
        formData.append('title', playlistName);
        formData.append('visibility', visibility);

        return this.request(url, this.headers, {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
    }

    addTrackById(tracks= [{"id":'72790205',"albumId":'12562338'}], kind = '1004', revision = 8) {
        const url = `/users/${this.userId}/playlists/${kind}/change-relative`

        let formData = new FormData();
        formData.append('diff',
            `{"diff":{"op":"insert","at":0,"tracks":${JSON.stringify(tracks)}}}` );
        formData.append('revision', revision);

        return this.request(url, this.headers, {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
    }
}