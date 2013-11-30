function EntryList(entryNode) {
	
	this.entryNode = entryNode; // JS Object from JSON


	this.domE = null;

	this.filter = function(query){
		//#TODO

		// TODO FIX SPLIT ON NEW LINES
		query = removeCommonWords(query.replace(/[^a-zA-Z0-9# ,\r\n]/gi,"").toLowerCase());
		query = query.split(/[\r\n ,]+/);


		$('#currentposts > ul.entryNode > li > ul.entrylist > li .entryNode').each(function(){
			
			var h=true;
			var itN=$(this).find('td.ideaTxt');
			var pid=itN.children(".ideaname").attr('name');
			var it=itN.text();
			var tem=new EntryText(it,pid);

			for(var i=0;i<query.length;i++){
				var mi = it.toLowerCase().indexOf(query[i]);

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
					/*				var re = new RegExp("("+query[i]+")","gi");
					it=it.replace(re,"<b>$1</b>");*/
					//				console.log("test"+it);

					//var tem=new Entry(it,pid);
					tem.setBold(mi,query[i].length);
					var r = tem.render();
					itN.html(r); //TODO add third param to this, pass whether bold or not so we can put it inside.
					//console.log(itN.html().replace('a','%'));
					h=false;
				}
			}
			if(!h||(query.length==1 && query[0]=="")) $(this).css('display','inherit'); 
			else $(this).css('display','none');
		});

	}

	var entryNodeToHTML = function(entryNode) {

		//entryNodeBodyToHTML
		//entryNodeChildrenToHTML
		var entryNodeBody="";
		
		if(entryNode.pid!=null) {

			var table = "<table class='table'>" // <tr> <th>Post Body</th>  <th></th>Progress Bar<th>User</th> <th>Time</th> </tr>";    

			var time = new Date(entryNode.time * 1000);

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
	//		console.log('this one should work'+entryNode.body+entryNode.pid);
			var txt = new EntryText(entryNode.body,entryNode.pid);
			txt = txt.render();
			
			table += '<tr>'+status + upvoter+'<td class="ideaTxt">' + txt + "<br />"+comments+"</td>" + 
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

	this.render = function(){
		//#TODO
		this.domE = $($.parseHTML("<ul class='entryNode'>" + 
		"<li>" + entryNodeBody + "</li>" +
		"<li>\n<ul class='entrylist'>" + entryNodeChildren + "</ul>\n</li>" +
		"</ul>"));
		return this.domE;



		// Voting click
		this.domE.find('td.votes').click(function() {
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

		// Status hover over
		this.domE.find("[rel='popover']").popover({
			trigger: "hover", 
			//placement: 'top', IDEALLY want this but it goes wrong
			offset: 10,
			html:true
		});
		
		linkifyBodyHashtags();
	}

	var linkifyBodyHashtags = new function(){
		this.domE.find('.hashtag').click(function(e){
			e.preventDefault();

			var targetName=$(e.target).text();
			$('#newpost').val(targetName).focus();
			filterIdeas(targetName);
		});
	}

}
