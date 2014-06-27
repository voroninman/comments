var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

var comments = {
	12: [
		{ id: 1, avatar: 'http://cs412421.vk.me/v412421969/4f91/PXo95bHZaZI.jpg', name: 'Nikolay Antokhov', content: 'Some comment first! And I think it\'s the best comment of the best comment of the world!'},
		{ id: 2, avatar: 'http://cs416128.vk.me/v416128311/5848/3pdvMQNsMIU.jpg', name: 'Betman Rods', content: 'Very good product! I found new volume in few minutes at my home?'},
		{ id: 3, avatar: 'http://cs9402.vk.me/v9402725/ed3/pnBkaLvGoao.jpg', name: 'Some Cat', content: 'Where I can buy it?? Or when this comment cakes with apple and banana style.'},
		{ id: 4, avatar: 'http://cs618727.vk.me/v618727925/c92b/I2NxNww4Mh8.jpg', name: 'Johny Walker', content: 'I can give you 300$ for it and drink after moon Ahahahahaha!'}
	],
	23: [
		{ id: 5, avatar: 'http://cs320325.vk.me/v320325725/9482/9t1x7J4aqK0.jpg', name: 'Penny Grow', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{ id: 6, avatar: 'http://cs322427.vk.me/v322427725/178a/b4zWfZxXqnQ.jpg', name: 'Monika Gill', content: 'Very good product! I found new volume in few minutes at my home?'}
	]
};

app.get('/products/:id/comments', function(req, res){
	var postID = parseInt(req.param('id'), 10);

  res.send(comments[postID]);
});

app.post('/products/:id/comments', function(req, res){
	var postID = parseInt(req.param('id'), 10);

	if ( comments[postID] == undefined )
		comments[postID] = [];

	req.body.avatar = 'http://cs613516.vk.me/v613516312/15490/OH6sXMsNhCk.jpg';
	req.body.name = 'Invoke Person';

	comments[postID].push({ avatar: req.body.avatar, name: req.body.name, content: req.body.content });
  res.send(200);
});

app.listen(3000, 'xyi.com');

console.log('Listening to http://localhost:3000');
