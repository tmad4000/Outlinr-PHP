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
		if(!this.getViewDomE()){
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
		if(!this.getViewDomE()){
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
		if(!this.getViewDomE()){ //ERROR
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

	this.getRenderData = function() {
		var getCommentInfo = function(entryNodeModel) {
			var getCommentMessage = function(numComments) {
				return numComments === 0 ? "Comment" :
					numComments === 1 ? "1 Comment" :
					numComments + " Comments";
			};

			var createCommentsList = function(commentModel) {
				return $.map(model, function(comment) {
					var time = new Date(currComment.time * 1000);
					var timeStr = dateToString(commentTime.getMonth(), commentTime.getDate()) + ", "
						+ timeToString(commentTime.getHours(), commentTime.getMinutes());

					return {
						id: comment.cid,
						upvotes: comment.upvotes,
						text: comment.comment_text,
						time: timeStr,
						hasVoted: getCookie("c"+currComment.cid) != ""
					};
				});
			};

			var comments, numComments, myCommentsExpanded;

			if (entryNodeModel.pid + "" in commentsModel) {
				comments = createCommentsList(commentsModel[entryNodeModel.pid]);
				numComments = comments.length;
			}
			else {
				comments = [];
				numComments = entryNodeModel.num_comments;
			}

			// expandedComments is global
			if(entryNodeModel.pid in expandedComments)
				myCommentsExpanded="init-expanded";
			else
				myCommentsExpanded="init-hidden";

			return {
				numCommentsMsg: getCommentMessage(numComments),
				myCommentsExpanded: myCommentsExpanded,
				comments: comments
			};
		}

		// TODO: remove this once we have the comment views working
		var getCommentsHtml = function(entryNodeModel) {
			var postCommentsModel=null;
			var commentsListH='';
			//note: commentsModel is global
			if(entryNodeModel.pid in commentsModel){
				//console.log("")
				postCommentsModel=commentsModel[entryNodeModel.pid];
				
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
			return commentsListH;
		}

		var getChildrenRenderData = function(children) {
			return $.map(children, function(child) {
				return child.getRenderData();
			});
		}

		var getDataWithEntryNodeModel = function(entryNodeModel, children, entryNodeText) {
			var progEntry = entryNodeModel.progress && entryNodeModel.progress != "null" 
							? entryNodeModel.progress + '% - ' : "";

			var commentInfo = getCommentInfo(entryNodeModel);

			return {
				hasEntryNodeModel: true,
				entryNodeModel: entryNodeModel,

				progEntry: progEntry,
				statusTableEntry: statusTable[entryNodeModel.status],
				hasVoted: getCookie("i" + entryNodeModel.pid) === "voted",

				entryNodeTextHtml: Handlebars.SafeString(entryNodeText.render()),

				numCommentsMsg: commentInfo.numCommentsMsg,
				myCommentsExpanded: commentInfo.myCommentsExpanded,
				comments: commentInfo.comments,
				commentsHtml: Handlebars.SafeString(getCommentsHtml(entryNodeModel)),

				time: moment(entryNodeModel.time * 1000).fromNow(),
				isAdmin: isAdmin,

				children: getChildrenRenderData(children)
			};
		};

		var getDataNoEntryNodeModel = function(children) {
			return {
				hasEntryNodeModel: false,
				children: getChildrenRenderData(children)
			};
		};

		return this.entryNodeModel.pid !== null 
			   ? getDataWithEntryNodeModel(this.entryNodeModel, this.children, this.eT) 
			   : getDataNoEntryNodeModel(this.children);
	}

	this.render = function() {
		var createHandlebarsTemplate = function(data) {
			// TODO: update this when we have comments working in handlebars
			var entryNodeViewSource;

			$.ajax('js/views/entryNode.handlebars', {
				async: false,
				success: function(source) {
					entryNodeViewSource = source;
				}
			});
			
			// commentViewSource = $('#commentView').html();

			var template = Handlebars.compile(entryNodeViewSource);

			Handlebars.registerPartial("entryNode", entryNodeViewSource);
			// Handlebars.registerPartial("comment", commentViewSource);

			return template(data);
		};

		this.viewDomE = createHandlebarsTemplate(this.getRenderData());
		return this.viewDomE;
	};


	//render current node, and also, all its children
	//for the root node, perhaps there needn't be self info?
	this.renderA = function() {
		//entryNodeBodyToHTML
		//entryNodeChildrenToHTML
		
		var entryNodeBody="";
		if(this.entryNodeModel.pid!==null) {
			numberOfIdeasVisible +=1;
			updateNrOfIdeasVisible()
	
			var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    

				//dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes())
				var time = moment(this.entryNodeModel.time * 1000).fromNow();
				//moved to UTIL var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
				var progEntry=this.entryNodeModel.progress && this.entryNodeModel.progress != "null" ? this.entryNodeModel.progress + '% - ': "";

				status ="<td class='status'>" +
						'<div class="star">'+'<a class="star-off star-on" href="#" title="This is a favorite question (click again to undo)">&nbsp;&nbsp;&nbsp;</a>'+'</div>' +
						'<div class="status-box"><a href="#" rel="popover" data-content="'+progEntry +this.entryNodeModel.metric+'" data-original-title="'
						+statusTable[this.entryNodeModel.status]+'"><div class="status sc'+this.entryNodeModel.status +'" >'+ '</div></a><div>' + 
					"</td>";
				if(getCookie("i"+this.entryNodeModel.pid)== "voted"){
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote on"> </span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}
				else {
					upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote"> </span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';
				}


				//Comments
				var postCommentsModel=null;
				var commentsListH='<ul class="comments">';
					//note: commentsModel is global
					if(this.entryNodeModel.pid in commentsModel){
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

				var numCommentsMsg='<i class="fa fa-comments-o"></i> '+'Comment';
				if(numComments == 1)
					numCommentsMsg='<i class="fa fa-comments-o"></i> '+numComments + " Comment";
				else if(numComments > 1)
					numCommentsMsg='<i class="fa fa-comments-o"></i> '+numComments + " Comments";

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
//						'<input class="btn" type="button" value="Comment">' +
						commentsListH +
					'</div>' +
				'</div>';

				var addRel="<div class='related-ideas-all'>" + 
						"<ul class='related-ideas'>" + 
						"</ul>" + 
						"<div class='related-idea-input'>" +
						"	<input class='related-idea-add typeahead' placeholder='Add Related Idea' width='200'>" +
						"<div class='suggest-labels'></div></div>" +
				"</div>";


				//entryNodeBody+=comments;
				var del = isAdmin ? "<div class='delete'><a href='#'>Delete</a></div>" : "";

				table += '<tr>'+
					status + 
					upvoter+
					'<td class="ideaTxt">' +"<div class='ideaTxtInner'></div>" +
					addRel +
					comments+"</td>" + 
				   	// '<td><div class="progressbar"></div></td>' +
				   	"<td class='timecol'>" + time/*dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes())*/ +
					del +
		//		   	"<br><input class=\"LinkCreateType\" placeholder=\"Type a Connection\" />" +
					"</td></tr>";

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
		

		var eNBLi=$($.parseHTML("<li></li>"));
		eNBLi.append(entryNodeBody);

		var cLVLi=$($.parseHTML("<li></li>"));
		cLVLi.append(childrenListView);

		this.viewDomE.append(eNBLi);
		this.viewDomE.append(cLVLi);
		// if(this.eT !==null)	
		// 	this.eT.killHTML();
		return this.viewDomE;
	}
}