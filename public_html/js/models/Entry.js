function Entry(entryNode) {
	
	//constructor
	this.eT = new EntryText(entryNode.body,entryNode.pid);
	this.entryNode=entryNode; //js obj from json
	this.domE = null;

	this.filter = function(query){
		if(this.domE === null){
			console.log("domE is null")
			return;
		}
		if(!this.eT.matches(query)){
			this.domE.css("display","none");
		}
		else{
			this.domE.css("display","inherit");
		}
	}

	this.render = function(){
		//entryNodeBodyToHTML
		//entryNodeChildrenToHTML
		var entryNodeBody="";
		
		if(entryNode.pid!=null) {
			var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    
			entryNode;

			var time = new Date(entryNode.time * 1000);

			//moved to UTIL var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
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

			
			table += '<tr>'+status + upvoter+'<td class="ideaTxt">' + eT.render() + "<br />"+comments+"</td>" + 
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

		this.domE = $($.parseHTML("<ul class='entryNode'>" + 
		"<li>" + entryNodeBody + "</li>" +
		"<li>\n<ul class='entrylist'>" + entryNodeChildren + "</ul>\n</li>" +
		"</ul>"));
		return this.domE;
	}


}
