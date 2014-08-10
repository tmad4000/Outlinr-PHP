<?php require_once('../config.inc.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <?php include('inc/includes.php'); ?>
  <script type="text/javascript" src="js/joins.js"></script>  
</head>
<body>
  <div class="container-fluid outermost"> 
    <?php include('inc/nav.inc.php'); ?>
    <div class="row">
      <ul class="nav nav-tabs" role="tablist">
        <li class="active"><a href="#messages" role="tab" data-toggle="tab">My Joins</a></li>
        <li><a href="#settings" role="tab" data-toggle="tab">Explore</a></li>
        <li><a href="#settings" role="tab" data-toggle="tab">Create New +</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane active" id="home">...</div>
        <div class="tab-pane" id="profile">...</div>
        <div class="tab-pane" id="messages">...</div>
        <div class="tab-pane" id="settings">...</div>
      </div>
      <!--<div class="col-sm-4">
        <h2>New Join</h2>
        <form role="form" id="create-box-form">
          <div class="form-group">
            <input type="text" class="form-control input-lg" id="create-box-name" placeholder="Title">
          </div>
          <div class="form-group">
            <input type="text" class="form-control input-lg" placeholder="Tags">
          </div>
          <div class="form-group">
            <input type="password" class="form-control input-lg" id="create-box-password" placeholder="Moderation Password">
          </div>
          <div class="form-group">
            <input type="text" class="form-control input-lg" placeholder="People">
          </div>
          <div class="checkbox">
            <label>
              <input type="checkbox"> Invite only
            </label>
          </div>
          <button type="submit" class="btn btn-default">Create</button>
        </form>
      </div>
      -->
      <!--<div class="col-sm-8">
        <h2>My Joins</h2>

      </div>
      -->
    </div> 
  </div><!--/.fluid-container-->
  <?php include('inc/footer.inc.php'); ?>
</body>
</html>

