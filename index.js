const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const AvoShopper = require("./avo-shopper");
const pg = require("pg");
const Pool = pg.Pool;
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3019;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

const connectionString = process.env.DATABASE_URL || 'postgresql://avos:avos123@localhost:5432/avo_shopper';

const pool = new Pool({
	connectionString
});

const avoshopper = AvoShopper(pool);

// add more middleware to allow for templating support
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

let avodeals;
let avo;

app.get('/', async function (req, res) {
	try {
		avodeals = await avoshopper.topFiveDeals();
	} catch (error) {
		console.log(error);
	}
	res.render('index', {
		avodeals
	});
});

app.get('/screens/viewshops', async function (req, res) {
	try {
		avo = await avoshopper.listShops();
	} catch (error) {
		console.log(error);
	}
	res.render('screens/viewshops', {
		avo
	});

});

app.get('/screens/viewdeals', async function (req, res) {
	try{

	} catch (error) {
		console.log(error);
	}

	res.render('screens/viewdeals')
});

app.get('/screens/addshops', async function (req, res) {
	try{

	} catch (error) {
		console.log(error);
	}

	res.render('screens/addshops')
});

app.post('/screens/addshops', async function (req, res) {
	try{
		await avoshopper.createShop(req.body.shop_name);
	} catch (error) {
		console.log(error);
	}

	res.redirect('/screens/viewshops')
});

app.get('/screens/adddeals', async function (req, res) {
	try{
		const shopId = req.body.shop_id;
		const qty = req.body.qty;
		const price = req.body.price;


		await avoshopper.createDeal(shopId, qty, price)
		

	} catch (error) {
		console.log(error);
	}
	res.render('screens/adddeals')
});

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
	console.log(`AvoApp started on port ${PORT}`)
});