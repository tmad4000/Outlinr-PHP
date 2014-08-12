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
      <div class="col-sm-3">
        <div class="container-middle">
        <span class="category-title">About us</span>
        <ul>
          <li>Press</li>
          <li>Who we are</li>
          <li>Contact</li>
          <li><a href="http://ideaflowplan.tk/">Vision</a></li>
          <li><a href="<?="ideabox-admin.php?mapid=$getmapid" ?>">Admin Dashboard</a></li>
        </ul>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="container-middle">
      <span class="category-title">Help</span>
        <ul>
            <li>FAQ</li>
            <li>Terms of Use</li>
            <li>Support</li>
            <li>Rules</li>
            <li>Signup</li>
        </ul> 
        </div>     
      </div>
      <div class="col-sm-3">
        <div class="container-middle">
      <span class="category-title">Discover</span>
        <ul>
            
        </ul> 
        </div>      
      </div>
        <div class="col-sm-3">
          <div class="container-middle">
      <span class="category-title">Say Hello</span>
          <ul>
            <li>Facebook</li>
            <li>Blog</li>
            <li>Twitter</li>
          </ul> 
          </div>      
      </div>
    </div>
    <div class="row" style="margin-bottom: 30px">
      <div class="col-sm-6">
        IdeaJoin
      </div>
      <div class="col-sm-6" style="text-align: right">
        © 2014 IdeaJoin, Inc.
      </div>
    </div>
  </div>
</footer>
