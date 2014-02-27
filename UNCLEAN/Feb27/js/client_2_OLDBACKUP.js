$(document).ready(function() {
	$('#postform').submit(function() {
		submitPostAndGetPosts();
		return false;
	});

	$('textarea#newpost').focus();
	$('textarea#newpost').keyup(function (event) {

        if (event.keyCode == 13 && event.shiftKey) { // enter
           	var content = this.value;
           	var caret = getCaret(this);
           	this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length-1);
           	event.stopPropagation();
        } 
        else if(event.keyCode == 13){ // enter
          	$('#postform').submit();
        }
        else {
    	      //console.log($(this).val());
  	          filterIdeas($(this).val());
   	
        }
    });

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



function entryNodeToHTML(entryNode) {

	//entryNodeBodyToHTML
	//entryNodeChildrenToHTML
	var entryNodeBody="";
	
	if(entryNode.pid!=null) {
		var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    
		entryNode;

		var time = new Date(entryNode.time * 1000);

		var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
		var progEntry=entryNode.progress && entryNode.progress != "null" ? entryNode.progress + '% - ': "";

		status ="<td class='status'>" + '<a href="#" rel="popover" data-content="'+progEntry +entryNode.metric+'" data-original-title="'+statusTable[entryNode.status]+'"><div class="status sc'+entryNode.status +'" >'+ '</div></a>' + "</td>";
		upvoter='<td class="votes" -idea-id="'+entryNode.pid+'"><span class="vote"> </span><span class="votes" >'+entryNode.upvotes+'</span></td>';


		//entryNodeBody="<div>"+table+"</div>";
		comments=""
		/*
		comments="<div class='showcomments'><a href='#' class='showcomments'>7+ Comments</a>";
		
		comments+='<div class="commentform"> \
				<div class="commentsinput" contenteditable="true" placeholder="" -idea-id="'+entryNode.pid+'"></div> \
				<input class="btn" type="button" value="Comment"> \
			</div>';
		comments+='</div>';
		*/
		
		//entryNodeBody+=comments;
//		console.log('this one should work'+entryNode.body+entryNode.pid);
		var temp = new Entry(entryNode.body,entryNode.pid);
		temp = temp.render();
		
		table += '<tr>'+status + upvoter+'<td class="ideaTxt">' + temp + "<br />"+comments+"</td>" + 
	   // '<td><div class="progressbar"></div></td>' +
	   "<td class='uid'><a href='#' class='uid'>" + (entryNode.uid!=0 ? entryNode.uid : "anon") + "</a></td>" +
	   "<td class='timecol'>" + dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes()) +
	   "</td></tr>";

	   table+="</table>";

	   entryNodeBody="<div>"+table+"</div>";	
	}

	var entryNodeChildren="";
	for(var key in entryNode.children) {
		entryNodeChildren+="<li>"+entryNodeToHTML(entryNode.children[key]) + "</li>\n";
	}

	return "<ul class='entryNode'>" + 
	"<li>" + entryNodeBody + "</li>" +
	"<li>\n<ul class='entrylist'>" + entryNodeChildren + "</ul>\n</li>" +
	"</ul>";
}							

function displayPosts() {
	if (localStorage.getItem("posts") !== null){
		var jsonData = localStorage.getItem("posts");
		var data = $.parseJSON(jsonData)['treePosts'];
		var entrylist=entryNodeToHTML(data);

		$("#currentposts").html(entrylist);
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
		$('#newpost').val('');
		
		var targetName=$(e.target).attr('href').substr(1);
		var offset = $($("a[name='"+targetName+"']")).offset();
		var scrollto = offset.top - 57; // fixed_top_bar_height = 50px
		$('html, body').animate({scrollTop:scrollto}, 0);
	});
	
	$('#idea-hashtags a').click(function(e){	
		e.preventDefault();

		var targetName=$(e.target).html();
		$('#newpost').val(targetName).focus();
		filterIdeas(targetName);
	});

	linkifyBodyHashtags();
}

function linkifyBodyHashtags(){
	$('.hashtag').click(function(e){
		e.preventDefault();

		var targetName=$(e.target).html();
		$('#newpost').val(targetName).focus();
		filterIdeas(targetName);
	});
};

	



function filterIdeas(query){
//console.log(query);
	 // TODO FIX SPLIT ON NEW LINES
	query = removeCommonWords(query.replace(/[^a-zA-Z0-9# ,\r\n]/gi,"").toLowerCase());
	//console.log(query);

	query = query.split(/[\r\n ,]+/);


	$('#currentposts > ul.entryNode > li > ul.entrylist > li .entryNode').each(function(){
		var h=true;
		var itN=$(this).find('td.ideaTxt');
		var pid=itN.children(".ideaname").attr('name');
		var it=itN.text();
		var tem=new Entry(it,pid);

		for(var i=0;i<query.length;i++){
			var mi = it.toLowerCase().indexOf(query[i]);

			if(mi>=0&&query[i]!=""){//ignore empty strings from query
				/*itN.html().split("<");
				var isTag=false;
				for(var j=0;j<itN.html().length;j++) {
					if(itN.html()[j]==="<")
						isTag=true;
					else if(itN.html()[j]===">")
						isTag=false;
					if(!isTag)
					
					var re = new RegExp(query[i],"gi");
					itN.html(itN.html().replace(re,"<b>"+query[i]+"</b>"));
				}
				var re = new RegExp(query[i],"gi");
				itN.html(itN.html().replace(re,"<b>"+query[i]+"</b>"));
//				$(this).attr('-idea-id')-0*/
/*				var re = new RegExp("("+query[i]+")","gi");
				it=it.replace(re,"<b>$1</b>");*/
//				console.log("test"+it);

				//var tem=new Entry(it,pid);
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

	linkifyBodyHashtags();
}

function displayIdeaNames() {
	if (localStorage.getItem("posts") !== null){
		var jsonData = localStorage.getItem("posts");
		var data = $.parseJSON(jsonData)['flatPosts'];

		var nameul = $('ul#ideanames').empty();
		var tags={};
		$.each( data,function(i,data) {
			var n=extractIdeaName(data.body);
			var t=extractTags(data.body);
			if(t)
				$.each(t,function(i,tag) {tags[tag]=true;});

			nameul.append('<li><a href="#'+data.pid+'">'+n + '</a></li>');

		});

		localStorage.setItem("tags", tags);
		var tagsul = $('ul#idea-hashtags').empty();
		$.each( tags,function(tag,trueval) {

			tagsul.append('<li><a href="#">'+tag + '</a> </li>'); //TODO
//			tagsul.append('<li><a href="#'+data.pid+'">'+tag + '</a> </li>');

		});
	}
}





function doUpvote(ideaid,upOrDown) {

	$.ajax({
		'url': 'ajax/upvote.php?'+upOrDown+'=true',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {

		},
	});
}

function submitPostAndGetPosts() {
	$.ajax({
		'url': 'ajax/get_or_make_post.php',
		'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val(),'ideatitle': extractIdeaName($('#newpost').val())},
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

