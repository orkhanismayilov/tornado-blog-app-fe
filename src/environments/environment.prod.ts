const host = 'https://tornado.ismayilov.dev';
const apiUrl = `${host}/api`;

export const environment = {
  production: true,
  appName: 'Tornado Blog',
  api: {
    posts: `${apiUrl}/posts`,
    auth: `${apiUrl}/auth`,
  },
  maxFileSize: 10, // MB
};
