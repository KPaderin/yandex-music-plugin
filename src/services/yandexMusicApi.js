export class YandexMusicApi {
    constructor() {
        console.log('init api')
    }

    request(url, headers, args = {}) {
        //console.log({...args, headers:headers})
        return fetch(url, {...args, headers:headers})
            .then(res => res.json())
    }

    getToken(login, password) {
        const url = `https://oauth.yandex.ru/token`

        let formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('client_id', '23cabbbdc6cd418abb4b39c32c41195d');
        formData.append('client_secret', '53bc75238f0c4d08a118e51fe9203300');
        formData.append('username', login);
        formData.append('password', password);

        return this.request(url, this.headers, {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
    }

    authorization(token) {
        const url = `yandex/account/status`
        this.headers = {...this.headers, 'Authorization': `OAuth ${token}`}
        return this.request(url, this.headers)
            .then(json => {
                this.userId = json.result.account.uid
                return json
            })
    }

    getPlaylists() {
        const url = `yandex/users/${this.userId}/playlists/list`
        return this.request(url, this.headers)
    }

    search(req, type = 'track', nocorrect = false) {
        const url = `yandex/search?text=${req}&page=0&type=${type}&nocorrect=${nocorrect}&perPage=1`
        return this.request(url)
            .then(json => json.result)
            .then(res => {
                if(res.tracks && res.tracks.results)
                    return res.tracks.results
                else
                    return []
            })
    }

    createPlaylists(playlistName, visibility = 'private') {
        const url = `yandex/users/${this.userId}/playlists/create`

        let formData = new FormData();
        formData.append('title', playlistName);
        formData.append('visibility', visibility);

        return this.request(url, this.headers, {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
    }

    addTrackById(tracks= [{"id":'72790205',"albumId":'12562338'}], kind = '1004', revision = 8) {
        const url = `yandex/users/${this.userId}/playlists/${kind}/change-relative`

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