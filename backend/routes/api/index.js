const handlers = require('./handlers');

const routes = [
	{
		handler: handlers.get_all_topics,
		method: 'get',
		path: '/api/topics'
	},
	{
		handler: handlers.get_topic,
		method: 'get',
		path: '/api/topics/:id'
	},
	{
		handler: handlers.create_topic,
		method: 'post',
		path: '/api/topics'
	}
]

module.exports = routes;
