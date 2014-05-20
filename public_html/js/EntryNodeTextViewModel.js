function EntryNodeTextViewModel(txt,pid) {
	this.viewDomE=null; //until render is called for first time
	//replace with this.critPts=[]; (i,code)
	//model
	this.txt=txt;
	this.pid=pid;
	this.critPts=[];
	this.critPtsSet=false;

	this.bSplits=[]; //bolds
	this.hSplits=[]; //hashtags
	this.tSplit=[]; //title/nontitle
	this.mSplit=[];// "show more.."
	this.uSplits=[]; // urls
	
	//determines whether the string being searched for is in this particular idea text
	this.filter = function(query){
		this.bSplits=[];
		if(!query){
			var r = this.render();
			this.getViewDomE().html(r);
			return true
		}

		query = removeCommonWords(query.toLowerCase());
		query = query.split(/[\r\n ,-]+/);
		var nomatch = true;
		var t = this.txt.toLowerCase()
		
		for(var i=0;i<query.length;i++){
			var mi = t.indexOf(query[i]);
			if(mi>=0&&query[i]!=""){//ignore empty strings from query
				
				this.setBold(mi,query[i].length);
				
				nomatch=false;
			}
		}
		if(!nomatch||(query.length==1 && query[0]=="")){
			var r = this.render();
			this.getViewDomE().html(r); //need parent render
		}
		
		var isMatch = (!nomatch||(query.length==1 && query[0]==""));

		if(isMatch)
			moreText(this.pid);
		
		return isMatch;
		
	}

	//adds splits to a split array
	this.pushSplits = function(re,ray) { // should be private
		// console.log(this);
		var m=this.txt.regexMatchOffset(re,0);
		// Removes Duplicates
		var i=0;
		while(i<m.length) {
			if(i==0 || !(m[i][0]==m[i-1][0] && m[i][1]==m[i-1][1])){
				if(this.txt.charAt(m[i][0]-1)!='~' && this.txt.charAt(m[i][0]-1)!='#')
					ray.push(m[i][0],m[i][1]+m[i][0]);//start and end of substring
			}
			i++;
		}
	}

	//may contain duplicates
	//Determines all the critical points in any given idea (bolds, hashtags, title)
	this.setCritPts = function() {// should be private
		this.critPts=[];
		var iter=0;
		while(iter<this.tSplit.length){
			this.critPts.push(this.tSplit[iter]);
			iter++;
		}
		iter=0;
		while(iter<this.uSplits.length){
			this.critPts.push(this.uSplits[iter]);
			iter++;
		}
		iter = 0;
		while(iter<this.hSplits.length){
			this.critPts.push(this.hSplits[iter]);
			iter++;
		}
		iter=0;
		while(iter<this.bSplits.length){
			this.critPts.push(this.bSplits[iter]);
			iter++;
		}
		
		iter=0;
		while(iter<this.mSplit.length){
			this.critPts.push(this.mSplit[iter]);
			iter++;
		}

		this.critPts = this.critPts.sort(sortNumber);

		// Required since js does lexicographic sorting
		function sortNumber(a,b) {
   		 	return a - b;
		}
		this.critPtsSet=true;
	}
	/*
		var doSplit = function(t,i) {
			return [t.substr(0,i),t.substr(i)]
		}

		var splitTxt = function(t,splitsRay) {
				var outRay=[];

				//if number
				if(!(splitsRay instanceof Array)) {
					return [t.substr(0,splitsRay),t.substr(splitsRay)]
				}
				else {
					var start=0;
					var end=t.length;
					for(var i=0;i<splitsRay.length;i++) {

						start=splitsRay[i][0];
						end=splitsRay[i][1];
						

					}

					return st;
				}

		}
	*/

	this.setBold = function(s1,s2) { 
		this.bSplits.push(s1);
		this.bSplits.push(s1+s2);
		this.critPtsSet=false;
		/*
		var si=this.txt.indexOf(s,0);
		for(var i=0;si>=0;i++) {
			si=this.txt.indexOf(s,i);
			this.bSplits.push([si,si+s.length]);
		}*/
	}

	this.clearBold = function() {//todo
		this.bSplits=[];
		this.critPtsSet=false;
	}

	//oOrC is 0 or 1 for open or close
	this.isASplitOpenOrClose=function(i,whichSplit,oOrC) {// should be private
		for(var n=0;n<whichSplit.length;n++) {
			if(i==whichSplit[n] && n%2==oOrC)
				return true;
		}
		return false;
	}

	// Only for debugging
	this.killHTML = function(){
		this.viewDomE.html("");
	}

	//build tags
	this.render = function() {
		if(!this.critPtsSet)
			this.setCritPts();
		var strWTags=[];
		var openB=false;
		var lastI;
		if(this.critPts.length==0) lastI=0;

		for(var j=0;j<this.critPts.length;j++) {

			var o="";
			var i=this.critPts[j];

			if(j>0) //skip dup
				if(lastI==i) {
					//lastI=i;
					continue;
				}
			//i is a this.bSplit close
			if(this.isASplitOpenOrClose(i,this.bSplits,1)){
				o+="</b>"
				openB=false;
			}
			if(i==this.tSplit[0]){
				o+='<a class="ideaname suggname" name="'+this.pid+'">';
			}
			if(i==this.tSplit[1]){
				o+="</a>";
				if(openB)
					o+="</b>"+o+"<b>"
			}			

			if(this.isASplitOpenOrClose(i,this.mSplit,0)){
				o+=' <a id="m'+this.pid+'" onclick="moreText('+this.pid+')" class="showmore">show more...</a><span id="t'+this.pid+'" class="hiddenText">'
			}
			if(this.isASplitOpenOrClose(i,this.mSplit,1)){
				o+="</span>"
			}

			if(this.isASplitOpenOrClose(i,this.uSplits,0)){
				o+='<a class="url" onclick="urlPress(event)">'
			}

			//i is a this.hSplit open
			if(this.isASplitOpenOrClose(i,this.hSplits,0)){
				o+='<a class="hashtag" onclick="hashtag(event)" href="#">'
			}

			//i is a this.hSplit close
			if(this.isASplitOpenOrClose(i,this.hSplits,1)){
				o+="</a>"
			}
			if(this.isASplitOpenOrClose(i,this.uSplits,1)){
				o+="</a>"
			}

			//i is a this.bSplit open
			if(this.isASplitOpenOrClose(i,this.bSplits,0)){
				o+="<b>"
				openB=true;
			}

			if(j>0) strWTags.push(this.txt.substr(lastI,i-lastI));
			strWTags.push(o);

			lastI=i;

		}
		strWTags.push(this.txt.substr(lastI,this.txt.length-lastI))
		var temp = "<div class='entryNodeText'>"+nl2br(strWTags.join(""))+"</div>";
		this.viewDomE = $($.parseHTML(temp));
		
		return this.viewDomE;
	}

	this.getViewDomE = function(){ // #HACK
		return $('.entryNode[-idea-id="'+this.pid+'"] .entryNodeText');
	}

	
	this.pushSplits(tag_regexp,this.hSplits);
	this.pushSplits(url_regexp,this.uSplits);
	this.tSplit=[0,findTitleEnd(this.txt)];
	if(this.txt.length>300){ //#magicnumber #hack
		this.mSplit=[findMoreTextStart(this.txt),this.txt.length];
	}
}