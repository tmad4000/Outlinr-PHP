<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");

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
      
      <span class="brand">
        <img src="" height="20" width="20">
        &nbsp; <a class="outline" href='index.1.7_suggestionbox_ideamaps.php'>Outline</a> 
        <span style="color:#CCC;">&nbsp; <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></span>
      </span> 
      <div class="nav-collapse">
        <ul class="nav">


          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox.php?mapid=<?= $_GET['mapid'] ?>">IdeaMap</a></li>
          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_inProgress.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox_inProgress.php?mapid=<?= $_GET['mapid'] ?>">InProgress</a></li>
          <!--<li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_proposals.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox_proposals.php?mapid=<?= $_GET['mapid'] ?>">Proposals</a></li>-->
          <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
         
        </ul>
        <p class="navbar-text pull-right"><a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">&nbsp;&nbsp;</a></p>
<!--        <p class="navbar-text pull-right">Logged in as <a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">username</a></p>-->
        <p class="navbar-text pull-right"><input type="text" id="usremail" placeholder="(optional) Email"><input type="text" id="usrname" placeholder="(optional) Name"><input type="text" id="usrhandle" placeholder="(default anon) Username"></p>
      </div><!--/.nav-collapse -->

    </div>
  </div>
</div>