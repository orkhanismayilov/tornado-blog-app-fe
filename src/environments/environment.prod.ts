const apiUrl = 'http://localhost:3000/api';

export const environment = {
  production: true,
  api: {
    posts: `${apiUrl}/posts`,
    auth: `${apiUrl}/auth`,
  },
};
