

function EntryNodeViewModel(this.entryNodeModel) {
	this.this.entryNodeModel=this.entryNodeModel; //js obj from json
	this.viewDomE=null; //until render is called for first time
	
	//attributes of this object
	this.visible=true;

	//self
	this.eT = new EntryNodeTextViewModel(this.entryNodeModel.body,this.entryNodeModel.pid);

	//children
	//this.children = new EntryList(this.this.entryNodeModel['children'])

	//render must be called first so that viewDomE!==null
	this.show = function() {
		if(this.viewDomE === null){
			console.log("viewDomE is null")
			return;
		}

		this.viewDomE.css("display","inherit");
		this.visible=true
	}

	//render must be called first so that viewDomE!==null
	this.hide = function() {
		if(this.viewDomE === null){
			console.log("viewDomE is null")
			return;
		}

		this.viewDomE.css("display","none");
		this.visible=false
	}

	//render must be called first so that viewDomE!==null
	this.filter = function(query){
		if(this.viewDomE === null){
			console.log("viewDomE is null")
			return;
		}

		this.eT.filter(query); //returns true if matches. Boldifies its own text

		if(!this.eT.matches(query)){
			this.hide();
		}
		else {
			this.show();
		}
	}


	//render current node, and also, all its children
	//for the root node, perhaps there needn't be self info?
	this.render = function() {
		//entryNodeBodyToHTML
		//entryNodeChildrenToHTML
		var entryNodeBody="";
		
		if(this.entryNodeModel.pid!=null) {
			var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    
			this.entryNodeModel;

			var time = new Date(this.entryNodeModel.time * 1000);

			//moved to UTIL var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"};
			var progEntry=this.entryNodeModel.progress && this.entryNodeModel.progress != "null" ? this.entryNodeModel.progress + '% - ': "";

			status ="<td class='status'>" + '<a href="#" rel="popover" data-content="'+progEntry +this.entryNodeModel.metric+'" data-original-title="'+statusTable[this.entryNodeModel.status]+'"><div class="status sc'+this.entryNodeModel.status +'" >'+ '</div></a>' + "</td>";
			upvoter='<td class="votes" -idea-id="'+this.entryNodeModel.pid+'"><span class="vote"> </span><span class="votes" >'+this.entryNodeModel.upvotes+'</span></td>';


			//entryNodeBody="<div>"+table+"</div>";
			comments=""
			/*
			comments="<div class='showcomments'><a href='#' class='showcomments'>7+ Comments</a>";
			
			comments+='<div class="commentform"> \
					<div class="commentsinput" contenteditable="true" placeholder="" -idea-id="'+this.entryNodeModel.pid+'"></div> \
					<input class="btn" type="button" value="Comment"> \
				</div>';
			comments+='</div>';
			*/
			//entryNodeBody+=comments;

			
			table += '<tr>'+status + upvoter+'<td class="ideaTxt">' + eT.render() + "<br />"+comments+"</td>" + 
		   	// '<td><div class="progressbar"></div></td>' +
		   	"<td class='uid'><a href='#' class='uid'>" + (this.entryNodeModel.uid!=0 ? this.entryNodeModel.uid : "anon") + "</a></td>" +
		   	"<td class='timecol'>" + dateToString(time.getMonth(), time.getDate()) + ", " + timeToString(time.getHours(), time.getMinutes()) +
		   	"</td></tr>";

		   	table+="</table>";

		   	entryNodeBody="<div>"+table+"</div>";	
		}

		var entryNodeChildren=$($.parseHTML("<ul class='entrylist'></ul>"));
//#TODO #HEAD
		for(var key in this.entryNodeModel.children) {
			var childNodeViewModel=new EntryNodeViewModel(this.entryNodeModel.children[key]);
			var cNRendered=childNodeViewModel.render();

			var entryNodeChild=$.parseHTML("<li>"+cNRendered + "</li>\n");
			entryNodeChildren.append(entryNodeChild)
		}

		this.domE = $($.parseHTML("<ul class='entryNode'>" + 
		"<li>" + entryNodeBody + "</li>" +
		"<li>\n<ul class='entrylist'>" + entryNodeChildren + "</ul>\n</li>" +
		"</ul>"));
		return this.domE;
	}
}