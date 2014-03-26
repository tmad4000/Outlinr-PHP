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
  //var_dump($MYSQLI_LINK);
  $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
  $r = mysqli_fetch_assoc($result);
  ?>
  <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>GestaltBox -- <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  <script src="js/lib/moment-with-langs.js"></script>
  
  <script src="https://code.jquery.com/jquery-2.1.0.min.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>  <script type="text/javascript" src="js/util.js"></script>

  
  <script type="text/javascript" src="js/lib/typeahead.bundle.js"></script>
  <script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.js'></script>
  
  <script type="text/javascript" src="js/util.js"></script>

  <script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script> 
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>    
  <script type="text/javascript" src="js/client_admin.js"></script>

  <link href="css/typeahead.css" rel="stylesheet">
  
  <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

<link rel="stylesheet/less" type="text/css" href="styles/style.less" />

  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
 
  <style type='text/css'>
    
    #ideanames li{
      line-height: 14px;
      padding-bottom: 6px;
    }

    ul.ideatags li {
     display:inline;
     margin:1px
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
</head>
<body>
  <div class="container-fluid outermost">
 
  <?php 
  include('inc/nav.inc.php');
  ?>

    <div class="row">
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12">
            <form id="postform">
              <div class="input-append">
                <textarea class="span12" placeholder="Type an idea, suggestion, or goal for <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?>" id="newpost" ></textarea>
              </div>
              <div class='related-ideas-all'>
                <ul class='related-ideas'>
                  
                </ul>

                <div class='related-idea-input'>
                  <input class='related-idea-add' width="200">
                </div>

              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div id="tableHeaderDiv">
              <div id="numResults"></div>
              <div id="filterBy">
                  <a id='sortByDate' class="active">New</a>
                  <a id="sortByUpvotes">Top</a>
                  <a id='sortByStatus'>Status</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div id="currentposts">
              <center>Loading...</center>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="sidebar-nav-fixed navbar-inner">
          <ul class="nav nav-list">
            <li class="nav-header">Categories (#)</li>
            <ul id="idea-hashtags" class="ideatags">
            </ul>
            <li class="nav-header">People (~)</li>
            <ul id="people-list" class="peopletags">
            </ul>
            <li class="nav-header">All Ideas</li>
            <ul id="ideanames" class="">
            </ul>
          </ul>
        </div><!--/.well -->
      </div><!--/span-->
    </div><!--/row-->
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

