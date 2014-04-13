//getPosts();

$(document).ready(function() {
    $('#postform').submit(function() {
        submitPostAndGetPosts();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        return false;
    });
    
    $('#newpost').keyup(function (event) {
           if (event.keyCode == 13 && event.shiftKey) {
               var content = this.value;
               var caret = getCaret(this);
               this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length-1);
               event.stopPropagation();   
          }
          else if(event.keyCode == 13){
              $('#postform').submit();              
          }
          else {
            // FILTER RESULTS
            var query = $(this).val();
            query = query.split(' ');
            console.log(query);
            $.each($('#currentposts > .progbarlist').children(), function(index, element){
              $(element).show();
              $.each(query,function(i,el){
                if($(element).find('a').text().toLowerCase().indexOf(el)==-1)
                  $(element).hide();
              });        
            });
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
        var data = $.parseJSON(jsonData);
		
		var progbarlist="<ul class='progbarlist'>";
		

        for (var i = 0; i < data.length; i++) {
            progbarlist+="<li>";
			
				var table = "" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    
	
					var time = new Date(data[i].time * 1000);
					//nl2br(processIdea(data[i].body))
					n=extractIdeaName(data[i].mapname)		
					status ="<td class='status'>" + '<div class="status sc'+data[i].status +'" >'+ '</div>' + "</td>";
					
					
							
						//var tablerow = '<a href="index.1.7_suggestionbox.php?mapid='+data[i].mapid+'" class="idea" rel="popover" data-content="'+data[i].mapname+'" data-original-title="'+n+'">'+n + '</a>' ;
						var tablerow = '<a href="index.1.7_suggestionbox.php?mapid='+data[i].mapid+'" class="idea">'+n + '</a>' ;
						//if(data[i].parent+0!=0)
						//	tablerow='<tr><td></td><td colspan="4"><table class="subrow">'+tablerow+'</table></td></tr>'
			
			//			tableRows[data[i].pid]=tablerow
			//			tableRows[data[i].parent].append 
	
				table+=tablerow;
				table+="";
				
			if(data[i].parent+0!=0)
				table="<ul class='progbarlist'><li>"+table+"</li></ul>";
			progbarlist+=table+"</li>";
        }
        
		progbarlist+="</ul>";
        $("#currentposts").html(progbarlist);
        /*$( ".progressbar" ).progressbar({
            value: 59
        });*/
        displayIdeaNames();
		
		//<!-- **PROGBAR** -->
//		var progress = setInterval(function() {
/*			var $bar = $('.bar');
			
			if ($bar.width()==400) {
				clearInterval(progress);
				$('.progress').removeClass('active');
			} else {
				$bar.width($bar.width()+40);
			}
			$bar.text($bar.width()/4 + "%");
	*///	}, 800);
		var $bars = $('.bar');
		$bars.each(function() {
			$(this).text($(this).width()/4 + "%");
		});
	   $(".idea").popover({
			trigger: "hover", 
		  offset: 10

		});
    }
}

function displayIdeaNames() {
    if (localStorage.getItem("posts") !== null){
        var jsonData = localStorage.getItem("posts");
        var data = $.parseJSON(jsonData);

        var nameul = $('ul#ideanames').empty();
        var tags={};
         $.each( data,function(i,data) {
            if(data.body != null){
              var n=extractIdeaName(data.body);
              var t=extractTags(data.body);
              if(t)
                  $.each(t,function(i,tag) {tags[tag]=true;});
              
              nameul.append('<li><a href="#">'+n + '</a></li>');
            }
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
    return $.trim('<a class="ideaname" href="#?q=$1">'+$.trim(idea.substr(0,nameEnd))+'</a> '+idea.substr(nameEnd));
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


function submitPostAndGetPosts() {
    $.ajax({
            'url': 'ajax/get_or_make_post_ideamaps.php',
            'data': {'mapid':$('#mapidform').val(), 'newpost': $('#newpost').val()},
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
            'url': 'ajax/get_or_make_post_ideamaps.php',
            'data': {'mapid':$('#mapidform').val(), 
			'newpost': ''},
            'success': function(jsonData) {
                 localStorage.setItem("posts", jsonData);
                 displayPosts();
            },
    });
}

