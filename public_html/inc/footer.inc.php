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
        <a href="<?="ideabox-admin.php?mapid=$getmapid" ?>">Admin Dashboard</a><br>
        <p>Powered by <a href="index.php">IdeaBox</a>. <a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></p>
      </div>
      <div class="col-sm-3 feedbackbuttoncontainer">
<a style="margin-left:-190px; margin-right:40px" href="index.php">+ Make an idea box</a>
        <a href="ideabox.php?mapid=95" target="_blank" id="feedbackbutton">Give us Feedback</a>
      </div>
    </div>
  </div>
</footer>