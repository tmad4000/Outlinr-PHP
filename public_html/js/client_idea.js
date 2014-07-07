$(document).ready(function() {
	alert(window.location);
  	new Share(".share-button", {
  		title: "IdeaJoin",
  		url: "window.location",
  		text: "Idea text",
	  	networks: {
	    	facebook: {
	      		app_id: "822253967785867"
	    	}
	  	}
	});
});