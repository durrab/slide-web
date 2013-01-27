define(function(require) {
	var Backbone = require('backbone')
	var DecksView = require('view/decks')
	var DeckList = require('collection/decks')
	var SlidesView = require('view/slides')
	var SlideView = require('view/slide')
	var Slide = require('model/slide')
	var NewDeck = require('view/newdeck');
	var Decks = new DeckList();
	return Backbone.Router.extend({
	    initialize: function() {
	      Backbone.history.start();
	    },  
	    routes: {
	      "": "decks",
	      "decks/:deckId": "deck",
	      "slides/:deckId/:num": "slide",
	      "newdeck": "addNewDeck",
	      "decks" : "newDeckRequest",
	       '*actions': 'defaultAction'
	     },
	    decks: function() {
	    	var decks = new DecksView({collection: Decks});
	    },
	    deck: function(deckId) {
	      if (Decks.length) return loadSlides();	      
	      Decks.fetch({success: loadSlides});
	      function loadSlides() {
	          new SlidesView({model: Decks.get(deckId)});
	      }
	    },
	    slide: function(deckId, num) {
	      if (Decks.length) return loadSlide();
	      Decks.fetch({success: loadSlide});
	      function loadSlide() {
	        var deck = Decks.get(deckId);
	        var slide = deck.get('slides')[num];
	        slide.deckId = deckId;
	        slide.num = num;
	        $('#title').text(slide.title);
	        var s = new Slide(slide);
	        var view = new SlideView({model: s});
	        $('.content').html(view.render().el);
	      }
	    },
	    addNewDeck: function(){
	    	var newdeck = new NewDeck({collection: Decks, router:this});
	    	
	    	
	    },
	    newDeckRequest: function(newdeck){
	    
	    	alert("We have Received Deck and Author is:  ");
	    
	    },
	    defaultAction: function(actions){
	    
	    	//alert("These are the default actions:  ");
	    
	    }
	});
});