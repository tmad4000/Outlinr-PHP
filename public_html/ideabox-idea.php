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
  ?>
  <title>IdeaJoin -- <?= strpos($_SERVER['PHP_SELF'],"ideabox-idea.php") ? '' : $r['title'] ?></title>
  <?php include('inc/includes.php'); ?>
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>
  <script src="js/lib/client_idea.js"></script>  
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php 
    include('inc/nav.inc.php');
    ?>
  </div><!--/.fluid-container-->
  <?php 
  include('inc/footer.inc.php');
  ?>
</body>
</html>

