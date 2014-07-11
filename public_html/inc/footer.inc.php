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
  <hr>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8">
      <a href="<?="index.1.7_suggestionbox_admin.php?mapid=$getmapid" ?>">Admin</a>&nbsp;&nbsp;&nbsp;
        <a target="_blank" href="mailto:jcole@mit.edu,david.furlong@stcatz.ox.ac.uk?subject=Claim this IdeaJoin Box: <?php echo trim($r['mapname'])."; id $getmapid" ?>&body=Please identify yourself here and we can set you a password. %0A%0A Cheers, %0A Jacob and David">Claim your suggestion box</a>&nbsp;&nbsp;&nbsp;
        <p>Created by <a target="_blank" href="mailto:jcole@mit.edu">Jacob Cole</a> and <a target="_blank" href="mailto:david.furlong@stcatz.ox.ac.uk">David Furlong</a>. <a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></p>                
<!--                 <span style="padding-right:16px;"><a href="https://drive.google.com/file/d/0B-pHhDIV_JyBSUtfV1FOcDR2b1U/edit?usp=sharing" target="_blank">Sample Committee Motion</a></span>
 -->      

      </div>
      <div class="col-sm-3 feedbackbuttoncontainer">

         <div id="feedbackbutton"><a href="?mapid=95" target="_blank">Feedback</a></div>
      </div>
    </div>
  </div>

  

      </footer>

<!-- 
<footer>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-9">
        <a href="<?="index.1.7_suggestionbox_admin.php?mapid=$getmapid" ?>">Admin Dashboard</a><br>
        <p>Powered by <a href="index.1.7_suggestionbox_ideamaps.php">IdeaBox</a>. <a href="http://ideaflowplan.tk/" target="_blank">Grand Vision</a></p>
      </div>
      <div class="col-sm-3 feedbackbuttoncontainer">
<a style="margin-left:-190px; margin-right:40px" href="index.1.7_suggestionbox_ideamaps.php">+ Make an idea box</a>
        <a href="index.1.7_suggestionbox.php?mapid=95" target="_blank" id="feedbackbutton">Give us Feedback</a>
      </div>
    </div>
  </div>
</footer> -->