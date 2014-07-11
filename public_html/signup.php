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
        <h2>Sign up</h2>
        <form role="form" id="sign-up-form">
          <div class="form-group">
            <input type="email" class="form-control input-lg" id="login-box-name" placeholder="Email">
          </div>
          <div class="form-group">
            <input type="text" class="form-control input-lg" id="create-box-email" placeholder="Display Name">
          </div>
          <div class="form-group">
            <input type="password" class="form-control input-lg" id="create-box-password" placeholder="Password">
          </div>
          <span>By signing up, you agree to our terms of use</span>
          <button type="submit" class="btn btn-warning right">Sign Up</button>
        </form>
      </div>
    </div> 
  </div>
<?php include('inc/footer.inc.php');  ?>
</body>
</html>