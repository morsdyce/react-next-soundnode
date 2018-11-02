import axios from 'axios';

export function GET(url, params = {}, authToken) {
  return axios({
    method: 'get',
    url,
    params: { ...params, oauth_token: authToken }
  });
}

export function POST(url, body = {}, authToken) {
  return axios({
    method: 'post',
    url,
    params: { oauth_token: authToken },
    body
  });
}

export function PUT(url, body = {}, authToken) {
  return axios({
    method: 'put',
    url,
    params: { oauth_token: authToken },
    body
  });
}

export function DELETE(url, params = {}, authToken) {
  return axios({
    method: 'delete',
    url,
    params: { ...params, oauth_token: authToken }
  });
}

export default { GET, POST, PUT, DELETE };
