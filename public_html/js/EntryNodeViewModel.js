function EntryNodeViewModel(entryNodeModel) {
	this.entryNodeModel=entryNodeModel; //js obj from json
	this.viewDomE=null; //until render is called for first time
	this.myCommentsExpanded="init-hidden";
	// console.log(this.entryNodeModel);
	//attributes of this object
	this.visible=true;
	//self
	if(this.entryNodeModel.pid !== null && this.entryNodeModel.pid !== undefined)
		this.eT = new EntryNodeTextViewModel(this.entryNodeModel.body,this.entryNodeModel.pid);
	else
		this.eT = null;

	//children
	this.children = {};

	var sortable = changeOrder(this.entryNodeModel.children);
	var i=0;
	while(i<sortable.length) {
		var key = sortable[i][0];
		this.children[key]=new EntryNodeViewModel(this.entryNodeModel.children[key]);		
		i++;
	}

	// only for debugging
	this.killHTML = function(){
		if(this.eT!==null)
			this.eT.killHTML();
		for(var key in this.children) {	
			this.children[key].killHTML()
		}
	}

	// new EntryList(this.entryNodeModel['children'])

	//render must be called first so that viewDomE!==null
	this.show = function() {
		if(this.viewDomE === null){
			console.log("viewDomE is null")
			return;
		}
		if(this.getViewDomE().css('display')=='none'){
			numberOfIdeasVisible += 1;
		}
		this.getViewDomE().css("display","inherit");
		this.getViewDomE().visible=true;
	}

	//render must be called first so that viewDomE!==null
	this.hide = function() {
		if(this.viewDomE === null){
			console.log("viewDomE is null")
			return;
		}
		if(this.getViewDomE().css('display')!='none'){
			numberOfIdeasVisible -= 1;
		}
		this.getViewDomE().css("display","none");
		this.getViewDomE().visible=false;
	}
	this.getViewDomE = function(){ // #HACK
		return $('.entryNode[-idea-id="'+this.entryNodeModel.pid+'"]');
	}
	//render must be called first so that viewDomE!==null
	this.filter = function(query){
		if(this.getViewDomE() === null){ //ERROR
			console.log("viewDomE is null")
			return;
		}
		if(this.eT !== null){
			var isMatch=this.eT.filter(query); //returns true if matches. Boldifies its own text
			if(!isMatch)
				this.hide();
			else 
				this.show();
			updateNrOfIdeasVisible()
		}
		$.each(this.children,function() {this.filter(query)})
		//#TODO #future should we show parents of children who match?
	}


	//render current node, and also, all its children
	//for the root node, perhaps there needn't be self info?
	this.render = function() {
		//entryNodeBodyToHTML
		//entryNodeChildrenToHTML
		
		var entryNodeBody="";
		if(this.entryNodeModel.pid!==null) {
			numberOfIdeasVisible +=1;
			updateNrOfIdeasVisible()
	
			var table = "<table class='table'>"; // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    

				//dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes())
				var time = moment(this.entryNodeModel.time * 1000).fromNow();
				//moved to UTIL var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
				var progEntry=this.entryNodeModel.progress && this.entryNodeModel.progress != "null" ? this.entryNodeModel.progress + '% - ': "";

				/*status ="<div class='status'>" +
						'<div class="star">'+'<a class="star-off star-on" href="#" title="This is a favorite question (click again to undo)">&nbsp;&nbsp;&nbsp;</a>'+'</div>' +
						'<div class="status-box"><a href="#" rel="popover" data-content="'+progEntry +this.entryNodeModel.metric+'" data-original-title="'+statusTable[this.entryNodeModel.status]+'"><div class="status sc'+this.entryNodeModel.status +'" >'+ '</div></a></div>' + 
					"</div>";*/
				status = "<div class='status'>"+statusTable[this.entryNodeModel.status]+progEntry +this.entryNodeModel.metric+"</div>";
				if(getCookie("i"+this.entryNodeModel.pid)== "voted"){
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote on"><i class="ion-ios7-arrow-up"></i></span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}
				else {
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote"><i class="ion-ios7-arrow-up"></i></span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}


				//Comments
				var postCommentsModel=null;
				var commentsListH='<ul class="comments">';
					//note: commentsModel is global
					if(this.entryNodeModel.pid+"" in commentsModel){
						//console.log("")
						postCommentsModel=commentsModel[this.entryNodeModel.pid];
						
						$.each(postCommentsModel,function(i,currComment) {
							var y = new EntryNodeCommentViewModel(currComment.comment_text,currComment.cid);
							var commentTime = new Date(currComment.time * 1000);
							var commentTimeS=dateToString(commentTime.getMonth(), commentTime.getDate()) + ", " + timeToString(commentTime.getHours(), commentTime.getMinutes());
							var del = isAdmin ? " <div class='delete-comment'><a href='#'>Delete</a></div>" : "";
							if(getCookie("c"+currComment.cid)!= ""){
								var commentS='<div><div class="comment-upvote on">'+currComment.upvotes+'</div></div><div class="comment-text" -comment-id="'+currComment.cid+'">' + y.render() + '</div>'+
							'<div class="comment-time timecol">' + commentTimeS + '</div>'+del;
							}
							else {
								var commentS='<div><div class="comment-upvote">'+currComment.upvotes+'</div></div><div class="comment-text" -comment-id="'+currComment.cid+'">' + y.render() + '</div>'+
							'<div class="comment-time timecol">' + commentTimeS + '</div>'+del;
							}
							
							commentsListH+="<li>"+commentS+"</li>";
						})
					}
					else {
						//console.log("comment key " + this.entryNodeModel.pid + " not found")
					}
				commentsListH+='</ul>';
				
				var numComments;
				if(postCommentsModel!==null)
					numComments=postCommentsModel.length;
				else
					numComments=this.entryNodeModel.num_comments;

				var numCommentsMsg=''+'Comment';
				if(numComments == 1)
					numCommentsMsg=''+numComments + " Comment";
				else if(numComments > 1)
					numCommentsMsg=''+numComments + " Comments";

				//entryNodeBody="<div>"+table+"</div>";
				//comments=""

				//note: expandedComments is global
				if(this.entryNodeModel.pid in expandedComments)
					this.myCommentsExpanded="init-expanded";
				else
					this.myCommentsExpanded="init-hidden";

				comments='<div class="showcomments"><a href="#" class="showcomments">'+numCommentsMsg+'</a> \
					<div class="commentform '+this.myCommentsExpanded+'"> ' +
						'<textarea class="commentsinput" placeholder="Comment; press ENTER to submit" -idea-id="'+this.entryNodeModel.pid+'"></textarea>' +
						commentsListH +
					'</div>' +
				'</div>';

				var addRel="<div class='related-ideas-all'>" + 
						"<ul class='related-ideas'>" + 
						"</ul>" + 
						"<div class='related-idea-input'>" +
						"	<input class='related-idea-add typeahead' placeholder='+ Add Related Idea' width='200'>" +
						"<ul class='suggest-labels'></ul>"+
						"</div>" +
				"</div>";


				//entryNodeBody+=comments;
				var del = isAdmin ? "<div class='delete'><a href='#'>Delete</a></div>" : "";

				table += '<tr>'+	
					upvoter+
					'<td class="ideaTxt">'+"<div class='ideaTxtInner'></div>" +
					addRel + "<div class='subscribe'>Get Notifications</div>"+ " · "+ "<div class='report'>Report</div>"+ " · " +		
					status + " · " + 
					"<div class='timecol'>"+time+del+"</div>"+ " · " +comments+"</td>" +  
					"</tr>";

		   	table+="</table>";

		   	entryNodeBody="<div>"+table+"</div>";
		   	entryNodeBody=$($.parseHTML(entryNodeBody));
			var eTView=this.eT.render();

			// there should only ever be one
			entryNodeBody.find("div.ideaTxtInner").append(eTView);
		}
		

		//render children
		//View means HTML
		var childrenListView=$($.parseHTML("<ul class='entrylist'></ul>"));
		for(var key in this.children) {
			var cNRendered=this.children[key].render();

			var entryNodeChildView=$($.parseHTML("<li></li>\n"));
			entryNodeChildView.append(cNRendered);

			childrenListView.append(entryNodeChildView);
		}

		this.viewDomE = $($.parseHTML("<ul class='entryNode' -idea-id='"+this.entryNodeModel.pid+"'>" + 
		"</ul>"));
		

		var eNBLi=$($.parseHTML("<li class='body'></li>"));
		eNBLi.append(entryNodeBody);

		var cLVLi=$($.parseHTML("<li class='children'></li>"));
		cLVLi.append(childrenListView);

		this.viewDomE.append(eNBLi);
		this.viewDomE.append(cLVLi);
		// if(this.eT !==null)	
		// 	this.eT.killHTML();
		return this.viewDomE;
	}
}