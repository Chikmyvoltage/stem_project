const approot = require('app-root-path');

const paths = ["/", "/topics/:id", "/add", "/stem", '/404'];

function get (req, res) {
	res.sendFile(`${approot}/dist/index.html`);
}

function error(req, res) {
	res.status(404).sendFile(`${approot}/dist/index.html`);
}

let page_routes = [];

for (var path of paths) {
	page_routes.push( {handler: get, method: "get", path: path} )
}
page_routes.push( {handler: error, method: "all", path: /^(?!\/api).*/} );

module.exports = page_routes;
