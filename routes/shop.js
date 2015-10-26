var router = require('express').Router(),
	Item = require('../models/item'),
	User = require('../models/user');

router.get('/', function(req, res) {
	console.log('session:', req.oUser);

	if(req.oUser) {
		Item.find({}).exec(function(err, oData) {

			res.send({ 
				bAdmin: req.oUser.admin,
				sUsername: req.oUser.username,
				bSuccess: true, 
				aItems: oData
			});

		});
	} else {		
		res.status(401).send({ 
			bSuccess: false, 
			sMessage: 'Unathorized Access'
		});		
	}
});

router.post('/', function(req, res) {

	if(req.session.userID) {

		console.log('shop order:', req.body);

		User.find({ _id: req.session.userID }).exec(function(err, users) {

			var user = users[0];

			User.findByIdAndUpdate(user._id, 
				{ $push: { "orders": { items: req.body } } },
				{ 'new': true, upsert: false }
			, function(err, oUser) {
	
				res.send({ bSuccess: true, bMessage: 'Order successful!' });	

			});
			
		});	

	} else {

		res.send({ bSuccess: false, bMessage: 'Order failed!' });	

	}
	
});


module.exports = router;