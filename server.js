var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one' : {
	title: 'Article 1 | Rahul Parwal',
	heading: 'Article One',
	date: 'Sep 5 , 2016',
	content: 'Hello 1',
	},
	'article-two' : {
	title: 'Article 2 | Rahul Parwal',
	heading: 'Article Two',
	date: 'Sep 25 , 2016',
	content: 'Hello 2',
	},
	'article-three' : {
	title: 'Article 3 | Rahul Parwal',
	heading: 'Article Three',
	date: 'Sep 15 , 2016',
	content: 'Hello 3',
	}
};
function createTemplate(data)
{
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate = `
		<html>
			<head>
				<title>
					${title}
				</title>
		<link href ="/ui/style.css" rel="stylesheet"/> 
			</head>
			<body>
			<div class="container">
				<div>
					<a href = '/'>Home</a>
				</div>
			<hr/>
			<h3>
				${heading}
			</h3>
			<div>
				${date}
			</div>
				${content}
			</div>
			</body>    
		</html>
		`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req,res) {
	counter = counter + 1;
	res.send(counter.toString());
});


app.get('/:articleName', function (req, res) {
 //articleName == article-one or article-two or article-three
 // articles[articleName]== {} content object for article one.
 var articleName = req.params.articleName;
 res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/RP.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'RP.jpg'));
});

var names = [];
app.get('/submit-name/:name', function (req, res) {
  var name = req.params.name;
  names.push(name);
  //JSON = JAVA SCRIPT OBJECT NOTATION
  res.send(JSON.stringify(names));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
