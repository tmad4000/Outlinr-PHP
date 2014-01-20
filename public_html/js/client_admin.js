//getPosts() -> displayPosts() 
var isDefaultUsrHandle = true;

$(document).ready(function() {
	$('#postform').submit(function() {
		numberOfIdeasVisible =0;	
		submitPostAndGetPosts();
		// never gets here
		return false;
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
	$('textarea#newpost').keyup(function (event) {
		// #TODO #Future trim repeated enters       
		if (event.keyCode == 13 && event.shiftKey) { // enter
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

		/*
	$('#myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	})
	
	$('#myTab a:last').tab('show');
	*/
	getPosts();
});

//var entryList = null;
var rootNodeViewModel = null;

function displayPosts() {
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
			$(this).closest($(this).closest('.entryNode')).hide(); //hack #faked
		//	deletePost(this).closest($(this).closest('.entryNode')).attr('-idea-id'));
		});		
		
		$("ul.entryNode table").hover (function() {
			$(this).find('div.delete a').show();
		},function() {
			$(this).find('div.delete a').hide();
		});
		
		$(".star-off").click(function() {
			console.log(t=$(this))
			$(this).toggleClass("star-on");
			//cycleStatus($(this).closest('.entryNode').attr('-idea-id'));
		});
		//$("#currentposts").html(entrylist);
		/*
					var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";
			
			
					for (var i = 0; i < data.length; i++) {
						
			
						var time = new Date(data[i].time * 1000);
			
						var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
						var progEntry=data[i].progress && data[i].progress != "null" ? data[i].progress + '% - ': "";
						
						status ="<td class='status'>" + '<a href="index.1.7_suggestionbox_inProgress.php" rel="popover" data-content="'+progEntry +data[i].metric+'" data-original-title="'+statusTable[data[i].status]+'"><div class="status sc'+data[i].status +'" >'+ '</div></a>' + "</td>";
						upvoter='<td class="votes" -idea-id="'+data[i].pid+'"><span class="vote"> </span><span class="votes" >'+data[i].upvotes+'</span></td>';
						
						table += '<tr>'+status + upvoter+'<td>' + nl2br(processIdea(data[i].body,data[i].pid)) + "</td>" + 
						   // '<td><div class="progressbar"></div></td>' +
							"<td><a href='#' class='uid'>" + (data[i].uid!=0 ? data[i].uid : "anon") + "</a></td>" +
							"<td class='timecol'>" + dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes()) +
							"</td></tr>";
					}
					
					table += "</table>";
					$("#currentposts").html(table);
					
					//$( ".progressbar" ).progressbar({
				//		value: 59
					//});
		*/

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

		$.each( data,function(i,data) {
			var n=extractIdeaName(data.body);
			var h=extractTags(data.body);
			if(h)
				$.each(h,function(i,tag) {tags[tag]=true;});
			nameul.append('<li><a href="#'+data.pid+'">'+n + '</a></li>');

		});

		localStorage.setItem("tags", tags);
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


function cycleStatus(ideaid) {

	$.ajax({
		'url': 'ajax/cyclestatus.php',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {
			numberOfIdeasVisible =0;	
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
	var np = $('#newpost').val();
	var ind=np.indexOf('~'+$('#usrhandle').val());
	
	if($('#usrhandle').val()!="" && ind==-1) { //bug -- doesn't catch included word
//		if(np.substr(ind+$('#usrhandle').val().length+1),1)
			
		np+=' ~'+$('#usrhandle').val();
	}
	
	/*var tag_regexp = /#([a-zA-Z0-9<>\-"&;”“]+)/g; //#todo relates to
	function extractTags(idea) {
    
    return idea.match(tag_regexp)
	*/
	
	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':$('#mapidform').val(), 'newpost': np,'ideatitle': extractIdeaName($('#newpost').val()),'uid' : $('#usrhandle').val()}, //#hack
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
		'data': {'mapid':$('#mapidform').val(), 'newpost': ''},
		'success': function(jsonData) {
			localStorage.setItem("posts", jsonData);
			displayPosts();
		},
	});
}

