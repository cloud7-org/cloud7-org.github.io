import RestClient from './RestClient.js'

class WebsiteApi {    
    static get canAccess() {
        return RestClient.hasHeaders;
    }

    static async login(username, password) {
        const hashed = window.btoa(`${username}:${password}`);
        const headers = {Authorization: `Basic ${hashed}`};
        try
        {
            const {ok} = await fetch('login', { headers, credentials: 'include' });
            if(ok)
                RestClient.headers = headers;

            return ok;
        } catch {
            return false;
        }
    }

    static async getFileTree() {                
        if(!WebsiteApi.canAccess)
            return false;

        const result = await RestClient.doGet('files');
        return await result.json();
    }

    static async downloadToBlob(path) {
        const result = await RestClient.doGet(path);
        return await result.blob();
    }
}

export default WebsiteApi;