var docReady=false;
var postsLoaded=false;
getPosts();

//getPosts() -> displayPosts() 

var numFilterTos=0;
var nextFilter=null;

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
var linksModel = {}; // TODO IS THIS REDUNDANT due to globalData
var emailAddress;
var isAdmin = false;
var globalData;

$(document).ready(function() {
	

	isAdmin = $('#is-admin').val() === 'true';

	if(isAdmin) {
		$('.brand').append('<i class="fa fa-bell-o" id="emailicon"></i>');
		
		$('#box-description-text').attr('contentEditable',true);
		$('[contenteditable]').on('focus', function() { // http://stackoverflow.com/questions/1391278/contenteditable-change-events
		    var $this = $(this);
		    $this.data('before', $this.html());
		    return $this;
		}).on('blur keyup paste', function() {
		    var $this = $(this);
		    if ($this.data('before') !== $this.html()) {
		        $this.data('before', $this.html());
		        $this.trigger('change');
		    }
		    return $this;
		});

		$('#box-description-text').change(editDesc);

		
	}
	
	

	$('.row-fluid .span9').width(window.innerWidth-250-64+"px");
	$(window).resize(function() {
		$('.row-fluid .span9').width(window.innerWidth-250-64+"px");
	});
	getEmail();
	$('#emailicon').popover({
		placement:"bottom",
		title:"Notification email address",
		//content:"<input type='text' id='notificationemail' onchange='submitAndGetEmail()' onload='emailPopoverLoad()' placeholder='email'/>",
		html:true,
		content:function(){  return "<input type='text' id='notificationemail' onchange='submitAndGetEmail()' onkeypress='hideOnEnter(event)' value='"+emailAddress+"' placeholder='email'/>"; }
	});
	$('body').on('click','.selectize-input div',function(){
		//expandidea
	});	

	function emailPopoverLoad(){
		
		$(this).val(emailAddress);
		$(this).focus();
	}

	
	$('.navbar-form').submit(function() {
		
		return false;
	});	
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

	$('#sortByStatus').click(function(){
	    if(!$(this).hasClass('active')){
	        filterToggle = "Status";
	        $('#sortByDate').removeClass('active');
	       	$('#sortByUpvotes').removeClass('active'); 
	        $(this).addClass("active");  		

	        displayPosts();       
	    }
	});
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
				
				
				var numIdeas=Object.keys(rootNodeViewModel).length
				
				var minQPer=30
				if(numIdeas>20)
					minQPer=200
				if(numIdeas>50)
					minQPer=400
					
				//c/onsole.log(numFilterTos)
				//if no filter pending
				if(numFilterTos<=0){
					rootNodeViewModel.filter(newpostObj.val() || "");
					
					setTimeout(function() {
						if(nextFilter!=null) {
							rootNodeViewModel.filter(nextFilter);					
							nextFilter=null;
						}
							
						numFilterTos--;
					}, minQPer);
					
					numFilterTos++;
				}
				//if filter pending
				else {
					nextFilter=newpostObj.val() || "";
				}
				
				
				
				
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

// Add events to the given post element. Pass postEl as $(document) to do the first initialization.
// Afterwards, if more posts are added (like in expanding linked children), just call this with the child's post element.
function setupNode(postEl) {
		postEl.find("span.status").click(function(e) {
			e.preventDefault();
			if(isAdmin)
				cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});

		postEl.find("span.status").mouseover(function(e) {
			e.preventDefault();
			if(isAdmin){
				$(this).css('text-decoration','underline');
				$(this).css('cursor','pointer');
			}
		});

		postEl.find("span.status").mouseout(function(e) {
			e.preventDefault();
			if(isAdmin){
				$(this).css('text-decoration','none');
			}
		});
		
		postEl.find("span.delete > a").click(function(e) {
			e.preventDefault();
			var r=confirm("Are you sure you want to delete "+$(this).closest('.entryNode').find("a.ideaname").text() + "?");
			if (r)
				deleteNode($(this).closest('.entryNode').attr('-idea-id'));
			
		});
		postEl.find(".ideaTxt").on("click","div.delete-comment > a",function(e) {
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
			$(this).toggleClass("star-on");
			//cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});*/

		postEl.find('a.showcomments').click(function(e){
			e.preventDefault();
			//$(this).parent().find('.commentform').toggle();
			var idS=$(this).closest('.entryNode').attr('-idea-id');

			toggleComment(idS);


//			getComment(idS);

		});

		postEl.find('.commentsinput').keydown(function (event) {
			if(event.keyCode == 13 && !event.shiftKey){ // enter
	        	event.preventDefault();
	        }
		});
		postEl.find('.commentsinput').keyup(function(e){
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
				submitAndGetComments(idS);
			}

		});


		postEl.find('td.votes').click(function() {
			var ideaid=$(this).attr('-idea-id')-0;

			$('td.votes[-idea-id='+ideaid+']').children('.vote').toggleClass('on'); 
			

			var num=$(this).children('span.votes').html()-0; 
			if ($(this).children('.vote').hasClass('on')) {
				num+=1;
				$(this).children('span.votes').html(num) 
				doUpvote(ideaid,'up');
			}
			else {
				num-=1;
				$(this).children('span.votes').html(num) 
				doUpvote(ideaid,'down');
			}
			
		});

		// TODO universalize
		postEl.on('click','.comment-upvote', function() {
			console.log('comment-upvote');
			var num=$(this).find('span').text()-0; 
			$(this).toggleClass('on'); 
			if ($(this).hasClass('on')) {
				num+=1;
				$(this).find('span').text(num);

				doUpvoteComment($(this).parent().parent().find('.comment-text').attr('-comment-id')-0,'up');
			}
			else {
				num-=1;
				$(this).find('span').text(num);

				doUpvoteComment($(this).parent().parent().find('.comment-text').attr('-comment-id')-0,'down');
			}
		});

		setupRel(postEl);
}
//var entryList = null;
var rootNodeViewModel = null;

function displayPosts() {
	numberOfIdeasVisible =0;
	if (localStorage.getItem("posts")){
		

		var jsonData = localStorage.getItem("posts");
		var rootNodeModel = $.parseJSON(jsonData)['treePosts'];

		rootNodeViewModel=new EntryNodeViewModel(rootNodeModel);


		getComments();

		//entryList = new EntryList(data);
		//var entrylist=entryNodeToHTML(data);
		//entryList = new EntryList(data);

		$("#currentposts").html("");
		var rootNodeView = $("#currentposts").append(rootNodeViewModel.render()).children('.entryNode');

		displayIdeaNames();

		setupNode($('body'));

		// TODO include in above
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
				h=false;
			}
		}
		if(!h||(query.length==1 && query[0]=="")) $(this).css('display','inherit'); 
		else $(this).css('display','none');
	});

}*/

function toggleComment(pid) {
	var cf=$('.commentform[-idea-id="'+pid+'"]');
	if(pid in expandedComments) { //hide
		delete expandedComments[pid];

		cf.removeClass('init-expanded').addClass('init-hidden');
	}
	else { // show
		console.log(e=$('.commentform[-idea-id="'+pid+'"]'))
		expandedComments[pid]=1;

		cf.removeClass('init-hidden').addClass('init-expanded');
		(cf.find('textarea')[0]).focus();
	}
}

function updateGlobalData(data) {
	globalData = {};
	for (var i = 0; i < data.length; i++) {
		globalData[data[i].pid] = data[i];
	}
}

function displayIdeaNames() {
	if (localStorage.getItem("posts")){
		var jsonData = localStorage.getItem("posts");
		var data = $.parseJSON(jsonData)['flatPosts'];
		//var nameul = $('ul#ideanames').empty();
		var tags={};
		var hashtags={};
		var peopletags={};
		console.log(x=data);
		updateGlobalData(data);
		

		var cs = $.parseJSON(localStorage.getItem("comments"));
		// idea names 
		// Idea Names by Upvotes
		var sortable = [];
		$.each( data,function(i,data){
			if(data.deleted_time === ""){
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
			}
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

		/* IDEAS ON RIGHTHAND BAR
		sortable.sort(function(a, b) {return b[1] - a[1]})
		for(var i =0;i<sortable.length;i++){
			if(typeof sortable[i] == 'undefined') break;
			nameul.append('<li><a href="#'+sortable[i][2]+'">'+sortable[i][0] +'</a></li>');
		}
		*/


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
			tagsul.append('<li><a href="#" onclick="hashtag(event)">'+hashtagssorted[k][1] + '</a> </li>');
		}
		for(var k=0;k<peopletagssorted.length;k++){
			var tag = peopletagssorted[k][1];
			var upv = peopletagssorted[k][0];
			if(upv>=200){
				tildesul.append('<li><span class="badge badge-200">'+upv+'pts</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=50){
				tildesul.append('<li><span class="badge badge-50">'+upv+'pts</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=30){
				tildesul.append('<li><span class="badge badge-30">'+upv+'pts</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
			}
			else if(upv>=10){
				tildesul.append('<li><span class="badge badge-10">'+upv+'pts</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
			}
			else if(upv==1){
				tildesul.append('<li><span class="badge">'+upv+'pt</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
			}
			else
				tildesul.append('<li><span class="badge">'+upv+'pts</span> <a href="#" onclick="hashtag(event)">'+tag + '</a> </li>'); //TODO
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

function submitPostAndGetPosts(newPostText) {
	var boxtoclear=false;
	if(typeof newPostText === "undefined") {
		newPostText=$('#newpost').val();
		boxtoclear=$('#newpost');
	}


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
	var np = newPostText;
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
		'data': {'mapid':getURLParameter("mapid"), 'newpost': np,'ideatitle': extractIdeaName(newPostText),'uid' : $('#usrhandle').val()}, //#hack
		//'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val(),'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrname').val()},
		'success': function(jsonData) {
                 // todo: parse data and add into our table
                 localStorage.setItem("posts", jsonData);
                 
                 if(boxtoclear)
	                 boxtoclear.val('');

                 displayPosts();
             },
         });
}


function submitPostAndGetPostsAndLink(newPostText,source) {
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
	var np = newPostText;
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
		'data': {'tid':-1,'pid':source, 'mapid':getURLParameter("mapid"), 'newpost': np,'ideatitle': extractIdeaName(extractIdeaName(newPostText)),'uid' : $('#usrhandle').val()}, //#hack
		//'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val(),'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrname').val()},
		'success': function(jsonData) {
                 // todo: parse data and add into our table
                 // localStorage.setItem("posts", jsonData);
                 
                 // displayPosts();
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

			var cs = $.parseJSON(localStorage.getItem("comments"));
			$.each(cs,function(i,comment) {
				if(!(comment.pid+"" in commentsModel))
					commentsModel[comment.pid] = [];
				commentsModel[comment.pid].push(comment);				
			})
			rootNodeViewModel.loadCommentsRecurs();

		},
	});
}

function editDesc(){

	$.ajax({
		'url': 'ajax/api.php', //#todo
		'data': {'mapdesc':$('#box-description-text').text(),'mapid':getURLParameter("mapid")},
		'success': function(jsonData) {
			var t=$.parseJSON(jsonData).email;
			//$('#box-description-text').val(t);
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


//#todo
function hideOnEnter(event){
	if(event.keyCode == 13) //enter key
		$(this).popover('hide');
	//console.log(this)

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
	c.val('');

	var ind=t.indexOf('~'+$('#usrhandle').val());
	if($('#usrhandle').val()!="" && ind==-1) { //#bug -- doesn't catch included word
		// if(np.substr(ind+$('#usrhandle').val().length+1),1)
		t+=' ~'+$('#usrhandle').val();
	}

	//
	if(t) {
		$.ajax({
			'url': 'ajax/comment.php',
			'data': {'pid':pid,'comment_text':t,'mapid':getURLParameter("mapid")},
			'success': function(jsonData) {
				commentsModel[pid]= $.parseJSON(jsonData); //optimistic
				rootNodeViewModel.loadCommentsRecurs();
				/*displayPosts();
				*/
				// c.val(''); //Redundant?
			},
		});
	}
}

//bidirectional so order doesn't matter; takes ids
function linkEntryNodes(source,target) {
	if(typeof source==="undefined")
		console.log("link source undefined")
	if(typeof target==="undefined")
		console.log("link target undefined")

	linkEntryNodesAjax(source,target);

	linkEntryNodesFE(source,target);
}

function linkEntryNodesFE(source,target) {

	var label=createSetupLabel(target);

	//forward link
	$('.entryNode[-idea-id="'+source+'"]').find('.suggest-labels').eq(0).append(label);
	
	//backlink
	var label2=createSetupLabel(source);
	$('.entryNode[-idea-id="'+target+'"]').find('.suggest-labels').eq(0).append(label2);
}

function linkEntryNodesAjax(source,target) {

	// TODO failure case
	$.ajax({
		'url': 'ajax/link.php',
		'data': {'pid':source,'tid':target},
		'success': function(jsonData) {
			
		},
	});
}


//helper method; tid needs be int
function createSetupLabel(tid) {
	
	var title=globalData[tid].title;
	var label = $('<li><a href="#" -idea-id="'+tid+'">' + title + '</a></li>');
	label.click(function (e) {
		e.preventDefault();
		var post = globalData[tid];
		if (post) { // TODO a post should always exist. Assert this.
			// var copy = $(this).parents('.entryNode').clone();
			var parent = $(this).closest('.entryNode').eq(0);
			expandRelated(parent, post, this);
		} else {
			console.log('ERROR: There is no such post');
		}
	});
	return label;
}				

// postEl should be an entryNode
//sets up typeahead and related idea links on a node
function setupRel(postEl) {

	//load rels on each node
	var allNodesBelowElView = postEl.find('ul.entryNode').add(postEl);

	//iterate over nodes
	$.each(allNodesBelowElView, function(index, nodeView){
		nodeView = $(nodeView);
		var nodeId = nodeView.attr('-idea-id');

		if (isNaN(nodeId)) return; //skip if rootnode
		//nodeId===""||nodeId===null||nodeId === 'null') return; 

		var nodeModel = globalData[parseInt(nodeId)];
		if (typeof nodeModel==="undefined")
			console.log("ERROR: node id not found in model: " + nodeId);

		var labels = nodeView.find('.suggest-labels').eq(0);
		labels.html("");

		//load related node links
		$.each(nodeModel.relEntryIds, function(i, rel){
			if(rel.deleted_time === null){ 
				var relName = "";  //#remove?
				var destNode = null;

				destNode = globalData[rel.target];

				if(!(destNode === undefined)){
					var label=createSetupLabel(destNode.pid);
					labels.append(label);
				}
				else {
					console.log(rel.target+' target is not loaded');					
					// TODO showing vertical line... delete or find link?
				}
			}
			else
				console.log("backend not filtering deleted rels")
		});
	});


	//setup typeahead

	var getSuggestions = function (queryString, callback) {
		if (localStorage.getItem("posts")){
			// TODO [3/4 done] make this a backend query; for now I'll just match on some random posts
			
			var jsonData = localStorage.getItem("posts");
			var data = $.parseJSON(jsonData)['flatPosts']; // TODO #later refactor to use globaldata
			var somePosts=data;

			// var somePosts = [{title: 'idea title', description: 'the best idea ever', pid: 751},
			// {title: 'title 3', description: 'third best idea', pid: 50},
			// {title: 'title 2', description: 'second best idea', pid: 750}]

			var matches = [];
			var regex = new RegExp(queryString, 'i');
			
			//c onsole.log("oeu",somePosts)
			
			$.each(somePosts, function (i, post) {
				if (regex.test(post.title) || regex.test(post.description)) {
					matches.push(post);
				}
			});
			callback(matches);
		}
		else
			console.log("nullpoststypeahead")
	}

	var selectRel = function (el, suggestion) {
		var sourceId=parseInt(el.closest('.entryNode').attr('-idea-id'));
		var newSugg=false;

		// TODO decide whether to add to entry list in real time
		if (suggestion === undefined) {
			newSugg=true;
			// TODO make a call to the server to add this suggestion. Add the 
			//  pid to the globalData array, and set that pid here, instead of -1

			var newEntryTxt=el.typeahead('val');
			//suggestion = {title: newEntryTxt.substr(0,50),body: newEntryTxt, pid: -1};
			// todo time
			suggestion={title: newEntryTxt.substr(0,50),body: newEntryTxt, pid: -1,children: [],deleted_time: "",metric: "",num_comments: "0",parent: "0",path: "",progress: "",relEntryIds: [],status: "0",upvotes: "0"};
			//#bug starts upvoted if parent is

			submitPostAndGetPostsAndLink(suggestion.body,sourceId);


			var allKeys=Object.keys(globalData);
			var newTmpFrontendPid=parseInt(allKeys[allKeys.length-1])+1;
			console.log(allKeys)
			suggestion.pid=newTmpFrontendPid;
			console.log(suggestion.title)

			globalData[newTmpFrontendPid]=suggestion;


			console.log('TODO add post to backend');
		} else {
			if (!(suggestion.pid in globalData)) {
				// TODO query this post from the server. It's better to do it here, before someone
				//  clicks the link that this function is making, such that when that link is
				//  clicked, the post can load automatically instead of waiting for a request.
				console.log('TODO query for post');
			}
		}

		//source, target; but bidirectional so doesn't matter
		if(!(el.parents('.entryNode').eq(0).find('.suggest-labels').eq(0).find('a[-idea-id="'+suggestion.pid+'"]').length > 0)){
			if(sourceId!=suggestion.pid){
				if(!newSugg)
					linkEntryNodes(sourceId,suggestion.pid)
				else
					linkEntryNodesFE(sourceId,suggestion.pid)

				el.typeahead('val', '');
			}
			else {
				console.log('trying to relate idea to itself');
				el.typeahead('val', 'It\'s irreflexive!');
				setTimeout(function(){el.typeahead('val', '');},700)
			}
		}
		else {
			console.log('idea already linked');
			el.typeahead('val', 'This is already linked!');
			setTimeout(function(){el.typeahead('val', '');},700)
		}
	};


	postEl.find('.typeahead').on('typeahead:selected', function (el, suggestion) {
		selectRel($(this), suggestion);
	});

	$('#currentposts').on('keydown','.tt-input',function(e){
		// figure out $(this), suggestion
		if($('.add-new-tt')){
			if(e.keyCode == 13){ //enter key
				if($('.add-new-tt').hasClass('sel')){
					selectRel($(this).closest('.related-ideas-all').find('.tt-input'));
				}
				else
					$('.add-new-tt').addClass('sel');
			}
			else if(e.keyCode == 40){ // down arrow
				$('.add-new-tt').addClass('sel');
			}
			else if(e.keyCode == 38){ // up arrow
				$('.add-new-tt').removeClass('sel');
			}
		}
	});

	$('#currentposts').on('mouseover','.add-new-tt',function(e){
		if($('.add-new-tt')){
			$('.add-new-tt').addClass('sel');
		}
	});

	$('#currentposts').on('mouseout','.add-new-tt',function(e){
		if($('.add-new-tt')){
			$('.add-new-tt').removeClass('sel');
		}
	});


	$('#currentposts').on('click','#add-new-tt',function(){
		selectRel($(this).closest('.related-idea-input').find('.tt-input'));
	});

	/*postEl.find('.typeahead').keypress(function (e) {
		if (e.which == 13) { // enter
			selectRel($(this));
		}
	});*/

	postEl.find('.typeahead').typeahead(
		{
			hint: true,
			highlight: true,
			minLength: 0,
			autoselect: true
		},
		{
			name: 'ideas', // alters tt-dataset- html
			displayKey: 'title',
			source: getSuggestions,
			templates: {
				    empty: function (o) {return '<p class="add-new-tt"><a id="add-new-tt"><i style="font-size:18px;position:relative;top:2px;margin-right:5px;" class="ion-ios7-plus-empty"></i>Add as a new idea and relate</a></p>'; },
				//    footer: function (o) {return '';},
				//    header: function () {return '';},
				suggestion: Handlebars.compile('<p>{{title}}</p>')
			}
		});

	// Setup typeahead to show a suggestion on focus
	// From http://pastebin.com/adWHFupF
	/* WARNING: This is hackery abusing non-public Typeahead APIs */
	// Fix for v0.10.2
	// Requires minLength == 0
	postEl.find('.typeahead').focus(function() {
		if ($(this).val() === "") {
		      var input = $(this).data('ttTypeahead').input; //Reference to the TA Input class
		      //Set the component's current query to something !== input.
		      input.query = "nonempty";
		      input._onInput("");
		  }
	});

	if ($('.typeahead').size() > 0) {
		var _typeahead = $('.typeahead.tt-input').first().data('ttTypeahead');
		_typeahead.input.__proto__.setHint = function (value) {
			if (postEl.find('.typeahead:focus').val() === "") {
				this.$hint.val(''); // Don't show a hint if the input is empty
			} else {
				this.$hint.val(value);
			}
		};
	}
}

// Dom change: add a child dom el (some post) to the given parent dom element

function expandRelated(parent, post, label) {

	if($(label).children(0).hasClass("toggled")){
		$(label).children(0).removeClass("toggled");

		var x = $(parent.children('.children').children('.entrylist').find('.entryNode[-idea-id="'+post.pid+'"]')[0]);
		x.slideUp('fast', function(){
			x.remove();
		});
	}
	else {
		$(label).children(0).addClass("toggled");
		childNodeViewModel = new EntryNodeViewModel(post);
		postEl = $(childNodeViewModel.render());
		postEl.hide();
		parent.children('.children').children('.entrylist').prepend(postEl);
		$(postEl).slideDown('fast');
		// Add events
		setupNode(postEl);
	}

}
