import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchUserPlans = async (user) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${user.userId}/diaries/plans`);

  try {
    const response = await fetch(BASE_URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error fetching user plans:", error);
  }
};

export default fetchUserPlans;
