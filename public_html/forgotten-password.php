<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaJoin</title>
  <?php include('inc/includes.php'); ?>
  <link rel="stylesheet/less" type="text/css" href="styles/index.less" />
  <link rel="stylesheet/less" type="text/css" href="styles/signup.less" />
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
        <div id="login-signup">
          <form role="form" id="login-box-form">
            <h2>Reset your password</h2>
            <div class="form-group">
              <input type="email" class="form-control input-md" id="reset-email" placeholder="Email">
            </div>  
            <button type="submit" class="btn btn-primary">Send Email</button>
          </form>
        </div>
      </div>
    </div> 
  </div>
<?php include('inc/footer-home.inc.php');  ?>
</body>
</html>