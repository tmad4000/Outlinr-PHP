<?php
  require_once('../config.inc.php');
?>
<!DOCTYPE html>
<html>
<head>
  <title>IdeaJoin</title>
  <?php include('inc/includes.php'); ?>
  <script type="text/javascript" src="js/signup.js"></script>
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
            <h2>Login</h2>
            <div class="form-group">
              <input type="email" class="form-control input-md" id="login-email" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control input-md" id="login-password" placeholder="Password">
            </div> 
            <div class="form-group"> 
            <label>
              <input type="checkbox" checked> Stay logged in
            </label>  
            </div>     
            <button type="submit" class="btn btn-primary">Login</button>
            <div class="right">
              <a href="">Forgot your password?</a>
            </div>
          </form>
          <hr/>
          <form role="form" id="signup-form">
            <h2>Signup</h2>
            <!-- Facebook, Google, Twitter logins TODO -->
            <div class="form-group">
              <input type="email" class="form-control input-md" id="signup-email" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="text" class="form-control input-md" id="signup-handle" placeholder="Full Name">
            </div>
            <div class="form-group">
              <input type="text" class="form-control input-md" id="signup-handle" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control input-md" id="signup-password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div> 
  </div>
<?php include('inc/footer-home.inc.php');  ?>
</body>
</html>