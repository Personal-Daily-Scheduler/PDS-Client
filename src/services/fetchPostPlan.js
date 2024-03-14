import generateApiUri from '../utils/generateURI';

const SERVER_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const fetchPostPlans = async (plansObject, memberUser) => {
  const BASE_URI = generateApiUri(SERVER_URI, `users/${memberUser.userId}/diaries/${plansObject.selectedDate}/plan`);

  try {
    const response = await fetch(BASE_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${memberUser.token}`,
      },
      body: JSON.stringify(plansObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving plan to database:', error);
  }
};

export default fetchPostPlans;
