import fetch from 'cross-fetch';

const myFetch = {
    POST(url, data) {
        return fetch('http://localhost:9090/' + url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080/'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(res => res.json());
    },
    GET(url) {
        return fetch('http://localhost:9090/' + url, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8080/'
            },
            method: 'GET',
            mode: 'cors'
        }).then(res => res.json());
    }
};

export default myFetch;
