const host = 'https://tornado.3031303.xyz';
const apiUrl = `${host}/api`;

export const environment = {
  production: true,
  api: {
    posts: `${apiUrl}/posts`,
    auth: `${apiUrl}/auth`,
  },
};
