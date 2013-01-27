var decks = require("../model/deck");
var prez = require("../model/pres");
var _ = require("underscore");

exports.prez = function(req, res) {
  res.json(prez);
};

exports.pres = function(req, res) {
  var id = req.params.id;
  res.json(prez[id]);
};

exports.decks = function(req, res) {
  res.json(decks);
};

exports.deck = function(req, res) {
  var id = req.params.id;
  res.json(decks[id]);
};

exports.newdeck = function(req, res) {

 var deckId = req.param('deckId', null);
 var deckTitle = req.param('deckTitle', null);
 var deckAuthor = req.param('author', null);
 console.log("req: " + deckAuthor); 
 
 
 res.json({ id: deckId, title: deckTitle, author: deckAuthor});
 
};



exports.slide = function(req, res) {
  var id = req.params.id;
  var num = req.params.num;
  var slide = _.clone(decks[id]);
  slide.slides = [slide.slides[num]];
  res.json(slide);
};
