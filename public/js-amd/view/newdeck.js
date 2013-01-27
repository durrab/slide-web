define(function(require) {
	var Backbone = require('backbone');
	var template = require('hbs!../../tmpl/newdeck');
	var DeckView = require('view/deck');
	var Deck = require('model/Deck');
	var Slide = require('model/Slide');
	var View =  Backbone.View.extend({
	  template: template,
	  collection: null,
	  router: null,
	  initialize: function(){
	  
	  this.collection.fetch();
	  this.render();
	  
	  $("#add_button").click(_.bind(this.onAddButtonClick,this));
	  $("#add_slide").click(_.bind(this.onAddSlideButtonClick,this));
        },
        onAddSlideButtonClick: function(event){
                var list = $("#slideList");
                list.append("<li>"+$("#slide_input").val()+"</li>");
              
              
              
        }
        ,
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
			  	        
			  	        var list = $("#slideList");
                			var listItems = list.children();
                			var deckSlides = [listItems.length];
                			
                			$.each(
					listItems,
					function( index, objValue ){
					 
					    var slide = new Slide({title: objValue.innerHTML});
					    deckSlides[index] = slide;
					
					});
			  	        
			  	        var newDeck = new Deck({id:newId, title:newTitle, author:newAuthor,slides: deckSlides});
			  	        this.collection.add(newDeck);
			  	        Backbone.history.navigate('decks/'+deck.get("id"), true); 
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