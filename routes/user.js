var router = require('express').Router(),
	User = require('../models/user');

router.post('/register', function(req, res) {
	
	var oUser = new User(req.body);
	oUser.save(function(err, user) {
		res.status(200).send({ bSuccess: true, bMessage: "Registration successful", user: user });
	});

});

router.post('/login', function(req, res) {
	console.log('login:', req.session);

	User.find({ username: req.body.username, password: req.body.password }, function(err, users) {

		// error checking here

		var user = users[0];
		req.session.userID = user._id;
		console.log('session:', req.session);		
		res.send({ bSuccess: true, bMessage: 'Login successful' });

	});
	
});








module.exports = router;