

let db = [{id: 1, title: "STEM Project 1", content: "When planets orbit the sun, you would expect them to have totally different planes and angles since nature tends to be unorganized, however, the reality is that they orbit it horizontally (in a single plane) or 7° degrees above or below that plane, but why is that?\n\nFirst, we need to understand how stars and planets are formed. When dust and gas particles start condensing, gravity starts to attract these particles and they start spinning, as they start doing so, the radius of this cloud gets smaller, hence using the angular momentum conservation law which is : L =mvr, where m is the mass, v is the velocity, r is the radius, and L is the angular momentum.\n\n We can notice that if we reduce rwhich is the radius of the orbit, either the mass(m) or the velocity (v) would have to change, for both sides to be equal since the angular momentum is constant. However, the mass in classical interactions is a constant as well so only the velocity would increase, and when it does, the particles start colliding with each other in opposite directions which cancels most of the angular momentum forcing all particles to orbit in the same plane, therefore giving our solar system the desk-like shape.", image: "assets/solarsystem.png", path: "/stem"}, {id: 2, title: "STEM Project 2", content: "The theory of relativity usually encompasses two interrelated physics theories by Albert Einstein: special relativity and general relativity, proposed and published in 1905 and 1915, respectively. Special relativity applies to all physical phenomena in the absence of gravity. General relativity explains the law of gravitation and its relation to the forces of nature. It applies to the cosmological and astrophysical realm, including astronomy.", image: "assets/relativity.png", path: "/relativity"}]

class ApiHandlers {
	get_all_topics(req, res) {
		return res.send(JSON.stringify(db));
	}

	get_topic(req, res) {
		var obj = db[req.params.id - 1];
		if (obj) {
			return res.send(JSON.stringify(obj));
		} else {
			return res.status(404);
		}
	}

	create_topic(req, res) {
		 const new_id = db.length + 1;
		 db.push( {id: new_id, title: req.body.title, content: req.body.description} );
		 return res.send(JSON.stringify({
		 			id: new_id,
		 			title: req.body.title,
		 			content: req.body.description}));
	}
}

module.exports = new ApiHandlers()
