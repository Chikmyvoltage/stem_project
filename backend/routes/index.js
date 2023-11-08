const pages = require('./pages');
const endpoints = require('./api');

function routes(app) {
	pages.forEach((route) => {
		const {method, path, middleware = [], handler} = route;
		app[method](path, ...middleware, handler);
	});

	endpoints.forEach((route) => {
		const {method, path, middleware = [], handler} = route;
		app[method](path, ...middleware, handler);
	});

}

module.exports = routes;
