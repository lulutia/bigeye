var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var mongoose = require('mongoose');
var EventProxy = require('eventproxy');

var app = express();
var router = express.Router();
var ep = new EventProxy();
var db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myMovie');
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(require('path').join(__dirname, 'app')));
app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

var topList = [];
var MovieSchema;
var MovieModel;
var MovieSchema = new mongoose.Schema({
	page: Number,
	items: [{
		name: String,
		imgUrl: String,
		other: String
	}],
});
var MovieModel = db.model('Movie', MovieSchema);
var initDb = false;

db.once('open', function() {
	for (var i = 0; i < 2; i++) {
		var url = 'https://movie.douban.com/top250?start=' + (i * 25) + '&filter=';
		topList.push(url);
	};
	app.get('/', function(req, res, next) {
		initData();
		ep.after('getTopList', topList.length, function() {
			MovieModel.find({
				page: 0
			}, function(err, docs) {
				if (err) {
					console.log(err);
				}
				res.sendFile('main.html', {
					root: __dirname + '/app'
				});
			});
		});
	})
})

function initData() {
	MovieModel.remove().exec();
	topList.forEach(function(topUrl, index) {
		superagent.get(topUrl)
			.end(function(err, res) {
				if (err) {
					console.log('error');
					return;
				}
				var items = [];
				var $ = cheerio.load(res.text);
				var title = $('.info .title:first-child');
				var img = $('.pic img');
				var otherInfo = $('.info .bd p');
				for (var titlei = 0; titlei < title.length; titlei++) {
					var item = {};
					item.name = $(title[titlei]).text();
					item.imgUrl = $(img[titlei]).attr('src');
					item.other = $(otherInfo[titlei]).text();
					items.push(item);
				}
				var moviePage = new MovieModel({
					page: index,
					items: items
				});
				moviePage.save(function(err) {
					if (err) console.log(err);
				});
				ep.emit('getTopList');
			})
	})
	initDb = true;

}

router.get('/[^?]*', function(req, res, next) {
	if (!initDb) {
		initData();		
	} 
	res.sendFile('main.html', {
			root: __dirname + '/app'
		});
});

router.post('/*',function(req, res){
	if(req.url === '/app/index'){
		MovieModel.find({page:0}).exec(function(err, doc){
			res.json(doc);
		})
	}
	console.log('ss' + req.url);
})

app.use('/', router);


app.listen(3000, function() {
	console.log("done");
});