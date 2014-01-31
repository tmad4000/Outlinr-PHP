//getPosts() -> displayPosts() 
var isDefaultUsrHandle = true;
var codeMirror;

var commentsModel = {};
var expandedComments = {};
var emailAddress;
$(document).ready(function() {
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
	    if(!$(this).hasClass('toggled')){
	        filterToggle = "Date";
	        $('#sortByUpvotes').removeClass('toggled'); 
	        $('#sortByStatus').removeClass('toggled'); 	        
	        $(this).addClass("toggled");
	        

	        displayPosts()
	    }
	});

	$('#sortByUpvotes').click( function(){
	    if(!$(this).hasClass('toggled')){
	        filterToggle = "Upvotes";
	        $('#sortByDate').removeClass('toggled'); 
	        $('#sortByStatus').removeClass('toggled'); 
	        $(this).addClass("toggled");	       		

	        displayPosts()        
	    }
	})

	$('#sortByStatus').click( function(){
	    if(!$(this).hasClass('toggled')){
	        filterToggle = "Status";
	        $('#sortByDate').removeClass('toggled');
	       	$('#sortByUpvotes').removeClass('toggled'); 
	        $(this).addClass("toggled");  		

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
	
	// ~cj codemirror:
	autocomplete = function(cm){
		var cur = cm.getCursor(), token = cm.getTokenAt(cur);
		if(token.type == "xn-hashtag"){
			var hash_tags = $.parseJSON(localStorage.getItem("autocompletionHashtags"));
			CodeMirror.showHint(cm, CodeMirror.xnHint, {tags: hash_tags} );
		}else if(token.type == "xn-persontag"){
			var person_tags = $.parseJSON(localStorage.getItem("autocompletionPersontags"));
			CodeMirror.showHint(cm, CodeMirror.xnHint, {tags: person_tags} );
		}else if(token.type == "xn-maptag"){
			CodeMirror.showHint(cm, CodeMirror.xnHint, {tags: map_tags} );
		}
	}
	codeMirror = CodeMirror(document.getElementById('codeMirror-container'), {
		lineNumbers: false,
		lineWrapping: true,
		smartIndent: true,
		autofocus: true,
        viewportMargin: Infinity,
        placeholder: "Type your own cool project idea, suggestion, goal for your group, or complaint here! Press ENTER to submit.",
		extraKeys: { 
		  "Tab": autocomplete,
		  "Enter": function(cm){
		  	// straight up enter, not shift+enter
		  	if(!codeMirror.hintOpen){
		        // don't submit post if we hit enter when the hint box was open 
		        submitPostAndGetPosts();
		    }
		  } 
		},
		onKeyEvent: function(cm, event){
		  if (event.type == "keyup"){  
		  	if((event.keyCode==51||event.keyCode==50||event.keyCode==192) && event.shiftKey){
		  		// 	Autocomplete as you type
		  		// doesn't always work .. why?
		  		setTimeout(function(){autocomplete(cm)},1)
		  	}
		    if(rootNodeViewModel!==null){
		    	// filter search results 
		        rootNodeViewModel.filter(codeMirror.getValue() || "");
		    }
		  }
		},
		mode: 'xn'
	});
	codeMirror.hintOpen = false
	codeMirror.on("change",function(){
	  var textinput = codeMirror.getValue();
	  rootNodeViewModel.filter(textinput);
	});
	codeMirror.on("startCompletion", function(target, name){
		codeMirror.hintOpen = true
	});
	codeMirror.on("endCompletion", function(){
		// timeout delay after closing the hintbox, and before post submissions are allowed
		// this is to prevent submissions when using "enter" on the autocomplete menu 
		setTimeout(function(){codeMirror.hintOpen = false;},200)
	})


	/* 
	$('textarea').focus(function(){
		$(this).css("border-color","#59b4de");
	});
	$('input[type="text"]').focus(function(){
		$(this).css("border-color","#59b4de");
	});
	$('textarea#newpost').focus();
	$('textarea').blur(function(){
		$(this).css("border-color","#ddd");
	});
	$('input[type="text"]').blur(function(){
		$(this).css("border-color","#ddd");
	});
	$('textarea#newpost').keyup(function (event) {
		// #TODO #Future trim repeated enters       
		if (event.keyCode == 13 && event.shiftKey) { // shift-enter
        	var content = this.value;
        	var caret = getCaret(this);
        	this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length-1);
        	event.stopPropagation();
        } 
        else if(event.keyCode == 13){ // enter
        	// removes the newline
        	var content = this.value;
        	var caret = getCaret(this);
        	this.value = content.substring(0,caret-1)+content.substring(caret,content.length);
        	event.stopPropagation();
        	$('#postform').submit();
        }
        else {
        	if(rootNodeViewModel!==null){
        		rootNodeViewModel.filter($(this).val() || "");
        	}
        }
    });
	$('textarea#newpost').change(function (event) {
		rootNodeViewModel.filter($(this).val());
		//#TODO never gets here

	});
	*/

		/*
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	})
	
	$('#myTab a:last').tab('show');
	*/
	getPosts();
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
			cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});
		
		$("div.delete > a").click(function(e) {
			e.preventDefault();
			var r=confirm("Are you sure you want to delete "+$(this).closest('.entryNode').find("a.ideaname").text() + "?");
			if (r==true)
				deleteNode($(this).closest('.entryNode').attr('-idea-id'));
			
		});		
		
		$(".entryNode table").hover (function() {
			$(this).find('div.delete > a').fadeIn();
		},function() {
			$(this).find('div.delete > a').hide();
		});
		
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
			getComments(idS);
			$(this).parent().find('textarea').focus();//#TENNIS
		});

		$('.commentsinput').keyup(function(e){
			e.preventDefault();
			if (event.keyCode == 13 && event.shiftKey) { // shift-enter
	        	
	        	event.stopPropagation();
	        } 
			else if(event.keyCode == 13) { // enter
				var content = this.value;
        		var caret = getCaret(this);
        		this.value = content.substring(0,caret-1)+content.substring(caret,content.length);
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
				doUpvote($(this).attr('-idea-id')-0,'up');
			}
			else {
				num-=1;
				doUpvote($(this).attr('-idea-id')-0,'down');
			}
			$(this).children('span.votes').html(num) 
		});
		$('.comment-upvote').click(function() {
			var num=$(this).html()-0; 
			$(this).toggleClass('on'); 
			if ($(this).hasClass('on')) {
				num+=1;
				doUpvoteComment($(this).parent().find('.comment-text').attr('-comment-id')-0,'up');
			}
			else {
				num-=1;
				doUpvoteComment($(this).parent().find('.comment-text').attr('-comment-id')-0,'down');
			}
			$(this).html(num) 
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
	$('#ideanames a').click(function(e){	
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
	
	$('.ideatags a').click(function(e){	
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
		console.log(x=localStorage)
		var nameul = $('ul#ideanames').empty();
		var tags={};

		

		$.each( data,function(i,data) {
			var n=extractIdeaName(data.body);
			var h=extractTags(data.body);
			if(h)
				$.each(h,function(i,tag) {tags[tag]=true;});
			nameul.append('<li><a href="#'+data.pid+'">'+n + '</a></li>');

		});


		// ~cj we need to json.stringify before storing dictionaries
		localStorage.setItem("tags", JSON.stringify(tags));

		// ~cj generate lists of hash tags and person tags, save to localStorage
		hashTags = [];
		peopleTags = [];
		$.each(tags, function(tag,contained){
		    if(contained){
		    	if(tag.substring(0,1)=="#"){
		     		hashTags.push(tag.replace("#",""));
		     	}else if(tag.substring(0,1)=="~"){
		     		peopleTags.push(tag.replace("~",""));
		     	}
		    }
		});
		localStorage.setItem("autocompletionHashtags", JSON.stringify(hashTags));
		// note: this only grabs persons from this one map 
		localStorage.setItem("autocompletionPersontags", JSON.stringify(peopleTags));

		var tagsul = $('ul#idea-hashtags').empty();
		var tildesul = $('ul#people-list').empty();		
		$.each( tags,function(tag,trueval) {
			if(tag.substring(0,1)=="#")
				tagsul.append('<li><a href="#">'+tag + '</a> </li>'); //TODO
			else if(tag.substring(0,1)=="~")
				tildesul.append('<li><a href="#">'+tag + '</a> </li>'); //TODO

		//			tagsul.append('<li><a href="#'+data.pid+'">'+tag + '</a> </li>');

	});
	}
}

//ajax
function doUpvote(ideaid,upOrDown) {

	$.ajax({
		'url': 'ajax/upvote.php?'+upOrDown+'=true',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {

		},
	});
}

function doUpvoteComment(commentid,upOrDown) {

	$.ajax({
		'url': 'ajax/upvotecomment.php?'+upOrDown+'=true',
		'data': {'commentid':commentid},
		'success': function(jsonData) {

		},
	});
}


function cycleStatus(ideaid) {
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
	x.removeClass(cn);
	x.addClass('sc'+(cn+1)%5);

	$.ajax({
		'url': 'ajax/cyclestatus.php',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {
			getPosts();

		},
	});
}

function deleteNode(ideaid) {

	$.ajax({
		'url': 'ajax/deleteNode.php',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {
			getPosts();
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
	var np = codeMirror.getValue()
	var ind=np.indexOf('~'+$('#usrhandle').val());
	
	if($('#usrhandle').val()!="" && ind==-1) { //#bug -- doesn't catch included word
//		if(np.substr(ind+$('#usrhandle').val().length+1),1)
			
		np+=' ~'+$('#usrhandle').val();
	}
	
	/*var tag_regexp = /#([a-zA-Z0-9<>\-"&;”“]+)/g; //#todo relates to
	function extractTags(idea) {
    
    return idea.match(tag_regexp)
	*/
	

	// turn textarea gray during ajax call 
	$("#codeMirror-container, #codeMirror-container div").addClass("cm-disabled")

	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':$('#mapidform').val(), 'newpost': np,'ideatitle': extractIdeaName(np),'uid' : $('#usrhandle').val()}, //#hack
		//'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val(),'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrname').val()},
		'success': function(jsonData) {
                 // todo: parse data and add into our table
                 localStorage.setItem("posts", jsonData);
                 
                 codeMirror.setValue('')
                 displayPosts();
        },
        'complete': function(e){
        	// enable textarea when ajax returns
         	$("#codeMirror-container, #codeMirror-container div").removeClass("cm-disabled")
        }
    });
}

function getPosts() {
	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':$('#mapidform').val(), 'newpost': ''},
		'success': function(jsonData) {
			localStorage.setItem("posts", jsonData);
			displayPosts();

		},
	});
}

function getComments(pid) {
	$.ajax({
		'url': 'ajax/comment.php',
		'data': {'pid':pid},
		'success': function(jsonData) {
			commentsModel[pid]=$.parseJSON(jsonData);
			console.log(commentsModel)
			displayPosts();
		},
	});
}

function submitAndGetEmail(){

	$.ajax({
		'url': 'ajax/email.php',
		'data': {'notificationemail':$('#notificationemail').val(),'mapid':$('#mapidform').val()},
		'success': function(jsonData) {
			emailAddress=$.parseJSON(jsonData).email;
			$('#notificationemail').val(emailAddress);
		},
	});
}

function getEmail(){
	$.ajax({
		'url': 'ajax/email.php',
		'data': {'mapid':$('#mapidform').val()},
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
			'data': {'pid':pid,'comment_text':t},
			'success': function(jsonData) {
				commentsModel[pid]= $.parseJSON(jsonData);

				displayPosts();
				// c.val(''); //Redundant?
			},
		});
	}
}



