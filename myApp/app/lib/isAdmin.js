import { getToken } from './auth';

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('JWT Decode Error:', err);
    return null;
  }
}

export const isAdminUser = async () => {
  const token = await getToken();
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  return payload?.isAdmin === true;
};
