<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");

$getmapid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0));

$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result);
$r=array_map(stripslashes,$r);
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
        <!-- <img src="" height="20" width="20"> -->
        &nbsp; <a class="outline" href='http://ideajoin.com'>IdeaJoin</a> 
        <!-- &nbsp; <a class="outline" href='index.1.7_suggestionbox_ideamaps.php'>IdeaJoin</a>  -->
        <span>&nbsp; <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></span>
        
        <!--<img src="images/email.png" id="emailicon"/>-->
      </span> 
      <div class="nav-collapse">
        <ul class="nav">


          <li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? ' style="display:none"' : '' ?>>
          <a href="http://ideajoin.com">+ Make a suggestion box</a>


          <!-- <a href="index.1.7_suggestionbox_ideamaps.php">+ Make a suggestion box</a> -->
          </li>
          
          

              <!-- <li><a href="index.1.7_suggestionbox_ideamaps.php" style="color:#0088cc;">Graph View</a></li> -->
          <!--<li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox.php?mapid=<?= $_GET['mapid'] ?>">Ideas</a></li>-->
          <!--<li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_inProgress.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox_inProgress.php?mapid=<?= $_GET['mapid'] ?>">Progress</a></li>-->
          <!--<li <?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_proposals.php") ? ' class="active"' : '' ?>><a href="index.1.7_suggestionbox_proposals.php?mapid=<?= $_GET['mapid'] ?>">Proposals</a></li>-->
          
          <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
         
        </ul>
        <!--<p class="navbar-text pull-right"><a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">&nbsp;&nbsp;</a></p>
         <p class="navbar-text pull-right"></p>-->
<!--        <p class="navbar-text pull-right">Logged in as <a href="https://workflowy.com/shared/20888d4e-26e0-2c25-556a-24685029e818/">username</a></p>-->
        <p class="navbar-text pull-right">
        <!--<input type="text" id="usremail" placeholder="(optional) Email"><input type="text" id="usrname" placeholder="(optional) Name">-->
        <span style="padding-right:16px;"><a href="https://drive.google.com/file/d/0B-pHhDIV_JyBSUtfV1FOcDR2b1U/edit?usp=sharing" target="_blank">Sample Committee Motion</a></span>
        <span style="padding-right:16px;"><a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></span>

        
        <span style="font-size:16pt;">~</span><input type="text" id="usrhandle" class="usr" placeholder="username"></p>
      </div><!--/.nav-collapse -->

    </div>
  </div>
</div>