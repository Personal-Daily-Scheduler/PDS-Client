import generateApiUri from '../../utils/generateURI';

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchLogin = async (userId, password) => {
  try {
    const response = await fetch('https://api.pdsdiary.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    console.log('서버로 부터 응답', response);
    const responseJson = await response.json();

    if (!responseJson.result) {
      return { result: false, message: responseJson.message };
    }

    return responseJson;
  } catch (error) {
    return { result: false, message: error.message };
  }
};

export default fetchLogin;
