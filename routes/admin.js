var router = require('express').Router(),
	Item = require('../models/item');

router.post('/item', function(req, res) {

	var item = new Item(req.body);

	item.save(function(err, newItem) {
		if(err) {
			console.log('Error newItem:', err);
			res.send({ bSuccess: false, bMessage: 'Item added unsuccessfully' });
		} else {
			res.send({ bSuccess: true, bMessage: 'Item added successfully', item: newItem });
		}
	});

});

module.exports = router;
