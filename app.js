
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var fred = { User_ID: 61,
    FirstName: 'Fred',
    LastName: 'Flinstone',
    Email: 'flinstone@stone.org',
    Password: '$2a$10$27GjOhb8akIUbER6.l72jeWap9jA9R2EKKCytlvuUkwBrU/pEjKjy',
    Gender: null,
    Birthdate: 'Invalid Date' };

var george = { User_ID: 64,
    FirstName: 'George',
    LastName: 'Of The Jungle',
    Email: 'georgie@jungle.com',
    Password: '$2a$10$27GjOhb8akIUbER6.l72jeWap9jA9R2EKKCytlvuUkwBrU/pEjKjy',
    Gender: null,
    Birthdate: 'Invalid Date' };


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/ajax', function(request, response) {
	response.send({ text: 'Awesome!'});
});


app.get('/testing', function(request, response) {
  response.render('testing.jade', { title: 'Herro!', locals: { user: fred } });
});

app.post('/testing', function(request, response) {
  if(request.body.secretPassword === 'open seasame!') {
    response.redirect('/user/'+request.body.secretCode);
  }
});

app.get('/user/:id', function(request, response) {
  console.log('rawrrr!!!');
  console.log(request.params.id);
  if(request.params.id == '61')
    response.render('user.jade', { title: 'Greetings!', locals: { user: fred } });
  if(request.params.id == '64')
    response.render('user.jade', { title: 'Salutations!', locals: { user: george } });
  else 
    redirect('/');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
