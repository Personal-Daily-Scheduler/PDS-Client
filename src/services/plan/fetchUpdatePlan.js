import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchUpdatePlan = async (updatedPlan, memberUser) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${memberUser.userId}/diaries/${updatedPlan.selectedDate}/plan`);

  try {
    const response = await fetch(BASE_URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${memberUser.token}`,
      },
      body: JSON.stringify(updatedPlan),
    });

    if (!response.ok) {
      return { result: false, message: `HTTP error! status: ${response.status}` };
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return { result: false, message: error.message };
  }
};

export default fetchUpdatePlan;
