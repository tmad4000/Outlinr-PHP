<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");

$getmapid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0));

$query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
//echo $query;
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result)

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
            <a class="outline navbar-brand" href='index.1.7_suggestionbox_ideamaps.php'>Suggestion.Box</a> 
            <p class="navbar-text"><?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></p>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" style="float:right" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">

              <li><a href="index.1.7_suggestionbox_ideamaps.php">Make a suggestion box</a></li>
              <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
            </ul>
            <form class="navbar-form nav navbar-nav navbar-right" role="search">
              <div class="form-group">
                <span></span><input type="text" id="usrhandle" class="form-control" placeholder="Username">
              </div>
            </form>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</div>