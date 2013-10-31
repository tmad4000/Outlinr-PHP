
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>IdeaOverflow -- Ideas</title>
  
  
    
      <link rel="stylesheet" type="text/css" href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css">
    
    
  
  <style type='text/css'>
    body {
    padding-bottom: 40px;
    padding-top: 60px;
}

.sidebar-nav-fixed {
    padding: 9px 0;
    position:fixed;
    right:20px;
    top:40px;
    width:250px;
}

.row-fluid > .span-fixed-sidebar {
    margin-right: 290px;
}

#ideanames, #ideatags {
overflow:auto;
max-height:300px;
}

#ideanames li{
line-height: 14px;
padding-bottom: 6px;
}

 ul#ideatags li {
 display:inline;
 margin:1px
 }

.hero-unit-light {
    padding: 60px;
  margin-bottom: 30px;
 /* font-size: 18px;
  font-weight: 200;
  line-height: 30px;*/
  color: inherit;
  /*background-color: #eeeeee;*/
  -webkit-border-radius: 6px;
     -moz-border-radius: 6px;
          border-radius: 6px;

}

.table td {
    line-height:auto;
    
    padding: 5px 8px 12px 0;

}



.vote {
  display: block;
  background: url('upvote.png');
  width: 40px;
  height: 25px;
  background-position: 0px -25px;
} 


.vote.on {
  background-position: 0px 0px;
}
td.votes {
	font-size:14px;
	color:#AAA;
	text-align:center;
	width:40px;
}

/*popover */
.idea {position: absolute; top: 100px; left: 100px;}

form#postform {
	padding-bottom:0;
	margin-bottom:0;
}

div#relatedideas {
	border: 1px #ccc solid;
	margin-left: 20px;
	margin-top: -21px;
	margin-bottom: 20px;
}

a.addlink {
margin-right:10px
}
  </style>
  


    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>    
        
    <!--        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />-->
    
<link href="style.css" rel="stylesheet">
    <script type="text/javascript" src="client_wsugg.js"></script>
    
<script type='text/javascript'>//<![CDATA[ 
/*window.onload=function(){
    localStorage.setItem("ideaNames",'[\
    {\
        "name": "CuriosityThread",\
        "description": "asdfasdf"\
    },\
    {\
        "name": "PRIVMSG",\
        "description": "randomURI"\
    }\
]');

 displayIdeaNames();
 }*/
//]]>  



</script>


</head>
<body>
  <?php 
  	include('inc/nav.inc.php');
	if(0) {
	?>
  <div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container-fluid">

      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      
      <a class="brand" href="#"><img src="http://www.dpcma.org/Portals/1/massachusetts-seal.gif" height="20" width="20"> &nbsp; Outline</a>
      <div class="nav-collapse">
        <ul class="nav">


          <li class="active"><a href="index.1.7_suggestionbox.php">IdeaMap</a></li>
          <li><a href="index.1.7_suggestionbox_inProgress.php">InProgress</a></li>
          <li><a href="index.1.7_suggestionbox_proposals.php">Proposals</a></li>
          
         
        </ul>
        <p class="navbar-text pull-right">Logged in as <a href="#">username</a></p>
      </div><!--/.nav-collapse -->

    </div>
  </div>
</div>
<?php } ?>
<div class="container-fluid">
  <div class="row-fluid row">
    <div class="">
      <div class="well sidebar-nav-fixed navbar-inner">
        <ul class="nav nav-list">

          <li class="nav-header">Ideas</li>
          <ul id="ideanames" class="">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
          </ul>
          <li class="nav-header">Categories</li>

          <ul id="ideatags" class="">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
          </ul>
<!--
          <li class="nav-header">Sidebar</li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>-->
        </ul>
      </div><!--/.well -->
    </div><!--/span-->

    <div class="span9 span-fixed-sidebar">
      <div class="hero-unit-light" style="padding-top:0">
<!--<span class="vote"> </span>-->

      
      <form id="postform">
        <div class="input-append" style="width:100%">
          <textarea class="span12" placeholder="Enter your own cool project idea, suggestion, goal for your group, or complaint here!" id="newpost" ></textarea>
          <input class="btn" type="submit"></input>
        </div>
      </form>
      <div id="relatedideas">
</div>
      <div id="currentposts"></div>
      
      </div>
      

  <hr>

  <footer>
    <p>&copy; Company 2012</p>
  </footer>

</div><!--/.fluid-container-->
  
</body>


</html>

