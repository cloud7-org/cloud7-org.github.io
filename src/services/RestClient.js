import init, {PostHeaders} from "wasm-module";

let postHeaders = {};
init().then(() => {
    postHeaders = new PostHeaders();
});

const api = process.env.APP_API;

const getHeaders = () => JSON.parse(window.sessionStorage.getItem('api-headers'));
const makeUrl = (path) => `${api}/${path}`

class RestClient {    
    static doGet = (path) => {
        const config = RestClient.hasHeaders ? { headers: getHeaders(), credentials: 'include' } : null;
        return fetch(makeUrl(path), config);
    }

    static doPost = (path, payload) => {
        const headers = {...postHeaders.objectify()};

        return fetch(makeUrl(path), {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
    }

    static get headers() { return getHeaders(); }
    static set headers(value) { window.sessionStorage.setItem('api-headers', JSON.stringify(value));}

    static get hasHeaders() { return !!getHeaders(); }    
}

export default RestClient;