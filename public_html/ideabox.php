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
    $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
    $r = mysqli_fetch_assoc($result);
  ?>
  <title>IdeaBox -- <?= strpos($_SERVER['PHP_SELF'],"ideabox_ideamaps.php") ? '' : $r['mapname'] ?></title>
  <?php include('inc/includes.php'); ?>
  <script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script> 
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>    
  <script type="text/javascript" src="js/client_admin.js"></script>
  
  <link rel="stylesheet/less" type="text/css" href="styles/ideabox.less" />
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
  

</head>
<body>
  <div class="container-fluid outermost">
 
  <?php 
  include('inc/nav.inc.php');
  ?>

    <div class="row">
      <div class="col-sm-9">
        <div class="row" id="box-description">
          <div class="col-sm-12">
            <span id="box-description-text" >

<?php
//#hack
echo $r['mapdesc'];
 ?> </span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <form id="postform">
              <div class="input-append">
                <textarea class="span12" placeholder="Type an idea, suggestion, or goal for <?= strpos($_SERVER['PHP_SELF'],"ideabox_ideamaps.php") ? '' : $r['mapname'] ?>" id="newpost" ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div id="tableHeaderDiv">
              <div id="numResults"></div>
              <div id="filterBy">
                  <a id='sortByHot' class="active"><i class="ion-fireball"></i><span>Hot</span></a>
                  <a id='sortByDate'><i class="ion-ios7-lightbulb-outline"></i><span>New</span></a>
                  <a id="sortByUpvotes"><i class="ion-ios7-star-outline"></i>Top</a>
                  <a id='sortByStatus'><i class="ion-ios7-checkmark-outline"></i>Progress</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div id="currentposts">
              <center><i class="ion-loading-c"></i></center>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="sidebar-nav-fixed navbar-inner">
          <ul class="nav nav-list">
            <li class="nav-header">Categories</li>
            <ul id="idea-hashtags" class="tags">
            </ul>
            <li class="nav-header">People</li>
            <ul id="people-list" class="tags">
            </ul>
            <!--<li class="nav-header">All Ideas</li>
            <ul id="ideanames" class="">
            </ul>
            -->
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

