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

	this.loadComments = function() {
		var postCommentsModel=null;
		var cl="";
		//note: commentsModel is global
		if(this.entryNodeModel.pid+"" in commentsModel){
			//console.log("")
			postCommentsModel=commentsModel[this.entryNodeModel.pid];
			
			$.each(postCommentsModel,function(i,currComment) {
				var y = new EntryNodeCommentViewModel(currComment.comment_text,currComment.cid);
				var commentTime = moment(currComment.time * 1000).fromNow();
				//var commentTimeS=dateToString(commentTime.getMonth(), commentTime.getDate()) + ", " + timeToString(commentTime.getHours(), commentTime.getMinutes());
				var del = isAdmin ? " <div class='delete-comment'><a href='#'>Delete</a></div>" : "";
				if(getCookie("c"+currComment.cid)!= ""){
					var commentS='<div><div class="comment-upvote on"><i class="ion-ios7-arrow-up"></i><span class="nrofVotes">'+currComment.upvotes+'</span></div></div><div class="comment-text" -comment-id="'+currComment.cid+'">' + y.render() + '</div>'+
				'<div class="comment-time timecol">' + commentTime + '</div>'+del;
				}
				else {
					var commentS='<div><div class="comment-upvote"><i class="ion-ios7-arrow-up"></i>'+currComment.upvotes+'</div></div><div class="comment-text" -comment-id="'+currComment.cid+'">' + y.render() + '</div>'+
				'<div class="comment-time timecol">' + commentTime + '</div>'+del;
				}
				
				cl+="<li>"+commentS+"</li>";
			})

			this.getViewDomE().children("li.body").find("ul.comments").html("").append(cl);

		}
		else {
			//console.log("comment key " + this.entryNodeModel.pid + " not found")
		}
	}

/* //#future -- needs post dict
	this.hideComments = function() {
		this.getViewDomE().children("li.body").find("ul.comments").removeClass('init-expanded').addClass('init-hidden');
	}

	this.hideComments = function() {
		this.getViewDomE().children("li.body").find("ul.comments").removeClass('init-hidden').addClass('init-hidden');
	}
	*/

	this.loadCommentsRecurs = function() {
		this.loadComments();

		for(var key in this.children) {
			this.children[key].loadCommentsRecurs();
		}
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
				status = "<span class='status'><i class='ion-record status sc"+this.entryNodeModel.status +"'></i> "+statusTable[this.entryNodeModel.status]+progEntry +this.entryNodeModel.metric+"</span>";
				if(getCookie("i"+this.entryNodeModel.pid)== "voted"){
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote on"><i class="ion-ios7-arrow-up"></i></span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}
				else {
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote"><i class="ion-ios7-arrow-up"></i></span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}


				//Comments
				
				var commentsListH='<ul class="comments">';

				var postCommentsModel=null;
					//note: commentsModel is global
					if(this.entryNodeModel.pid+"" in commentsModel){
						//console.log("")
						postCommentsModel=commentsModel[this.entryNodeModel.pid];
					}
					else {
						//console.log("comment key " + this.entryNodeModel.pid + " not found")
					}

				//comments load now asynch

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

				numCommentsMsg+=""
				//entryNodeBody="<div>"+table+"</div>";
				//comments=""

				//note: expandedComments is global
				if(this.entryNodeModel.pid in expandedComments)
					this.myCommentsExpanded="init-expanded";
				else
					this.myCommentsExpanded="init-hidden";

				var commentExpandLink = '<a href="#" class="showcomments">'+numCommentsMsg+'</a>';
				
				comments='<div class="showcomments"> \
					<div class="commentform '+this.myCommentsExpanded+'" -idea-id="'+this.entryNodeModel.pid+'"> ' +

						'<textarea class="commentsinput" placeholder="Comment; press ENTER to submit" ></textarea>' +
							commentsListH +

					'</div>' +
				'</div>';

//#HACK related-ideas not necessary? #todo
				var addRel="<div class='related-ideas-all'>" + 
						"<ul class='related-ideas'>"  + 
						"</ul>" + 
						"<div class='related-idea-input'>" +
						"	<input class='related-idea-add typeahead' placeholder='+ Add Related Idea' width='200'>" +
						"<ul class='suggest-labels'></ul>"+
						"</div>" +
				"</div>";


				//entryNodeBody+=comments;
				var del = isAdmin ? " · <div class='delete'><a href='#'>Delete</a></div>" : "";

				table += '<tr>'+	
					upvoter+
					'<td class="ideaTxt">'+"<div class='ideaTxtInner'></div>" +
					addRel /*+ "<div class='subscribe'>Get Notifications</div>"+ " · "+ "<div class='report'>Report</div>"+ " · "*/ +		
					"<div class='ideaTxtFooter'>"+

					commentExpandLink+
					"<div class='ideaTxtFooter-r'>"+
					status + " · " + 
					"<span class='timecol'>"+time+"</span>"+del+"</div> " +"</div>"+comments+"</td>" +  

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