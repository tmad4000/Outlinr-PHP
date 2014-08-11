<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaJoin</title>
  <?php include('inc/local.php'); ?>
  <script type="text/javascript" src="js/client_ideamaps.js"></script>
  <link rel="stylesheet/less" type="text/css" href="styles/index.less" />
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>
</head>
<body>
  <div class="container-fluid">
    <div class="row margin-vertical">
      <div class="col-sm-6">
        <div id="brand">
          <a href="index.php">IdeaJoin</a>
        </div>
      </div>
      <div class="col-sm-6 right middle margin-vertical">
<!--         <a href="https://github.com/login/oauth/authorize?client_id=3429c5dd62f9e39cf646&scope=user&redirect_uri=http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/dev/public_html/ajax/github_oauth.php" class="link-button">Login with Github</a>
 -->        <a href="create.php" class="link-button">Create New</a>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div id="marketing">
          <h2>An ideation tool for your community.</h2>
          <h2>Discuss, vote on and connect ideas then monitor their progress</h2>
          <h2>100% Free.</h2>
        </div>
      </div>
    </div>
    <div class="row" id="textfield">
      <div class="col-sm-12">
        <form id="postform">
          <div class="input-append">
            <input type="text" class="span12" id="newpost" placeholder="Search idea boxes"/>
          </div>
        </form>
      </div>
    </div>
    <div class="row full-width" id="ideamaps">
      <div class="col-sm-12">
        <div id="currentposts">
          <center><i class="ion-loading-c"></i></center>
        </div>
      </div>
    </div>
  </div>
  <?php
  include('inc/footer-home.inc.php');
  ?>
</body>
</html>