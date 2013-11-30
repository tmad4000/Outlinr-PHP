function EntryTextView(eT){

	this.eT = eT;
	
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
}