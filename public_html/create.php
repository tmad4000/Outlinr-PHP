<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaJoin</title>
  <?php include('inc/includes.php'); ?>
  <script type="text/javascript" src="js/client_ideamaps.js"></script>
  <link rel="stylesheet/less" type="text/css" href="styles/index.less" />
  <script src="js/lib/less-1.7.0.min.js" type="text/javascript"></script>  
</head>
<body>
  <div class="container-fluid outermost">
    <div class="row margin-vertical" id="splash">
      <div class="col-sm-12">
        <div id="brand">
          <a href="index.php">IdeaJoin</a>
        </div>
      </div>
    </div> 
    <div class="row">
      <div class="col-sm-12">
        <form role="form" id="create-box-form">
          <div class="form-group">
            <input type="text" class="form-control input-lg" id="create-box-name" placeholder="IdeaJoin Name">
          </div>
          <div class="form-group">
            <input type="email" class="form-control input-lg" id="create-box-email" placeholder="Email (won't be shared)">
          </div>
          <div class="form-group">
            <input type="password" class="form-control input-lg" id="create-box-password" placeholder="Admin Password">
          </div>
          <!--<div class="checkbox">
            <label>
              <input type="checkbox"> Private to url holders
            </label>
          </div>
          -->
          <button type="submit" class="btn btn-default">Create</button>
        </form>
      </div>
    </div> 
  </div>
<?php include('inc/footer-home.inc.php');  ?>
</body>
</html>