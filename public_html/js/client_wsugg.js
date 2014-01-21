//getPosts();

$(document).ready(function() {
    $('#postform').submit(function() {
        submitPostAndGetPosts();
        return false;
    });
    
    $('textarea#newpost').keyup(function (event) {
           if (event.keyCode == 13 && event.shiftKey) {
               var content = this.value;
               var caret = getCaret(this);
               this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length-1);
               event.stopPropagation();
               
          }else if(event.keyCode == 13)
          {
              $('#postform').submit();
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

function displayPosts() {
    if (localStorage.getItem("posts") !== null){
        var jsonData = localStorage.getItem("posts");
        var data = $.parseJSON(jsonData).allideas;
        var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";


        for (var i = 0; i < data.length; i++) {
            

            var time = new Date(data[i].time * 1000);

			var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done",4:"Rejected"};
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
        /*$( ".progressbar" ).progressbar({
            value: 59
        });*/
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
		  offset: 10,
		  html:true

		});
    }
}

function displaySugg() {
    if (localStorage.getItem("posts") !== null){
        var jsonData = localStorage.getItem("posts");
        var data = $.parseJSON(jsonData).sugg;
        var sugglist = "<ul class='sugg'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";

        for (var i = 0; i < data.length; i++) {
			sugglist += '<li><span class="sugg">'+ nl2br(processIdea(data[i].body.substr(0,120),data[i].pid)) + "</span><a class='addlink pull-right' -idea-id='"+data[i].pid+"'>Add Link</a></li>";
        }
        
        sugglist += "</ul>";
        $("#relatedideas").html(sugglist);
    }
}

function displayIdeaNames() {
    if (localStorage.getItem("posts") !== null){
        var jsonData = localStorage.getItem("posts");
        var data = $.parseJSON(jsonData).allideas;

        var nameul = $('ul#ideanames').empty();
        var tags={};
         $.each( data,function(i,data) {
            var n=extractIdeaName(data.body);
            var t=extractTags(data.body);
            if(t)
                $.each(t,function(i,tag) {tags[tag]=true;});
            
            nameul.append('<li><a href="#">'+n + '</a></li>');
            
         });
         
         localStorage.setItem("tags", tags);
         var tagsul = $('ul#idea-hashtags').empty();
         $.each( tags,function(tag,trueval) {
             
            tagsul.append('<li><a href="#">'+tag + '</a> </li>');
            
         });
    }
}

function processIdea(idea) {
    return replaceIdeaName(replaceTags(idea)); // order matters; as replaceIdeaName creates # signs
}

function processIdea(idea,pid) {
    return replaceIdeaName(replaceTags(idea),pid); // order matters; as replaceIdeaName creates # signs
}


function extractIdeaName(idea) {
    i1=idea.indexOf("--");
    i2=idea.indexOf(":");
    i=Math.max(i1,i2);
    
    if(i<0) i=idea.length;
    return $.trim(idea.substr(0,Math.min(50,i)))
}



function replaceIdeaName(idea) {
    i1=idea.indexOf("--");
    i2=idea.indexOf(":");
    i=Math.max(i1,i2);
    
    if(i<0) i=idea.length;
    
    nameEnd = Math.min(50,i);
    return $.trim('<a class="ideaname" href="#?q=$1">'+idea.substr(0,nameEnd)+'</a>'+idea.substr(nameEnd));
}

function replaceIdeaName(idea,pid) {
    i1=idea.indexOf("--");
    i2=idea.indexOf(":");
    i=Math.max(i1,i2);
    
    if(i<0) i=idea.length;
    
    nameEnd = Math.min(50,i);
    return $.trim('<a class="ideaname" name="'+pid+'" href="index.1.7_suggestionbox_inProgress.php#?post='+pid+'">'+idea.substr(0,nameEnd)+'</a>'+idea.substr(nameEnd));
}


/*
function linkHashtags(text) {
    tag_regexp = /#([a-zA-Z0-9]+)/g;
    return text.match(
        tag_regexp,
        '<a class="hashtag" href="http://twitter.com/#search?q=$1">#$1</a>'
    );
} */
var tag_regexp = /#([a-zA-Z0-9<>\-"&;”“]+)/g; //#todo relates to
function extractTags(idea) {
    
    return idea.match(tag_regexp)
    
}
function replaceTags(idea) {
    
    return idea.replace(tag_regexp,'<a class="hashtag" href="#?q=$1">#$1</a>')
    
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
            'url': 'ajax/get_or_make_post_wsugg.php',
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
            'url': 'ajax/get_or_make_post_wsugg.php',
            'data': {'mapid':$('#mapidform').val(), 'newpost': ''},
            'success': function(jsonData) {
                 localStorage.setItem("posts", jsonData);
                 displaySugg();
                 displayPosts();
            },
    });
}

