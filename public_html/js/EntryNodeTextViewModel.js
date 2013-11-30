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
	
	//bolds matches, returns true if a match
	this.filter = function(query){
		
		
		return true;
	}

	this.pushSplits = function(re,ray) { // should be private
		var m=this.txt.regexMatchOffset(re,0);
		// removes Duplicates
		for(var i=0;i<m.length;i++) {
			if(i==0 || !(m[i][0]==m[i-1][0] && m[i][1]==m[i-1][1])){
				ray.push(m[i][0],m[i][1]+m[i][0]);//start and end of substring
			}
		}
	}

	//may contain duplicates
	this.setCritPts = function() {// should be private
		this.critPts=[];
		var a1=0;
		while(a1<this.tSplit.length){
			this.critPts.push(this.tSplit[a1]);
			a1++;
		}
		a1 = 0;
		while(a1<this.hSplits.length){
			this.critPts.push(this.hSplits[a1]);
			a1++;
		}
		a1=0;
		while(a1<this.bSplits.length){
			this.critPts.push(this.bSplits[a1]);
			a1++;
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

	}*/

	this.setBold = function(s1,s2) { 
		this.pushSplits([[s1,s2]],this.bSplits);
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

	this.render = function() {
		//bulid tagsI: (tags, index to insert)
		if(!this.critPtsSet)
			this.setCritPts();


		var strWTags=[];
		var openB=false;
		var lastI;
		for(var j=0;j<this.critPts.length;j++) {

			var o;
			var i=this.critPts[j];

			if(j>0) //skip dup
				if(lastI==i) {
					//lastI=i;
					continue;
				}

			if(i==this.tSplit[0]){
				o='<a class="ideaname suggname" href="#" name="'+this.pid+'">';
			}
			if(i==this.tSplit[1]){
				o="</a>";
				if(openB)
					o="</b>"+o+"<b>"
			}

			//i is a this.bSplit open
			if(this.isASplitOpenOrClose(i,this.bSplits,0)){
				o="<b>"
				openB=true;
			}

			//i is a this.bSplit close
			if(this.isASplitOpenOrClose(i,this.bSplits,1)){
				o="</b>"
				openB=false;
			}

			//i is a this.hSplit open
			if(this.isASplitOpenOrClose(i,this.hSplits,0)){
				o='<a class="hashtag" href="#">'
			}

			//i is a this.hSplit close
			if(this.isASplitOpenOrClose(i,this.hSplits,1)){
				o="</a>"
			}

			if(j>0) strWTags.push(this.txt.substr(lastI,i));
			strWTags.push(o);

			lastI=i;

			//			strWTags.push([o,i]);
		}
		//console.log(x=strWTags);
		return nl2br(strWTags.join(""));	
		/*

		//hash
		for(var i=0;i<st.length;i++) {
			st[i]=splitTxt(st[i],this.hSplits);

		}
		
		//bold
		for(var i=0;i<st.length;i++) {
			for(var j=0;j<st.length;j++) {
				st[i][j]=splitTxt(st[i][j],this.bSplits);
			}

		}


		//reconstitute st into text
		var rt;

		for(var j=0;j<st.length;j++) {
			for(var k=0;k<st.length;k++) {
				st[i][j]=splitTxt(st[i][j],this.hSplits);
			}
		}

		rt="<a>"+st[0]+"</a>"+st[1];



		}

		//insert special marker where b and /b tags go

		
		return $(this).text(this.txt);*/
	}


	//constructor #ERROR HERE!
	this.pushSplits(hashtag_regexp,this.hSplits);
	this.tSplit=[0,findTitleEnd(this.txt)];

}