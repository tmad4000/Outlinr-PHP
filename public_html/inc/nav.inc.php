<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");

$getmapid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0));

$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result);

$pagefilename=basename($_SERVER['PHP_SELF']);

$pagesdict=array(
  "index.1.7_suggestionbox_ideamaps.php"=>"ideamaps",
  "index.1.7_suggestionbox.php"=>"list",
  "index.1.7_suggestionbox_graph.php"=>"graph",
  "index.1.7_suggestionbox_people.php"=>"people",
  );

  $page=$pagesdict[$pagefilename];
;

?>

<div class="row">

    <nav class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <div class="outline navbar-brand">
              <?php if($r['maplogourl']) { ?>
                <!--width:30px;-->
                <img src="<?=$r['maplogourl'] ?>" style="height:35px;margin-top:-5px;margin-right:10px">
                <?php
                }
              ?>

              <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></div> 
<!--               <ul class="nav nav-tabs">
  <li <?= $page=="list"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox.php?mapid=<?= $getmapid ?>">Ideas List</a></li>
  <li <?= $page=="graph"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox_graph.php?mapid=<?= $getmapid ?>">Ideas Graph</a></li>
  <li <?= $page=="people"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox_people.php?mapid=<?= $getmapid ?>">People</a></li>
</ul> -->

            <ul class="nav navbar-nav">
        <li <?= $page=="list"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox.php?mapid=<?= $getmapid ?>">List View</a></li>
  <li <?= $page=="graph"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox_graph.php?mapid=<?= $getmapid ?>">Graph View</a></li>
  <li <?= $page=="people"?'class="active"':"" ?> ><a href="index.1.7_suggestionbox_people.php?mapid=<?= $getmapid ?>">People</a></li>
  
        
      </ul>
           
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" style="float:right" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">




              <li><a href="index.1.7_suggestionbox_ideamaps.php">+ Make an idea box</a></li>
              <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
            </ul>
            <form class="navbar-form nav navbar-nav navbar-right" role="search">
              <div class="form-group">
                <span style="font-size:12pt;">~</span><input type="text" id="usrhandle" class="form-control" placeholder="Username">
              </div>
            </form>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</div>