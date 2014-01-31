(function() {
  "use strict";

  var Pos = CodeMirror.Pos;

  CodeMirror.xnHint = function(cm, options) {
    var tags = options && options.tags;
	var cur = cm.getCursor(), token = cm.getTokenAt(cur);
	var list1 = [], list2 = [], result = [], replaceToken = true;
	var string = token.string.slice(1);
	if(token.type == "xn-hashtag"){
		for (var name in tags) if (tags[name].indexOf(string)!=-1){
			if(tags[name].indexOf(string)==0){
				list1.push("#" + tags[name]);
			}else{
				list2.push("#" + tags[name]);
			}
		}
		result = list1.concat(list2);
	}else if(token.type == "xn-persontag"){
		for (var name in tags) if (tags[name].indexOf(string)!=-1){
			if(tags[name].indexOf(string)==0){
				list1.push("~" + tags[name]);
			}else{
				list2.push("~" + tags[name]);
			}
		}
		result = list1.concat(list2);
		
	}else if(token.type == "xn-maptag"){
		for (var name in tags) if (tags[name].indexOf(string)!=-1){
			if(tags[name].indexOf(string)==0){
				list1.push("@" + tags[name]);
			}else{
				list2.push("@" + tags[name]);
			}
		}
		result = list1.concat(list2);
		
	}
    return {
      list: result,
      from: replaceToken ? Pos(cur.line, token.start) : cur,
      to: replaceToken ? Pos(cur.line, token.end) : cur
    };
  };
})();
