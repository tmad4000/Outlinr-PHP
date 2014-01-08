<?php 
require_once('../config.inc.php');
?>

<!DOCTYPE html>
<html>
<head>
  <?php 

  require_once('inc/mysql.inc.php');

  include_once("inc/analyticstracking.inc.php");

  $getmapid=$_GET['mapid']+0;

  $query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
  $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
  $r = mysqli_fetch_assoc($result)

  ?>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>IdeaOverflow -- <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  
  <script src="js/lib/jquery-1.10.2.min.js"></script>
  <script src="js/lib/bootstrap.min.js"></script> 
  <script type="text/javascript" src="js/util.js"></script>
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>    
  <script type="text/javascript" src="js/client.js"></script>
  

  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet">
  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-responsive.min.css" rel="stylesheet">
  
  <link href="style.css" rel="stylesheet">
  
  
  <style type='text/css'>
    body {
      padding-bottom: 40px;
      padding-top: 60px;
    }

    .sidebar-nav-fixed {
      padding: 13px 0;
      position:fixed;
      right:20px;
      top:36px;
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

  padding: 5px 8px 7px 0;

}



.vote {
  display: block;
  background: url('images/upvote.png');
  background-repeat: no-repeat;
  width: 40px;
  height: 14px;
  background-position: 0px -25px;
} 


.vote.on {
  background-position: 0px 0px;
}
td.votes {
	font-size:10pt;
	color:#AAA;
	text-align:center;
  vertical-align: middle;
	width:40px;
  cursor:pointer;
}

/*popover */
.idea {position: absolute; top: 100px; left: 100px;}

td.ideaTxt {
	/*width:100%;*/
  vertical-align: middle;
}

td.ideaTxt > b {
	/*width:100%;*/
	font-weight:900;
}



ul.entryNode {
	list-style-type: none;
	padding-top:0
	
}

ul.entrylist {
	list-style-type: none;
	padding-top:0
	
}

ul.entryNode table{
	padding-top:5px;		
	margin-bottom:0;
	
}

ul.entryNode td {
	
	
}

td.uid {
	text-align:right;
}

#currentposts > ul.entrylist {

	padding-left:0;
	margin-left:0;
	
}
#currentposts > ul.entryNode {

	padding-left:0;
	margin-left:0;
	
}
#currentposts > ul.entryNode > li > ul.entrylist {

	padding-left:0;
	margin-left:0;
	
}

#currentposts > ul.entryNode > li > ul.entrylist > li > ul.entryNode {

  padding-left:1px;
  margin-left:0;
  
}



#currentposts .suggname {
  text-decoration:none;
  color:#D41528;
  cursor:text!important;
}

.ideaTxt {
  color:#777;
}
</style>



<!-- <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>
 -->
   

<!--        <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />-->



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
	if(0) { // GONE. POOF
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
            <textarea class="span12" placeholder="Type your own cool project idea, suggestion, goal for your group, or complaint here! Press ENTER to submit." id="newpost" ></textarea>
          </div>
        </form>

        <div id="currentposts"></div>

      </div>
      <hr>

      <footer>
        <p>Created by <a target="_blank" href="mailto:jcole@mit.edu">Jacob Cole</a> and <a target="_blank" href="mailto:david.furlong@stcatz.ox.ac.uk">David Furlong</a></p>
      </footer>
    </div><!--/.fluid-container-->
  </body>
  </html>