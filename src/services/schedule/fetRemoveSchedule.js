import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchRemoveSchedule = async (scheduleObject, memberUser) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${memberUser.userId}/diaries/${scheduleObject.selectedDate}/schedule`);

  try {
    const response = await fetch(BASE_URI, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${memberUser.token}`,
      },
      body: JSON.stringify({ scheduleId: scheduleObject.scheduleId }),
    });

    if (!response.ok) {
      console.error("Failed to delete plan from database");
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error deleting plan from database:", error);
  }
};

export default fetchRemoveSchedule;
