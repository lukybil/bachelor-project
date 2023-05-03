import { API_URL } from '../constants';

export const getLeaderBoards = async () => {
  try {
    const response = await fetch(API_URL + '/leaderboards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e: any) {
    console.error(e.message);
  }
};
