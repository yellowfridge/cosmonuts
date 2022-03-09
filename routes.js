const routes = require('next-routes')();

routes
  .add('/:address', '/userpage');

module.exports = routes;
