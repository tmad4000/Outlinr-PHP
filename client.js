//getPosts();

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

function timeToString(hours, minutes) {
	var xm = hours < 12 ? "am" : "pm";

    // Convert hours from 0-24 to 1-12.
    hours = (hours + 11) % 12 + 1;
    
    if (minutes < 10)
    	minutes = "0" + minutes;
    
    return hours + ":" + minutes + " " + xm;
}

function dateToString(month, day) {
	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month];
	return month + " " + day;
}

function nl2br(str) {
	return str.replace(/\n/g, '<br>');
}

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
		
		
		table += '<tr>'+status + upvoter+'<td class="ideaTxt">' + new Entry(entryNode.body,entryNode.pid).render() + "<br />"+comments+"</td>" + 
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

		var targetName=$(e.target).attr('href').substr(1);
		var offset = $($("a[name='"+targetName+"']")).offset();
		var scrollto = offset.top - 57; // fixed_top_bar_height = 50px
		$('html, body').animate({scrollTop:scrollto}, 0);
	});
	
	$('#ideatags a').click(function(e){	
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

	

function removeCommonWords(str) {
	return str.replace(/\b(?:(the)|(it)|(is)|(we)|(all)|(a)|(an)|(by)|(to)|(you)|(me)|(he)|(she)|(they)|(we)|(how)|(it)|(i)|(are)|(to)|(for)|(of))\b/ig, '');
}

function filterIdeas(query){
//console.log(query);
	 // TODO FIX SPLIT ON NEW LINES
	query = removeCommonWords(query.replace(/[^a-zA-Z0-9# ,\r\n]/gi,"").toLowerCase());
	//console.log(query);

	query = query.split(/[\r\n ,]+/);


	$('#currentposts > ul.entryNode > li > ul.entrylist > li .entryNode').each(function(){
		var h=true;
		for(var i=0;i<query.length;i++){
			
			var itN=$(this).find('td.ideaTxt');
			var pid=itN.children(".ideaname").attr('name');
			var it=itN.text();
			var mi = it.toLowerCase().indexOf(query[i]);
			if(query.length==1 && query[0]==""){
				h=false;
				itN.html(new Entry(entryNode.body,entryNode.pid).render() );
			} 
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
				var re = new RegExp("("+query[i]+")","gi");
				it=it.replace(re,"<b>$1</b>");

				itN.html(new Entry(entryNode.body,entryNode.pid).render()); //TODO add third param to this, pass whether bold or not so we can put it inside.
				//console.log(itN.html().replace('a','%'));
				h=false;
			}
		}
		if(!h||query == [""]) $(this).css('display','inherit'); 
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
		var tagsul = $('ul#ideatags').empty();
		$.each( tags,function(tag,trueval) {

			tagsul.append('<li><a href="#">'+tag + '</a> </li>'); //TODO
//			tagsul.append('<li><a href="#'+data.pid+'">'+tag + '</a> </li>');

		});
	}
}

function processIdea(idea) {
    return replaceIdeaName(replaceTags(idea)); // order matters; as replaceIdeaName creates # signs
}

function processIdea(idea,pid) {
    return replaceIdeaName(replaceTags(idea),pid); // order matters; as replaceIdeaName creates # signs
}

function findTitleEnd(idea) {
	var i1=idea.indexOf("--");
	var i2=idea.indexOf(":");

	var i=Math.min(i1-2,i2-1);

	if(i<0) i=10000;

	var titleEnd=Math.min(80,i); // max 80 chars

	var i3=idea.indexOf(" ",titleEnd);
	if(i3<0) i3=idea.length;

	titleEnd=i3//Math.min(titleEnd,i3);

	return titleEnd;
}

function extractIdeaName(idea) {
	return $.trim(idea.substr(0,findTitleEnd(idea)));
}



function replaceIdeaName(idea) {
	var te=findTitleEnd(idea);
	return $.trim('<a class="ideaname suggname" href="">'+idea.substr(0,te)+'</a>'+idea.substr(te));
}

function replaceIdeaName(idea,pid) {
	var te=findTitleEnd(idea);

    return $.trim('<a class="ideaname suggname" href="#?q=$1" name="'+pid+'">'+idea.substr(0,te)+'</a>'+idea.substr(te)); //$$$ replaced index.1.7_suggestionbox_inProgress.php#?post='+pid+'
}


String.prototype.regexMatchOffset = function(regex, startpos) {
    var matchObj = this.substring(startpos || 0).match(regex);
    if(matchObj.index >= 0)
    	matchObj.index=matchObj.index + (startpos || 0)
    return matchObj;
}



function Entry(txt,pid) {
//replace with this.critPts=[]; (i,code)

	//model
	this.critPts=[];
	this.critPtsSet=false;

	this.bSplits=[]; //bolds
	this.hSplits=[]; //hashtags
	this.tSplit; //title/nontitle
	this.txt=txt;
	this.pid=pid;


	var pushSplits = function(re,ray) {
		console.log(x=this)
		var m=this.txt.regexMatchOffset(re,0);
		var si=m.index;
		for(var i=0;si>=0;i++) {
			m=this.txt.regexMatchOffset(re,i);
			si=m.index;

			ray.push([si,si+m[0].length]);
		}
	}

	//may contain duplicates
	var setCritPts = function() {
		critPts=[];
		var a1=0;
		while(a1<tSplits.length){
			critPts.push(tSplits[a1]);
			a1++;
		}
		a1 = 0;
		while(a1<hSplits.length){
			critPts.push(hSplits[a1]);
			a1++;
		}
		a1=0;
		while(a1<bSplits.length){
			critPts.push(bSplits[a1]);
			a1++;
		}
		critPts.sort();
	}
/*
	var doSplit = function(t,i) {
		return [t.substr(0,i),t.substr(i)]
	}

	var splitTxt = function(t,splitsRay) {
			var outRay=[];

			//if number
			if(!(splitsRay instanceof Array)) {
				return [t.substr(0,splitsRay),t.substr(splitsRay)]
			}
			else {
				var start=0;
				var end=t.length;
				for(var i=0;i<splitsRay.length;i++) {

					start=splitsRay[i][0];
					end=splitsRay[i][1];
					

				}

				return st;
			}

	}*/

	this.setBold = function(s) {
		pushSplits(s,bSplits);
		critPtsSet=false;
/*
		var si=this.txt.indexOf(s,0);
		for(var i=0;si>=0;i++) {
			si=this.txt.indexOf(s,i);
			this.bSplits.push([si,si+s.length]);
		}*/
	}

	this.clearBold = function() {
		this.bSplits=[];
		critPtsSet=false;
	}


	//oOrC is 0 or 1 for open or close
	var isASplitOpenOrClose=function(i,whichSplit,oOrC) {

		for(var n=0;n<whichSplit.length;n++) {
			if(i==whichSplit[n,oOrC])
				return true;
		}
		return false;
	}

	this.render = function() {
		//bulid tagsI: (tags, index to insert)
		if(!this.critPtsSet)
			setCritPts();


		var strWTags=[];
		var openB=false;
		var lastI;
		for(var j=0;j<this.critPts.length;j++) {

			var o;
			var i=this.critPts[j];

			if(j>0) //skip dup
				if(lastI==i) {
					lastI=i;
					continue;
				}
			lastI=i;

			if(i==tSplit[0]){
				o='<a class="ideaname suggname" href="#" name="'+this.pid+'">';
			}
			if(i==tSplit[1]){
				o="</a>";
				if(openB)
					o="</b>"+o+"<b>"
			}

			//i is a bSplit open
			if(isASplitOpen(i,this.bSplit,0)){
				o="<b>"
				openB=true;
			}

			//i is a bSplit close
			if(isASplitOpen(i,this.bSplit,1)){
				o="</b>"
				openB=false;
			}

			//i is a hSplit open
			if(isASplitOpen(i,this.hSplit,0)){
				o='<a class="hashtag" href="#">'
			}

			//i is a hSplit close
			if(isASplitOpen(i,this.hSplit,1)){
				o="</a>"
			}

			if(j>0) strWTags.push(txt.substr(lastI,i));
			strWTags.push(o);

//			strWTags.push([o,i]);
		}

		return nl2Br(strWTags.join(""));
		
/*

		//hash
		for(var i=0;i<st.length;i++) {
			st[i]=splitTxt(st[i],hSplits);

		}
		
		//bold
		for(var i=0;i<st.length;i++) {
			for(var j=0;j<st.length;j++) {
				st[i][j]=splitTxt(st[i][j],bSplits);
			}

		}


		//reconstitute st into text
		var rt;

		for(var j=0;j<st.length;j++) {
			for(var k=0;k<st.length;k++) {
				st[i][j]=splitTxt(st[i][j],hSplits);
			}
		}

		rt="<a>"+st[0]+"</a>"+st[1];



		}

		//insert special marker where b and /b tags go

		
		return $(this).text(this.txt);*/
	}


	//constructor
	pushSplits(hashtag_regexp,this.hSplits);
	this.tSplit=[0,findTitleEnd(this.txt)];

}



/*
function linkHashtags(text) {
    hashtag_regexp = /#([a-zA-Z0-9]+)/g;
    return text.match(
        hashtag_regexp,
        '<a class="hashtag" href="http://twitter.com/#search?q=$1">#$1</a>'
    );
} */
var hashtag_regexp = /#([a-zA-Z0-9\-\/"&;”“]+)/g; //TODO We Cant realistically accept < if we use b tags and no spaces, since it includes </b> in the hashtag. Removed < to deal with this. Alternatively we put a space between #XXX and </b> but this causes other issues
function extractTags(idea) {

	return idea.match(hashtag_regexp)

}
function replaceTags(idea) {


	return idea.replace(hashtag_regexp,'<a class="hashtag"href="#?q=$1">#$1</a>') // problematic using <> inside here breaks it, same with ""

}

function doUpvote(ideaid,upOrDown) {

	$.ajax({
		'url': 'upvote.php?'+upOrDown+'=true',
		'data': {'ideaid':ideaid},
		'success': function(jsonData) {

		},
	});
}

function submitPostAndGetPosts() {
	$.ajax({
		'url': 'get_or_make_post.php',
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
		'url': 'get_or_make_post.php',
		'data': {'mapid':$('#mapidform').val(), 'newpost': ''},
		'success': function(jsonData) {
			localStorage.setItem("posts", jsonData);
			displayPosts();
		},
	});
}

