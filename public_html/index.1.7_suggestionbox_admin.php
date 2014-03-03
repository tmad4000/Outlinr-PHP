<?php 
require_once('../config.inc.php');
$getmapid=$_GET['mapid']+0;

if(isset($_GET['logout'])) {
  session_destroy();
  session_start();

  header("Location:index.1.7_suggestionbox.php?mapid=$getmapid"); // TODO auto map id recognize
}
?>

<!DOCTYPE html>
<html><head>
<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");



$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
  //echo $query;
  //var_dump($MYSQLI_LINK);
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result);

?>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>GestaltBox -- <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></title>
<script src="js/lib/moment-with-langs.js"></script>
<script src="js/lib/jquery-1.10.2.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script type="text/javascript" src="js/util.js"></script>
<script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script> 
<script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
<script type="text/javascript" src="js/EntryNodeViewModel.js"></script>    
<script type="text/javascript" src="js/client_admin.js"></script>



<link href="js/lib/bootstrap-combined.min.css" rel="stylesheet">
<link href="js/lib/bootstrap-responsive.min.css" rel="stylesheet">

  <!--
  <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
-->
<link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link href="styles/style.css" rel="stylesheet">


<style type='text/css'>
  body {
    padding-bottom: 40px;
    padding-top: 45px;
  }
  .navbar {
    letter-spacing: 1px !important;
  }

  .sidebar-nav-fixed {
    <?php if($isMobile) { ?> display:none; <?php } ?>
    padding:0;
    position:fixed;
    right:20px;
    top:55px;
    width:250px;
  }

  .row-fluid > .span-fixed-sidebar {
    margin-right: 290px;
  }

  #ideanames, .idea-hashtags, .people-list {
    overflow:auto;
    max-height:300px;
    margin-left:10px;
  }

  #ideanames li{
    line-height: 14px;
    padding-bottom: 6px;
  }

  ul.ideatags li {
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

.outline:hover{
  text-decoration: none;
}

.vote {
  display: block;
  background: url('images/upvote-small.png');
  background-repeat: no-repeat;
  width: 23px;
  height: 14px;
  background-position: 0px -14px;
  margin-left:1px;
} 


.vote.on {
  background-position: 0px 1px;
}
td.votes {
	font-size:14px;
	color:#AAA;
	text-align:center;
	width:24px;
  cursor:pointer;
  float:center;
  text-align: middle;
}

/*popover */
.idea {position: absolute; top: 100px; left: 100px;}

td.ideaTxt {
	/*width:100%;*/
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
  /*color:#D41528;*/
  color:#090909;
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


            <li class="active"><a href="index.1.7_suggestionbox.php">Ideas</a></li>
            <li><a href="index.1.7_suggestionbox_inProgress.php">Progress</a></li>
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
          <?php 
          if($r['password']==='' || $r['password']===$_GET['pw']){
            $_SESSION['admin_'.$getmapid]=TRUE;
          }
          if($_SESSION['admin_'.$getmapid]==TRUE) { ?>
          <ul class="nav nav-list">
            <li class="nav-header">Categories (#)</li>

            <ul id="idea-hashtags" class="ideatags">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
            </ul>
            <li class="nav-header">People (~)</li>

            <ul id="people-list" class="peopletags">
              <!--<li class="active"><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>-->
            </ul>
            <li class="nav-header">All Ideas</li>
            <ul id="ideanames" class="">
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
        <?php } ?>
      </div><!--/.well -->
    </div><!--/span-->

    <div class="span9 span-fixed-sidebar">
      <div class="hero-unit-light" style="padding-top:0">
        <h3>Admin</h3>
        <?php 
        if($r['password']===''){
         $_SESSION['admin_'.$getmapid]=TRUE;
         echo 'No password set. ';
       }
       elseif($r['password']===$_GET['pw'])
         $_SESSION['admin_'.$getmapid]=TRUE;
       elseif(isset($_GET['login'])) {
        if($_SESSION['admin_'.$getmapid]===TRUE){
          echo "Note: password not in url<br>";
        }
        else
          echo "Invalid Password<br>";
      }
      
      
	  //if(isset($_GET['login'])) {
      
      

	  //}
      if($_SESSION['admin_'.$getmapid]!==TRUE) {
        ?>
        <form name="login" action="<?= $_SERVER['PHP_SELF'] ?>" method="get">
         <br>
         <input type="text" name="pw" placeholder="Enter Password">
         <input type="hidden" name="mapid" value="<?= "{$getmapid}" ?>" />
         <input type="submit" name="login" class="loginadminbutton">
       </form>

       
       <?php
     }
     else {
      echo "Logged in to map <em>{$r['mapname']}</em>. <a href='?mapid=$getmapid&logout'>Logout</a>.";
      ?>
      <input type="hidden" id="is-admin" value="true"/>
      
      
      <hr>
      <!--<span class="vote"> </span>-->
      <form id="postform">
        <div class="input-append" style="width:100%">
          <textarea class="span12" placeholder="Type your own cool project idea, suggestion, goal for your group, or complaint here! Press ENTER to submit." id="newpost" ></textarea>
        </div>
      </form>
      <div id="tableHeaderDiv">
        <div id="numResults"></div>
        <div id="filterBy">
          <a id='sortByDate' class="active">New</a>
          <a id="sortByUpvotes">Top</a>
          <a id='sortByStatus'>Status</a>
        </div>
      </div>
      <div id="currentposts"><center>Loading...</center></div>

    </div>
    
    <?php
  }
  ?>
  <hr>

  <footer>
    <p>Created by <a target="_blank" href="mailto:jcole@mit.edu">Jacob Cole</a> and <a target="_blank" href="mailto:david.furlong@stcatz.ox.ac.uk">David Furlong</a>. <a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></p>
  </footer>
  <div id="feedbackbutton"><a href="http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/pika/public_html/index.1.7_suggestionbox.php?mapid=95" target="_blank">Feedback</a></div>

</div><!--/.fluid-container-->
</body>
</html>