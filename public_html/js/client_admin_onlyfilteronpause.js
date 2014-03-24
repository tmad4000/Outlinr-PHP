var docReady=false;
var postsLoaded=false;
getPosts();

//getPosts() -> displayPosts() 

var filterTo=null;
var numFilterTos=0;

function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}

var isDefaultUsrHandle = true;
var setStatusRequest = null;
var setStatusRequestTimeout = null;
var setStatusRequestIdeaid = null;
var commentsModel = {};
var expandedComments = {};
var emailAddress;
var isAdmin = false;
$(document).ready(function() {
	

	isAdmin = $('#is-admin').val() === 'true';

	if(isAdmin) $('.brand').append('<i class="fa fa-envelope-o" id="emailicon"></i>');
	$('.row-fluid .span9').width(window.innerWidth-250-64+"px");
	$(window).resize(function() {
		$('.row-fluid .span9').width(window.innerWidth-250-64+"px");
	});
	getEmail();
	$('#emailicon').popover({
		placement:"bottom",
		title:"Notification email address",
//		content:"<input type='text' id='notificationemail' onchange='submitAndGetEmail()' onload='emailPopoverLoad()' placeholder='email'/>",
		html:true,
		content:function(){  return "<input type='text' id='notificationemail' onchange='submitAndGetEmail()' value='"+emailAddress+"' placeholder='email'/>"; }
	});




	function emailPopoverLoad(){
		
		$(this).val(emailAddress);
		$(this).focus();
	}
	
	$('#postform').submit(function() {
		numberOfIdeasVisible =0;	
		submitPostAndGetPosts();
		// never gets here
		return false;
	});
	$('#sortByDate').click( function(){
	    if(!$(this).hasClass('active')){
	        filterToggle = "Date";
	        $('#sortByUpvotes').removeClass('active'); 
	        $('#sortByStatus').removeClass('active'); 	        
	        $(this).addClass("active");
	        

	        displayPosts()
	    }
	});

	$('#sortByUpvotes').click( function(){
	    if(!$(this).hasClass('active')){
	        filterToggle = "Upvotes";
	        $('#sortByDate').removeClass('active'); 
	        $('#sortByStatus').removeClass('active'); 
	        $(this).addClass("active");	       		

	        displayPosts()        
	    }
	})

	$('#sortByStatus').click( function(){
	    if(!$(this).hasClass('active')){
	        filterToggle = "Status";
	        $('#sortByDate').removeClass('active');
	       	$('#sortByUpvotes').removeClass('active'); 
	        $(this).addClass("active");  		

	        displayPosts()        
	    }
	})

	initiateCookie();
	$('#usrname').change(function (){
       	 updateCookie()
	});
	$('#usrname').keyup(function (){
       	updateCookie()
	});
	$('#usremail').keyup(function(){

		if($('#usremail').val()=="" && $('#usrhandle').val()==""){
			isDefaultUsrHandle=true;
		}
		if(isDefaultUsrHandle){
			var defaultUsrHandle = $('#usremail').val();
			var emailBeginningI = $('#usremail').val().indexOf('@');
			if(emailBeginningI>=0){
				defaultUsrHandle = defaultUsrHandle.substr(0,emailBeginningI)
			}
			$('#usrhandle').val(defaultUsrHandle);
		}
		updateCookie()
	});
	$('#usremail').change(function(){
		if($('#usremail').val()=="" && $('#usrhandle').val()==""){
			isDefaultUsrHandle=true;
		}
		if(isDefaultUsrHandle){
			var defaultUsrHandle = $('#usremail').val();
			var emailBeginningI = $('#usremail').val().indexOf('@');
			if(emailBeginningI>=0){
				defaultUsrHandle = defaultUsrHandle.substr(0,emailBeginningI)
			}
			$('#usrhandle').val(defaultUsrHandle);
		}
		updateCookie()
	});
	$('#usrhandle').keyup(function(){
		isDefaultUsrHandle = false;
		if($('#usremail').val()=="" && $('#usrhandle').val()==""){
			isDefaultUsrHandle=true;
		}
		updateCookie()
	});
	$('#usrhandle').change(function(){
		if($('#usremail').val()=="" && $('#usrhandle').val()==""){
			isDefaultUsrHandle=true;
		}
		updateCookie()
	});
	//Omnibox (input field) operations
	
	$('textarea#newpost').focus();
	$('textarea#newpost').keydown(function (event) {
		if(event.keyCode == 13){ // enter
        	event.preventDefault();
        }
	});
	$('textarea#newpost').keyup(function (event) {
		var newpostObj=$(this);
		
		
				
		// #TODO #Future trim repeated enters       
		if (event.keyCode == 13 && event.shiftKey) { // shift-enter
        	var content = this.value;
        	var caret = getCaret(this);
        	this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length);
        	event.stopPropagation();
        } 
        else if(event.keyCode == 13){ // enter
        	// removes the newline
        	var content = this.value;
        	var caret = getCaret(this);
        	//this.value = content.substring(0,caret-1)+content.substring(caret,content.length);
        	event.stopPropagation();
        	$('#postform').submit();
        }
        else {
        	if(rootNodeViewModel!==null){
				
				if(filterTo!==null&&numFilterTos>0){
					numFilterTos--;
					clearTimeout(filterTo);
					console.log("cancelled");
					
					
					filterTo=setTimeout(function() {
						numFilterTos--;
						rootNodeViewModel.filter(newpostObj.val() || "");
					},
					400);
				}
				else {
					filterTo=setTimeout(function() {
						rootNodeViewModel.filter(newpostObj.val() || "");
						
						filterTo=setTimeout(function() {
							numFilterTos--;
						}, 300);
					}, 100);
				}
				
				numFilterTos++;
				
				
        	}
        }
		
		 
    });
	$('textarea#newpost').change(function (event) {
		rootNodeViewModel.filter($(this).val());
		//#TODO never gets here

	});



	docReady=true;
	//if(localStorage.getItem("posts")!==null) {
	if(postsLoaded) {
		displayPosts();
	}

		/*
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	})
	
	$('#myTab a:last').tab('show');
	*/

});

//Handles new line (shift+enter) in the omnibox
function getCaret(el) { 
	if (el.selectionStart) { 
		return el.selectionStart; 
	} else if (document.selection) { 
		el.focus(); 

		var r = document.selection.createRange(); 
		if (r == null) { 
			return 0; 
		} 

		var re = el.createTextRange(), 
		rc = re.duplicate(); 
		re.moveToBookmark(r.getBookmark()); 
		rc.setEndPoint('EndToStart', re); 

		return rc.text.length; 
	}  
	return 0; 
}

//var entryList = null;
var rootNodeViewModel = null;

function displayPosts() {
	numberOfIdeasVisible =0;
	if (localStorage.getItem("posts") !== null){
		

		var jsonData = localStorage.getItem("posts");
		var rootNodeModel = $.parseJSON(jsonData)['treePosts'];

		rootNodeViewModel=new EntryNodeViewModel(rootNodeModel);

		//entryList = new EntryList(data);
		//var entrylist=entryNodeToHTML(data);
		//entryList = new EntryList(data);

		$("#currentposts").html("");
		$("#currentposts").append(rootNodeViewModel.render());
		$("div.status-box").click(function(e) {
			e.preventDefault();
			if(isAdmin)
				cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});
		
		$("div.delete > a").click(function(e) {
			e.preventDefault();
			var r=confirm("Are you sure you want to delete "+$(this).closest('.entryNode').find("a.ideaname").text() + "?");
			if (r)
				deleteNode($(this).closest('.entryNode').attr('-idea-id'));
			
		});
		$(".ideaTxt").on("click","div.delete-comment > a",function(e) {
			e.preventDefault();
			var r=confirm("Are you sure you want to delete "+$(this).closest('li').find(".comment-text").text() + "?");
			if (r){
				deleteComment($(this).closest('li').find(".comment-text").attr('-comment-id'),$(this).closest('.entryNode').attr('-idea-id'));	
			}
			
		});		
		
		/*$(".entryNode table").hover (function() {
			$(this).find('div.delete > a').fadeIn();
		},function() {
			$(this).find('div.delete > a').hide();
		});)*/
		
		/*$(".star-off").click(function() {
			console.log(t=$(this))
			$(this).toggleClass("star-on");
			//cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});*/

		$('.showcomments > a').click(function(e){
			e.preventDefault();
			//$(this).parent().find('.commentform').toggle();
			var idS=$(this).closest('.entryNode').attr('-idea-id');
			//console.log("qqq" + idS)
			if(!(idS in expandedComments)) {
			//	console.log("eue")
				expandedComments[idS]=1;
			}
			else {
			//	console.log("hhh")
				delete expandedComments[idS];
			}
			getComment(idS);
		});
		$('.commentsinput').keydown(function (event) {
			if(event.keyCode == 13 && !event.shiftKey){ // enter
	        	event.preventDefault();
	        }
		});
		$('.commentsinput').keyup(function(e){
			e.preventDefault();
			if (event.keyCode == 13 && event.shiftKey) { // shift-enter
	        	
	        	event.stopPropagation();
	        } 
			else if(event.keyCode == 13) { // enter
				var content = this.value;
        		var caret = getCaret(this);
        		//this.value = content.substring(0,caret-1)+content.substring(caret,content.length);
	        	//below unneeded if using text input
	        	// removes the newline
	        	/*var content = this.value;
	        	var caret = getCaret(this);
	        	this.value = content.substring(0,caret-1)+content.substring(caret,content.length);
	        	*/
	        	event.stopPropagation();
				//$(this).parent().find('.commentform').toggle();
				var idS=$(this).closest('.entryNode').attr('-idea-id');
				//console.log("qqq" + idS)
				submitAndGetComments(idS);
			}

		});

		// Right hand bar
		displayIdeaNames();
		// Voting click
		$('td.votes').click(function() {
			$(this).children('.vote').toggleClass('on'); 
			var num=$(this).children('span.votes').html()-0; 
			if ($(this).children('.vote').hasClass('on')) {
				num+=1;
				$(this).children('span.votes').html(num) 
				doUpvote($(this).attr('-idea-id')-0,'up');
			}
			else {
				num-=1;
				$(this).children('span.votes').html(num) 
				doUpvote($(this).attr('-idea-id')-0,'down');
			}
			
		});
		$('.comment-upvote').click(function() {
			var num=$(this).html()-0; 
			$(this).toggleClass('on'); 
			if ($(this).hasClass('on')) {
				num+=1;
				$(this).html(num);

				doUpvoteComment($(this).parent().parent().find('.comment-text').attr('-comment-id')-0,'up');
			}
			else {
				num-=1;
				$(this).html(num);

				doUpvoteComment($(this).parent().parent().find('.comment-text').attr('-comment-id')-0,'down');
			}
		});

		// Voting hover status
		$("[rel='popover']").popover({
			trigger: "hover", 
			//placement: 'top', IDEALLY want this but it goes wrong
			offset: 10,
			html:true
		});
	
	}

	//ADD #JQUERY HERE
	$('a.suggname').click(function(e){
		e.preventDefault();
	});

	//fix offset
	$('#ideanames li a').click(function(e){	
		e.preventDefault();
		//$('#newpost').val('');

		var targetName=$(e.target).attr('href').substr(1);
		if($('[-idea-id="'+targetName+'"]').css('display')=='none'){
			numberOfIdeasVisible+=1;
			updateNrOfIdeasVisible()
		}
		$('[-idea-id="'+targetName+'"]').show();
		

		var offset = $($("a[name='"+targetName+"']")).offset();
		var scrollto = offset.top - 57; // fixed_top_bar_height = 50px
		$('html, body').animate({scrollTop:scrollto}, 0);
	});
	
	$('.ideatags a, .peopletags a').click(function(e){	
		e.preventDefault();

		var targetName=$(e.target).html();
		$('#newpost').val(targetName).focus();
		rootNodeViewModel.filter(targetName);
	});


	
    rootNodeViewModel.filter($('textarea#newpost').val());
}
// Now implemented through an EntryNodeViewModel object and the .filter method
/*function filterIdeas(query){//#TODO 
	query = removeCommonWords(query.replace(/[^a-zA-Z0-9# ,\r\n]/gi,"").toLowerCase());
	query = query.split(/[\r\n ,]+/);

	$('#currentposts > ul.entryNode > li > ul.entrylist > li .entryNode').each(function(){
		var h=true;
		var itN=$(this).find('td.ideaTxt');
		var pid=itN.children(".ideaname").attr('name');
		var it=itN.text();
		var tem=new EntryNodeTextViewModel(it,pid);

		for(var i=0;i<query.length;i++){
			var mi = it.toLowerCase().indexOf(query[i]);

			if(mi>=0&&query[i]!=""){//ignore empty strings from query
				
				tem.setBold(mi,query[i].length);
				var r = tem.render();
				itN.html(r); //TODO add third param to this, pass whether bold or not so we can put it inside.
				//console.log(itN.html().replace('a','%'));
				h=false;
			}
		}
		if(!h||(query.length==1 && query[0]=="")) $(this).css('display','inherit'); 
		else $(this).css('display','none');
	});

}*/

function displayIdeaNames() {
	if (localStorage.getItem("posts") !== null){
		var jsonData = localStorage.getItem("posts");
		var data = $.parseJSON(jsonData)['flatPosts'];
		var nameul = $('ul#ideanames').empty();
		var tags={};
		var hashtags={};
		var peopletags={};
		
		getComments();
		var cs = $.parseJSON(localStorage.getItem("comments"));
		// idea names 
		// Idea Names by Upvotes
		var sortable = [];
		$.each( data,function(i,data){
			
			var n=extractIdeaName(data.body);
			var h=extractHashes(data.body);
			var t=extractTildes(data.body);
			// idea hashtags
			if(h){
				$.each(h,function(i,tag) {
					if(typeof hashtags[tag] != 'undefined')
						hashtags[tag] = parseInt(hashtags[tag])+1;
					else
						hashtags[tag] = 1;
					tags[h] = true;
				});
			}
			if(t){
				$.each(t,function(i,tag) {
					if(typeof peopletags[tag] != 'undefined')
						peopletags[tag] = parseInt(peopletags[tag])+parseInt(data.upvotes);
					else
						peopletags[tag] = data.upvotes;
					tags[t] = true;
				});
			}

			sortable[data.pid] = [n,data.upvotes.toString(),data.pid.toString()];
		});

		$.each( cs,function(i,cs){
			
			var n=extractIdeaName(cs.comment_text);
			var h=extractHashes(cs.comment_text);
			var t=extractTildes(cs.comment_text);
			// idea hashtags
			if(h){
				$.each(h,function(i,tag) {
					if(typeof hashtags[tag] != 'undefined')
						hashtags[tag] = parseInt(hashtags[tag])+1;
					else
						hashtags[tag] = 1;
					tags[h] = true;
				});
			}
			if(t){
				$.each(t,function(i,tag) {
					if(typeof peopletags[tag] != 'undefined')
						peopletags[tag] = parseInt(peopletags[tag])+parseInt(cs.upvotes);
					else
						peopletags[tag] = cs.upvotes;
					tags[t] = true;
				});
			}

			// Could list comments here
			//sortable[data.pid] = [n,data.upvotes.toString()]; 
		});

		sortable.sort(function(a, b) {return b[1] - a[1]})
		for(var i =0;i<sortable.length;i++){
			if(typeof sortable[i] == 'undefined') break;
			nameul.append('<li><a href="#'+sortable[i][2]+'">'+sortable[i][0] +/*' <span class="badge">'+sortable[i][1]+'</span>'+*/'</a></li>');
		}

		/* Idea Names by Recent
		$.each( data,function(i,data) {
			var n=extractIdeaName(data.body);
			var h=extractTags(data.body);
			// idea hashtags
			if(h)
				$.each(h,function(i,tag) {tags[tag]=true;});

			nameul.append('<li><a href="#'+data.pid+'">'+n + '</a></li>');

		});
		*/
		var hashtagssorted = [];
	    for (var key in hashtags)
	    	hashtagssorted.push([hashtags[key],key]);
	    hashtagssorted.sort(function(a, b) {return b[0] - a[0]}) 
	    var peopletagssorted = [];
	    for (var key in peopletags)
	    	peopletagssorted.push([peopletags[key],key]);
	   	peopletagssorted.sort(function(a, b) {return b[0] - a[0]}) 

	    

		localStorage.setItem("tags", tags);
		var tagsul = $('ul#idea-hashtags').empty();
		var tildesul = $('ul#people-list').empty();		
		for(var k=0;k<hashtagssorted.length;k++){
			//if(tag.substring(0,1)=="#")
			tagsul.append('<li><a href="#">'+hashtagssorted[k][1] + '</a> </li>');
		}
		for(var k=0;k<peopletagssorted.length;k++){
			var tag = peopletagssorted[k][1];
			var upv = peopletagssorted[k][0];
			if(upv>=200){
				tildesul.append('<li><span class="badge badge-200">'+upv+'pts</span> <a href="#">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=50){
				tildesul.append('<li><span class="badge badge-50">'+upv+'pts</span> <a href="#">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=30){
				tildesul.append('<li><span class="badge badge-30">'+upv+'pts</span> <a href="#">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=10){
				tildesul.append('<li><span class="badge badge-10">'+upv+'pts</span> <a href="#">'+tag + '</a> </li>'); //TODO
			}
			else if(upv==1){
				tildesul.append('<li><span class="badge">'+upv+'pt</span> <a href="#">'+tag + '</a> </li>'); //TODO
			}
			else
				tildesul.append('<li><span class="badge">'+upv+'pts</span> <a href="#">'+tag + '</a> </li>'); //TODO
		}

	}
}

//ajax
function doUpvote(ideaid,upOrDown) { 	
	$.ajax({
		'url': 'ajax/upvote.php?'+upOrDown+'=true',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {
			if(upOrDown=="up"){
				setCookie("i"+ideaid);
			}
			else {
				deleteCookie("i"+ideaid);
			}		
		},
	});
}

function doUpvoteComment(commentid,upOrDown) {
	$.ajax({
		'url': 'ajax/upvotecomment.php?'+upOrDown+'=true',
		'data': {'commentid':commentid},
		'success': function(jsonData) {
			if(upOrDown=="up"){
				setCookie("c"+commentid);
			}
			else {
				deleteCookie("c"+commentid);
			}
		},
	});
}


function cycleStatus(ideaid) {
	if(setStatusRequest !==null && setStatusRequestIdeaid==ideaid){
		setStatusRequest.abort();
	} 
	if(setStatusRequestTimeout !==null && setStatusRequestIdeaid==ideaid){
		clearTimeout(setStatusRequestTimeout);
	} 
	setStatusRequestIdeaid = ideaid;
	var x = $('.entryNode[-idea-id="'+ideaid+'"]').find('.status');
	var cn = 0;
	if(x.hasClass('sc0'))
		cn = 0;
	else if(x.hasClass('sc1'))
		cn = 1;
	else if(x.hasClass('sc2'))
		cn = 2;
	else if(x.hasClass('sc3'))
		cn = 3;
	else if(x.hasClass('sc4'))
		cn = 4;
	x.removeClass('sc'+cn);
	cn = (cn+1)%5;
	x.addClass('sc'+cn);
	setStatusRequestTimeout = setTimeout(function(){
		setStatusRequest = $.ajax({
			'url': 'ajax/setstatus.php',
			'data': {'ideaid':ideaid,'sts':cn},
			'success': function(jsonData) {
				console.log('gp');
				getPosts();
			},
		});
	},500);
	
	
}

function deleteNode(ideaid) {
	$('[-idea-id="'+ideaid+'"]').closest('li').hide();
	$.ajax({
		'url': 'ajax/deleteNode.php',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {
			getPosts();
		},
	});
}

function deleteComment(commentid,pid) {
	$('[-comment-id="'+commentid+'"]').closest('li').hide();
	$.ajax({
		'url': 'ajax/deleteComment.php',
		'data': {'commentid':commentid},
		'success': function(jsonData) {
			getPosts();
			getComment(pid);
		},
	});
}

function submitPostAndGetPosts() {
	//#HACK only usrhandle currently visible
	
	var name = $('#usrname').val()!=""? $('#usrname').val() : "0";
	//var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if($('#usremail').val()!="" && $('#usremail').val()!="" && name !='0'){
		var processedname = "<a href='mailto:"+$('#usremail').val()+"'>"+name+"</a>";
	}
	else {
		var processedname = name;
	}
	
	
	//+$('#usrhandle').val()+\
	//#hack
	var np = $('#newpost').val();
	var ind=np.indexOf('~'+$('#usrhandle').val());
	
	if($('#usrhandle').val()!="" && ind==-1) { //#bug -- doesn't catch included word
//		if(np.substr(ind+$('#usrhandle').val().length+1),1)
			
		np+=' ~'+$('#usrhandle').val();
	}
	
	/*var tag_regexp = /#([a-zA-Z0-9<>\-"&;”“]+)/g; //#todo relates to
	function extractTags(idea) {
    
    return idea.match(tag_regexp)
	*/
	


	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':getURLParameter("mapid"), 'newpost': np,'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrhandle').val()}, //#hack
		//'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val(),'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrname').val()},
		'success': function(jsonData) {
                 // todo: parse data and add into our table
                 localStorage.setItem("posts", jsonData);
                 
                 $('#newpost').val('');
                 displayPosts();
             },
         });
}


function getPosts() {
	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':getURLParameter("mapid"), 'newpost': ''},
		'success': function(jsonData) {
			localStorage.setItem("posts", jsonData);
			postsLoaded=true;
			if(docReady) {
				displayPosts();
			}
		},
	});
}

function getComment(pid) {
	$.ajax({
		'url': 'ajax/comment.php',
		'data': {'pid':pid},
		'success': function(jsonData) {
			commentsModel[pid]=$.parseJSON(jsonData);
			displayPosts();
			($('.entryNode [-idea-id="'+pid+'"]').find('textarea')[0]).focus();
		},
	});
}

function getComments() {
	$.ajax({
		'url': 'ajax/comment.php',
		'data': {'mapid':getURLParameter("mapid")},
		'success': function(jsonData) {
			localStorage.setItem("comments", jsonData);
		},
	});
}

function submitAndGetEmail(){

	$.ajax({
		'url': 'ajax/email.php',
		'data': {'notificationemail':$('#notificationemail').val(),'mapid':getURLParameter("mapid")},
		'success': function(jsonData) {
			emailAddress=$.parseJSON(jsonData).email;
			$('#notificationemail').val(emailAddress);
		},
	});
}

function getEmail(){
	$.ajax({
		'url': 'ajax/email.php',
		'data': {'mapid':getURLParameter("mapid")},
		'success': function(jsonData) {
			emailAddress=$.parseJSON(jsonData).email;
			$('#notificationemail').val(emailAddress);
		},
	});
}

function submitAndGetComments(pid) {


	var n=$('.entryNode[-idea-id="'+pid+'"]');
	var c =n.find('.commentsinput').first();
	var t = c.val();
	
	var ind=t.indexOf('~'+$('#usrhandle').val());
	if($('#usrhandle').val()!="" && ind==-1) { //#bug -- doesn't catch included word
//		if(np.substr(ind+$('#usrhandle').val().length+1),1)
		t+=' ~'+$('#usrhandle').val();
	}


	if(t) {
		$.ajax({
			'url': 'ajax/comment.php',
			'data': {'pid':pid,'comment_text':t,'mapid':getURLParameter("mapid")},
			'success': function(jsonData) {
				commentsModel[pid]= $.parseJSON(jsonData);

				displayPosts();
				// c.val(''); //Redundant?
			},
		});
	}
}



