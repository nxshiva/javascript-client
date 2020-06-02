import axios from 'axios';

async function callApi(method, url, data) {
  console.log('env variables', process.env.REACT_APP_BASE_URL);
  const completeUrl = process.env.REACT_APP_BASE_URL + url;
  console.log('Complete url', completeUrl);
  try {
    const response = await axios({
      method,
      url: completeUrl,
      data,
    });
    return response.data;
  } catch (error) {
    console.log('Inside catch');
    return { status: 'error', message: 'This is a error message' };
  }
}

export default callApi;
