import generateApiUri from '../../utils/generateURI';

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchLogin = async (userId, password) => {
  const BASE_URI = generateApiUri(SERVER_URI, 'auth/login');

  console.log('로그인 요청 Url', BASE_URI);
  try {
    // const response = await fetch(BASE_URI, {
    const response = await fetch('/api/auth/login', {
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
