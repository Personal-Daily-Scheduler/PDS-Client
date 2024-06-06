import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const API_URI = generateApiUri(SERVER_URI, "auth/signup");

const fetchSignUp = async (username, email, password) => {
  try {
    const response = await fetch(API_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return { result: false, message: error.message };
  }
};

export default fetchSignUp;
