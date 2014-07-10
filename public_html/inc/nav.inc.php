<?php 
require_once('inc/mysql.inc.php');

include_once("inc/analyticstracking.inc.php");
$ideamap = false;
$getmapid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0));
$getideaid=intval((mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['ideaid'])))+0));
if($getmapid){
  $ideamap = true;
  $query = "SELECT * FROM ideamaps WHERE mapid={$getmapid}";
}
else {
  $query = "SELECT * FROM post_ideas_mitsugg WHERE pid={$getideaid}";
}

$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
$r = mysqli_fetch_assoc($result);

$pagefilename=basename($_SERVER['PHP_SELF']);

$pagesdict=array(
  "index.php"=>"ideamaps",
  "ideabox.php"=>"list",
  "ideabox-graph.php"=>"graph",
  "ideabox-people.php"=>"people",
  "ideabox-idea.php"=>"idea"
  );

  $page=$pagesdict[$pagefilename];

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
              <a href="index.php">IdeaJoin</a>
              <?php if($ideamap && $r['maplogourl']) { ?>
                <!--width:30px;-->
                <img src="<?=$r['maplogourl'] ?>" style="height:35px;margin-top:-5px;margin-right:10px">
              <?php } ?>

              <?= strpos($_SERVER['PHP_SELF'],"index.php") || !$ideamap ? $r['title'] : $r['mapname'] ?></div> 
            <?php if($ideamap){ ?>
            <ul class="nav navbar-nav">
              <li <?= $page=="list"?'class="active"':"" ?> ><a href="ideabox.php?mapid=<?= $ideamap ? $getmapid : $getideaid ?>">List</a></li>
              <li <?= $page=="graph"?'class="active"':"" ?> ><a href="ideabox-graph.php?mapid=<?= $ideamap ? $getmapid : $getideaid ?>">Graph</a></li>
              <li <?= $page=="people"?'class="active"':"" ?> ><a href="ideabox-people.php?mapid=<?= $ideamap ? $getmapid : $getideaid ?>">People</a></li>  
            </ul> 
            <?php  } ?> 
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" style="float:right" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <input type="hidden" value="<?= $getmapid ?>" id="mapidform" />
            </ul>
            <form class="navbar-form nav navbar-nav navbar-right" role="search">
              <div class="form-group">
                <span style="font-size:12pt;">~</span><input type="text" id="usrhandle" class="form-control" placeholder="Email">
              </div>
            </form>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</div>