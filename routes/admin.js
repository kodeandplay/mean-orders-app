var router = require('express').Router(),
	Item = require('../models/item');

router.post('/item', function(req, res) {

	var oItem = req.body;
	oItem.tags = oItem.tags.split(',').map(function(tag) { return tag.trim().toLowerCase() });
	var item = new Item(oItem);

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
