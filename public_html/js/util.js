var tag_regexp = /[#~]([a-zA-Z0-9@.\-\/"&;”“]+)/g; //TODO We Cant realistically accept < if we use b tags and no spaces, since it includes </b> in the hashtag. Removed < to deal with this. Alternatively we put a space between #XXX and </b> but this causes other issues
var hash_regexp = /[#]([a-zA-Z0-9@.\-\/"&;”“]+)/g; //TODO We Cant realistically accept < if we use b tags and no spaces, since it includes </b> in the hashtag. Removed < to deal with this. Alternatively we put a space between #XXX and </b> but this causes other issues
var tilde_regexp = /[~]([a-zA-Z0-9@.\-\/"&;”“]+)/g; //TODO We Cant realistically accept < if we use b tags and no spaces, since it includes </b> in the hashtag. Removed < to deal with this. Alternatively we put a space between #XXX and </b> but this causes other issues

tag_regexp = /\B[#~](([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|([^\s\n.,?!><]+))/g;
hash_regexp = /\B[#](([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|([^\s\n.,?!<>]+))/g;
//var emailsubregexp = "[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

tilde_regexp = /\B[~](([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)|([^\s\n.,?!<>]+))/gi;
// /[~]([^(." ")]+)/g
// <i class="fa fa-external-link"></i>
var url_regexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-.;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g;
//var url_regexp = /#(?i)\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))#iS/g;
//UNPICKY REGEX
url_regexp = /((www|http|https)([^\s]+))|([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/g;


var statusTable={0:"",1:"Acknowledged",2:"In Progress", 3:"Done", 4:"Rejected"};
// var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done", 4:"Rejected"};

var numberOfIdeasVisible = 0; // #HACK
var filterToggle = 'Date'; // Date, Upvote, Hot, Status

function changeOrder(nodeChildren){
    // if filtertoggle upvotes
    var sortable = [];
    for (var key in nodeChildren)
    sortable.push([key, nodeChildren[key].upvotes])
    if(filterToggle == 'Upvotes')
        sortable.sort(function(a, b) {return b[1] - a[1]}) 

    if(filterToggle == 'Status'){
        sortable = []
        for (var key in nodeChildren)
        sortable.push([key, nodeChildren[key].status])
        sortable.sort(function(a, b) {return a[1].localeCompare(b[1])})
    }
    return sortable
    
}

function updateNrOfIdeasVisible(){
    if($('textarea#newpost').val() == ""){
        //$('#numResults').html("Showing All Ideas ("+numberOfIdeasVisible+")");
        if(numberOfIdeasVisible ==0)
            $('#numResults').html("No Ideas here yet");
        else
            $('#numResults').html("");
    }
    else {
        // so that chunks of text dont happen
        var store = $('textarea#newpost').val();
        if(store.length>40) store = store.substring(0,40)+"...";
        if(numberOfIdeasVisible==1){
            $('#numResults').html("Found "+numberOfIdeasVisible+" Idea which matches \""+store+"\"");
        }
        else {
            $('#numResults').html("Found "+numberOfIdeasVisible+' Ideas which match"'+store+'"');
        }     
    }
}

String.prototype.repeat = function(times) {
   return (new Array(times + 1)).join(this);
};

function moreText(id){
    $('#m'+id).css('display','none');
    $('#t'+id).css('display','inline');
}

function moreTextComment(id){
    $('#mc'+id).css('display','none');
    $('#tc'+id).css('display','inline');
}

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
	return str.replace(/\b(?:(the)|(it)|(is)|(we)|(all)|(a)|(an)|(by)|(to)|(you)|(me)|(he)|(she)|(they)|(we)|(how)|(it)|(i)|(are)|(to)|(for)|(of)|(with))\b/ig, '');
}

function findTitleEnd(idea) {
	var i1=idea.indexOf("--");

	//var i2=-1;//idea.indexOf(":");
    var i = i1-2;
	//var i=Math.min(i1-2,i2-1);

	if(i<0) i=idea.length;

	var titleEnd=Math.min(80,i); // max 80 chars
    var i4=idea.indexOf(" ",titleEnd); // HACK
    var i5=idea.indexOf(" ",titleEnd);
	var i3=idea.indexOf(" ",titleEnd);
    var iuse = Math.min(Math.min(i4,i3),i5);
	if(iuse<0){
            if(i4<0){
                if(i5<0){
                    if(i3<0){
                        iuse=idea.length
                    }
                    else{
                        iuse=i3;
                    }
                }
                else{
                    iuse=i5;
                }
            }
            else{
                iuse=i4;
            }
    }

	titleEnd=iuse;//Math.min(titleEnd,i3);

	return titleEnd;
}

function findMoreTextStart(idea){
    /*var indices = new Array();
    var index = 0;
    var i = 0;
    while(idea.indexOf("\n", index) > 0) {
        index=idea.indexOf("\n", index) > 0
        indices[i] = index;
        i++;
    }
    indices[i]= 219;
    var total = 0;
    var iter = 0
    while(total<300 && iter<indices.length){
        if(total + indices[iter] + 80 >300)
            break;
        total += (indices[iter] + 80)
        iter++;
    }
    var chCutoff = 300 - (iter*80)
    */
    var newIdea = idea.replace('\n',"n".repeat(80))
    return 300-newIdea.substr(0,300).split('').reverse().join('').indexOf(" ");//poss off by 1 error #magicnumber #hack
}

function urlPress(e){
    var s = $(e.target).text();
    s.replace('<i class="fa fa-external-link"></i>','');
    s.substr(0,s.length-1);
    if(s.indexOf('www')>=0 && s.indexOf('http')==-1){
        window.open("http://"+s);
    }
    else if(s.indexOf('@')>=0 && s.indexOf('mailto:')==-1){
        window.open("mailto:"+s);
    }
    else
        window.open(s);
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

        var targetName=$(e.target).html().replace(/<(?:.|\n)*?>/gm, '');;
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
    tag_regexp = /#([a-zA-Z0-9]+)/g;
    return text.match(
        tag_regexp,
        '<a class="hashtag" href="http://twitter.com/#search?q=$1">#$1</a>'
    );
} */
function extractTags(idea) {
    return idea.match(tag_regexp)
}
function extractHashes(idea) {
	return idea.match(hash_regexp)
}
function extractTildes(idea) {
    return idea.match(tilde_regexp)
}
// never gets called
function replaceTags(idea) {
    var temp = idea.replace(tag_regexp,'<a class="hashtag" href="&#35;?q=$1">&#35;$1</a>') // problematic using <> inside here breaks it, same with ""
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

// NAV BAR UTIL METHODS
function initiateCookie(){ 
    if(getCookie("handle")!=""){
        //var n = unescape(getCookie("name"));
        //var e = unescape(getCookie("usremail")); 
        var h = unescape(getCookie("handle"));
        var d = unescape(getCookie("isDefaultUsrHandle"));
        //$("#usrname").val(n); 
        //$("#usremail").val(e); 
        $("#usrhandle").val(h);
        isDefaultUsrHandle = d == "true";
    }
}

function updateCookie(){
    //var u = $("#usrname").val();
    //var e = $("#usremail").val();
    var h = $("#usrhandle").val();
    var d = isDefaultUsrHandle;
    //setCookie(u,e,h,d,3650) // 365 days cookie
    setCookieUsr(h,d,3650);
}
/*
function rememberMeToggle(){
    if(getCookie("name")!="" || getCookie("email")!=""){
        // untoggle (val remember)
        $("#usrremember").attr("value","Remember");
        deleteCookie() 
   }
   else {
        // toggle (val forget)
        $("#usrremember").attr("value","Forget");
        var u = $("#usrname").val();
        var e = $("#usremail").val();
        setCookie(u,e,365) // 365 days cookie
   }
}*/

// Cookie Functions

function setCookieUsr(handle,isDefaultUsrHandle,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
   // document.cookie = "name=" + escape(name);
    document.cookie = "handle=" + escape(handle);
    document.cookie = "isDefaultUserHandle=" + escape(isDefaultUsrHandle)+";"+ expires;
   // document.cookie = "usremail=" + escape(usremail)+";"+ expires;
}

// Cookie for storing upvotes
function setCookie(contentid){
    var d = new Date();
    d.setTime(d.getTime()+(365*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = contentid.toString()+"=voted;"+ expires;
}

function getCookie(label){
    var cname = label + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++){
        var c = ca[i].trim();
        if (c.indexOf(cname)==0) return c.substring(cname.length,c.length);
    }
    return "";
}

function deleteCookie(name){
    document.cookie = name+"=; expires=Thu, 18 Dec 2013 12:00:00 GMT";
}
