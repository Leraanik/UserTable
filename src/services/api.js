const BASE_URL = 'https://dummyjson.com/users';

export async function fetchUsers({ limit = 10, skip = 0 }) {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Ошибка при получении данных');
  return res.json();
}
