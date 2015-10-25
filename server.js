var express = require('express'),
	redis = require('redis'),
	routes = require('./routes'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	bodyParser = require('body-parser'),
	app = express();

var client = redis.createClient();

client.on('connect', function() {
	console.log('Redis connection established');
});

client.on('error', function(err) {
	console.log('Error:', err);
});

app.use(express.static(__dirname + '/public'));
app.use(session({
	store: new RedisStore({
		host: 'localhost',
		port: 3679,
		client: client
	}),
	secret: 'supersecretkey',
	saveUninitialized: true,
	resave: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', routes.user);
app.use('/api/shop', routes.shop);

app.listen(3000, function() {
	console.log('Server listening on port %d', 3000);
});