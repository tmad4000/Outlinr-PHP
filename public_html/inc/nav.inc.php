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
            <div class="outline navbar-brand"><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/St-Catherines_College_Oxford_Coat_Of_Arms_(Motto).svg/524px-St-Catherines_College_Oxford_Coat_Of_Arms_(Motto).svg.png" style="height:35px;width:30px;margin-top:-5px;margin-right:10px"><?= strpos($_SERVER['PHP_SELF'],"index.1.7_suggestionbox_ideamaps.php") ? '' : $r['mapname'] ?></div> 
            <span class="navbar-text"><a href="index.1.7_suggestionbox.php?mapid=<?= $getmapid ?>">Ideas</a><a href="index.1.7_suggestionbox_people.php?mapid=<?= $getmapid ?>">People</a></span>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" style="float:right" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">

              <!-- <li><a href="index.1.7_suggestionbox_ideamaps.php">+ Make an idea box</a></li> -->
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