<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");

$getmapid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0));

$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result)

?>

<footer>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-9">
        <a href="<?="index.1.7_suggestionbox_admin.php?mapid=$getmapid" ?>">Admin Dashboard</a><br>
        <p>Created by <a target="_blank" href="mailto:jcole@mit.edu">Jacob Cole</a> and <a target="_blank" href="mailto:david.furlong@stcatz.ox.ac.uk">David Furlong</a>. <a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></p>
      </div>
      <div class="col-sm-3 feedbackbuttoncontainer">
        <a href="index.1.7_suggestionbox.php?mapid=95" target="_blank" id="feedbackbutton">Give us Feedback</a>
      </div>
    </div>
  </div>
</footer>