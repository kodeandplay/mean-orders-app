var router = require('express').Router(),
	Item = require('../models/item'),
	User = require('../models/user');

router.get('/', function(req, res) {
	console.log('session:', req.session);
	Item.find({}).exec(function(err, oData) {

		res.send({ 
			bSuccess: true, 
			aItems: oData
		});

	});
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

				console.log('user:', oUser);	
				res.send({ bSuccess: true, bMessage: 'Order successful!' });	

			});
			
		});	

	} else {

		res.send({ bSuccess: false, bMessage: 'Order failed!' });	

	}
	
});


module.exports = router;