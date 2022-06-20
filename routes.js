const routes = require('next-routes')();

routes
  .add('/users/:address', '/users/userpage')
  .add('/learnmore', 'learn');

module.exports = routes;
