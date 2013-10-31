<?php 
require_once('mysql.php');

include_once("analyticstracking.php");

$getmapid=$_GET['mapid']+0;

$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result)

?>

<div class="navbar navbar-fixed-top">
  <div class="navbar-inner">
    <div class="container-fluid">

      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      
      <a class="brand" href="index.1.7_mitsuggestionbox_ideamaps.php"><img src="" height="20" width="20"><!--<img src="http://www.dpcma.org/Portals/1/massachusetts-seal.gif" height="20" width="20">--> &nbsp; Outline <span style="color:#CCC;">&nbsp; <?= strpos($_SERVER['PHP_SELF'],"index.1.7_mitsuggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></span></a> 
      <div class="nav-collapse">
        <ul class="nav">


          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_mitsuggestionbox.php") ? ' class="active"' : '' ?>><a href="index.1.7_mitsuggestionbox.php?mapid=<?= $_GET['mapid'] ?>">IdeaMap</a></li>
          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_mitsuggestionbox_inProgress.php") ? ' class="active"' : '' ?>><a href="index.1.7_mitsuggestionbox_inProgress.php?mapid=<?= $_GET['mapid'] ?>">InProgress</a></li>
          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_mitsuggestionbox_proposals.php") ? ' class="active"' : '' ?>><a href="index.1.7_mitsuggestionbox_proposals.php?mapid=<?= $_GET['mapid'] ?>">Proposals</a></li>
          <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
         
        </ul>
        <p class="navbar-text pull-right"><a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">&nbsp;&nbsp;</a></p>
<!--        <p class="navbar-text pull-right">Logged in as <a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">username</a></p>-->
        <p class="navbar-text pull-right"><a href="http://ideaoverflowideplan.tk/" target="_blank">Grand Vision</a> &nbsp; &nbsp; &nbsp; &nbsp;</p>
      </div><!--/.nav-collapse -->

    </div>
  </div>
</div>