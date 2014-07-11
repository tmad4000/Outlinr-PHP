<?php require_once('../config.inc.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <?php include('inc/includes.php'); ?>
</head>
<body>
  <div class="container-fluid outermost">
    <?php include('inc/nav.inc.php'); ?>
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
       <h2>Log In</h2>
        <form role="form" id="sign-in-form">
          <div class="form-group">
            <input type="email" class="form-control input-lg" id="login-box-name" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control input-lg" id="create-box-password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-default">Sign In</button>
        </form>
      </div>
    </div> 
  </div>
<?php include('inc/footer.inc.php');  ?>
</body>
</html>