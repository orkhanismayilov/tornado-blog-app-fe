const host = 'https://tornado.ismayilov.site';
const apiUrl = `${host}/api`;

export const environment = {
  production: true,
  api: {
    posts: `${apiUrl}/posts`,
    auth: `${apiUrl}/auth`,
  },
};
