$(document).ready(function() {
  	new Share("#share", {
  		title: "IdeaJoin",
  		url: window.location,
  		text: "Idea text",
	  	networks: {
	    	facebook: {
	      		app_id: "822253967785867",
	    	}
	  	}
	});

	
});