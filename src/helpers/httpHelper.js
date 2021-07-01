import axios from "axios";

const makeRequest = (requestInfo, successCallback, failueCallback) => {
    let httpData = null;

    if (requestInfo.data) {
        httpData = JSON.stringify(requestInfo.data);
    }

    return axios.request({
        url: requestInfo.url,
        method: requestInfo.method || 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 40000,
        data: httpData,
    }).then(successCallback, failueCallback);
}

export default makeRequest;