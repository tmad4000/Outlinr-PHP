<?php 
require_once('../config.inc.php');
?>

<!DOCTYPE html>
<html>
<head>
  <?php 
    require_once('inc/mysql.inc.php');
    include_once("inc/analyticstracking.inc.php");
    $getideaid=$_GET['ideaid']+0;
    $query = "SELECT * FROM post_ideas_mitsugg WHERE pid={$getideaid}";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
    $r = mysqli_fetch_assoc($result);
    $mapid = $r['mapid'];
    $querymap = "SELECT * FROM ideamaps WHERE mapid=$mapid";
    $resultmap = mysqli_query($MYSQLI_LINK, $querymap) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK)); 
    $rmap = mysqli_fetch_assoc($resultmap);
  ?>
  <title>IdeaJoin -- <?= $r['title'] ?></title>
  <?php include('inc/includes.php'); ?>
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>
  <script src="js/client_idea.js"></script> 
  <script src="js/lib/share.min.js"></script>
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php 
    include('inc/nav.inc.php');
    ?>
    <div class="row">
      <div class="col-sm-12">
        <h1>
          <?= $r['body'] ?>
        </h1>
        <caption><?= $r['time'] ?>, <?= $r['status'] ?>, <?= $r['progress'] ?>, <?= $r['upvotes'] ?> Upvotes, in <a href="ideabox.php?<?=$r["mapid"]?>"><?= $rmap["mapname"] ?></a></caption>
         <!-- status progress mapid upvotes -->
        </h2>
        <div id="share">
        </div>
      </div>
    </div>
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

