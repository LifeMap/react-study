import axios from 'axios';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const domain = 'http://localhost:9000';

async function fetch(method, uri, header, queryParams, bodyParams) {
    console.log(`method: ${method}`);
    console.log(`uri: ${uri}`);
    console.log(`header: ${JSON.stringify(header)}`);
    console.log(`queryParams: ${JSON.stringify(queryParams)}`);
    console.log(`bodyParams: ${JSON.stringify(bodyParams)}`);

    let url = domain + uri;
    if (method.toUpperCase() === 'GET') {
        if (queryParams) {
            url = url + Object.entries(queryParams).map(e => e.join('=')).join('&');
        }
    }
    const res = await axios({
        method: method,
        url: url,
        data: bodyParams,
        headers: header
    });

    console.log(`res type: ${typeof res}`);
    console.log(`status: ${res.status}`);
    console.log(`axios res: ${JSON.stringify(res)}`);
    console.log(`res data: ${JSON.stringify(res.data)}`);

    return res.data;
};

const AxiosUtil = {
    fetch,
};

export default AxiosUtil;