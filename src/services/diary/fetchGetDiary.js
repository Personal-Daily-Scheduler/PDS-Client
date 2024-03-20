import generateApiUri from '../../utils/generateURI';

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchUserDiaries = async (user) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${user.userId}/diaries/diaries`);

  try {
    const response = await fetch(BASE_URI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userDiaries = await response.json();

    return userDiaries;
  } catch (error) {
    console.error('Error fetching diary from database:', error);

    return null;
  }
};

export default fetchUserDiaries;
