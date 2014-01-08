var hashtag_regexp = /#([a-zA-Z0-9\-\/"&;”“]+)/g; //TODO We Cant realistically accept < if we use b tags and no spaces, since it includes </b> in the hashtag. Removed < to deal with this. Alternatively we put a space between #XXX and </b> but this causes other issues
var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};

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

function removeCommonWords(str) {
	return str.replace(/\b(?:(the)|(it)|(is)|(we)|(all)|(a)|(an)|(by)|(to)|(you)|(me)|(he)|(she)|(they)|(we)|(how)|(it)|(i)|(are)|(to)|(for)|(of))\b/ig, '');
}

function findTitleEnd(idea) {
	var i1=idea.indexOf("--");
	var i2=-1//idea.indexOf(":");

	var i=Math.min(i1-2,i2-1);

	if(i<0) i=idea.length;

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

function hashtag(e){
        e.preventDefault();

        var targetName=$(e.target).html();
        $('#newpost').val(targetName).focus();
        rootNodeViewModel.filter(targetName);
}

String.prototype.regexMatchOffset = function(regex, startpos) {
    var matchObj = this.substring(startpos || 0).match(regex);
    var newObj = [];
    if(matchObj!=null){
    	for(var i=0;i<matchObj.length;i++){
    		newObj[i] = [this.indexOf(matchObj[i]),matchObj[i].length];
    	}
    /*
    if(matchObj!=null && matchObj.length > 0) {
    	matchObj.index=matchObj.index + (startpos || 0)
    	var m=matchObj[0]
    	m.index=matchObj
    	matchObj=m;
    }
	*/
	}
    if(matchObj===null) {
     	newObj=[];
    }
	
    return newObj;
}

/*
function linkHashtags(text) {
    hashtag_regexp = /#([a-zA-Z0-9]+)/g;
    return text.match(
        hashtag_regexp,
        '<a class="hashtag" href="http://twitter.com/#search?q=$1">#$1</a>'
    );
} */

function extractTags(idea) {
	return idea.match(hashtag_regexp)
}
// never gets called
function replaceTags(idea) {
    var temp = idea.replace(hashtag_regexp,'<a class="hashtag" href="&#35;?q=$1">&#35;$1</a>') // problematic using <> inside here breaks it, same with ""
    linkifyHashtags(idea);
    return temp;
}
// never gets called
function processIdea(idea) {
    return replaceIdeaName(replaceTags(idea)); // order matters; as replaceIdeaName creates # signs
}
// never gets called
function processIdea(idea,pid) {
    return replaceIdeaName(replaceTags(idea),pid); // order matters; as replaceIdeaName creates # signs
}

// function linkifyHashtags(context){//#TODO broken
// 	context.find('.hashtag').click(function(e){
// 		e.preventDefault();
// 		var targetName=$(e.target).html();
            
// 		$('#newpost').val(targetName).focus();
// 		rootNodeViewModel.filter(targetName);
// 	});
// }