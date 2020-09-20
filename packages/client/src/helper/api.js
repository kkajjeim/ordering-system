const BASE_URL = 'http://0.0.0.0:5000';

const api = async (
    method,
    uri,
    body,
    contentType
) => {
    const headers = new Headers();
    const accessToken = localStorage.getItem('accessToken');

    if (contentType) headers.append('Content-Type', contentType);
    if (accessToken) headers.append('x-access-token', accessToken);
    if (body) body = JSON.stringify(body);

    uri = `${BASE_URL}${uri}`;
    const options = { method, body, headers };
    const restApi = await fetch(uri, options);

    if (restApi.ok) {
        return restApi;
    } else {
        throw restApi.status;
    }
};

export default api;
