const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Logger = require('js-logger');

Logger.useDefaults();

app.use(express.static(`${__dirname}/public`))

app.get('/', function(req, res){
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, function(){
  Logger.info('listening on *:3000');
});

io.on('connection', function(socket){

	Logger.info('a user connected');

	socket.on('disconnect', function(){
		Logger.info('user disconnected');
	});
	socket.on('message', function(msg){
		Logger.info(`message:: ${msg}`);
		io.emit('onchatlog',{msg});
	});
  });