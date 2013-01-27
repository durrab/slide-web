define(function(require) {
	var Backbone = require('backbone');
	var template = require('hbs!../../tmpl/newdeck');
	var DeckView = require('view/deck')
	var Deck = require('model/Deck')
	var View =  Backbone.View.extend({
	  template: template,
	  collection: null,
	  initialize: function(){
	  
	  this.collection.fetch();
	  this.render();
	  
	  $("#add_button").click(_.bind(this.onAddButtonClick,this));
	  
        },
        onAddButtonClick: function(event){
        	
        var deckTitle = $("#title_input").val();
	var deckId = $("#id_input").val();
	var deckAuthor = $("#author_input").val();
	this.collection.fetch();		  	
	var DeckModel = Backbone.Model.extend({
	                urlRoot: '/decks',
		        defaults: {
				     deckId: '',
				     deckTitle: '',
				     author: ''
		        	},
		        	save: function(attrs, options) {
						          options || (options = {});
						  
						          options.contentType = 'application/json';
						          options.data = JSON.stringify(attrs);
						  	  //alert("data " + options.data);
						          Backbone.Model.prototype.save.call(this, attrs, options);
						   }
				        
		    		});
		    		
		    		var deckDetails = {  deckId: deckId, deckTitle: deckTitle, author:deckAuthor};
		    		var deck = new DeckModel();
		    		
			  	reply = deck.save(deckDetails,{
			  	
			  	 success: _.bind(function(deck,response){
			  	        var newId = deck.get("id");
			  	        var newTitle = deck.get("title");
			  	        var newAuthor = deck.get("author");
			  	        var newDeck = new Deck({id:newId, title:newTitle, author:newAuthor,slides: [{title:"Durrab Web Deck"}, {title: "Durrab Mobile!"}, {title: "Durrab End!"}]});
			  	        this.collection.add(newDeck);
			  		alert(deck.get('id'));
			  	 },this),
			  	 error: function(){
				        alert("Error Occured: " + reply.statusText);
		                }
			  	
	  	});
        
        },
	   render: function() {
	  	    this.el = this.template();
	  	    $('#headTitle').text("Add New Deck");
	  	    $('.content').html(template);
	  	   // return this;
	  },
	  events: {
	  	   "click button#add_button": "addNewDeck"
	  	  },
	 addNewDeck: function( event ){
	  	alert("This is Awsome");
	  }
	  
	});
	
	return View;
});