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

router.put('/item', function(req, res) {

	Item.find({ _id: req.body._id }, function(err, items) {

		if(err || items.length < 1) {
			console.log('Error or not matching item found:', err);
			return res.send({ bSuccess: false });
		}

		var item = items[0];

		item.name = req.body.name;
		item.price = req.body.price;
		item.tags = req.body.tags;

		item.save(function(err, updatedItem) {

			if(err) {
				console.log('Error updating item:', err);
				return res.send({ bSuccess: false, bMessage: 'Item not updated' });
			}


			console.log('updatedItem:', updatedItem);
			res.send({ bSuccess: true, bMessage: 'Item updated successfully', updatedItem: updatedItem });

		});

	});

});

module.exports = router;

































