const routes = require('next-routes')();

routes
  .add('/users/:address', '/users/userpage');

module.exports = routes;
