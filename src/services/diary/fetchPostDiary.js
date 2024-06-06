import generateApiUri from "../../utils/generateURI";

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchPostDiary = async (diaryObject, memberUser) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${memberUser.userId}/diaries/${diaryObject.selectedDate}/diary`);

  try {
    const response = await fetch(BASE_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${memberUser.token}`,
      },
      body: JSON.stringify(diaryObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error("Error saving plan to database:", error);
  }
};

export default fetchPostDiary;
