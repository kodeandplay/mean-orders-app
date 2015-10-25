var db = require('../db');

var ItemSchema = db.Schema({
  	name: { type: String, required: true },
  	price: { type: Number, default: 0 }
});

module.exports = db.model('Item', ItemSchema, 'item');
