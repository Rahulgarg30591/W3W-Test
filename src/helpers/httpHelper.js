import axios from "axios";

const makeRequest = (requestInfo, successCallback, failueCallback) => {
    // return axios.request(requestInfo.url, successCallback, failueCallback);

    let httpData = null;

    if (requestInfo.data) {
        httpData = JSON.stringify(requestInfo.data);
    }

    /* ************** Why headers in this way? Do we need baseUrl? *************** */
    return axios.request({
        url: requestInfo.url,
        method: requestInfo.method || 'post',
        baseURL: 'https://jsonplaceholder.typicode.com',
        headers: {
            ...{
                'Content-Type': 'application/json',
            },
        },
        timeout: 40000,
        data: httpData,
    }).then(successCallback, failueCallback);
}

export default makeRequest;