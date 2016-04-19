var express = require('express');
var https = require('https');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.set('port',80);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/mail', function(request, response) {debugger;
    var mailOptions = {
	  	from: 'guest@bawali.com',
	  	to: 'wtjose@gmail.com',
	  	subject: 'Bawali Customer Question',
	  	text: 'Question from customer',
	  	html: '<div>Name: '+request.body.name+'</div><div>Email :'+request.body.email+'</div><div>Message: '+request.body.message+'</div>'
    };
    var postOptions = {
	  	host: 'winmail.herokuapp.com',
	  	port:'443',
	  	path: '/mail',
	  	method: 'POST',
	  	headers: {
	  		'Content-Type' : 'application/json'
	  	}
	}
  	var req = https.request(postOptions, function(res) {
  		var result= '';
  		res.on('data', function(chunk){
  			result+=chunk;
  		})
  		res.on('end', function(){  			
  			console.log(result)
  		})
  		res.on('error', function(err){
  			console.log(err)
  		})
  	})
  	req.write(JSON.stringify(mailOptions))
  	req.end()
  	response.send({'result':'success'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


