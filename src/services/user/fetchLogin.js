import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchLogin = async (userId, password) => {
  const BASE_URI = generateApiUri(SERVER_URI, "auth/login");

  try {
    const response = await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return { result: false, message: error.message };
  }
};

export default fetchLogin;
