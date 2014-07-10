<?php require_once('../config.inc.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <?php include('inc/local.php'); ?>
  <script type="text/javascript" src="js/EntryNodeCommentViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeTextViewModel.js"></script>
  <script type="text/javascript" src="js/EntryNodeViewModel.js"></script>
  <script type="text/javascript" src="js/ideafeed.js"></script>
</head>
<body>
  <div class="container-fluid outermost">
    <?php include('inc/nav.inc.php'); ?>
    <div class="row">
      <div class="col-sm-3">
        <div class="row">
          <div class="cols-sm-12 ml">
            <form id="postform">
              <div class="input-append">
                <textarea class="span12" placeholder="Type an idea, suggestion, or goal for <?= strpos($_SERVER['PHP_SELF'],"ideabox_ideamaps.php") ? '' : $r['mapname'] ?>" id="newpost" ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="sidebar-nav-fixed navbar-inner">
              <ul class="nav nav-list">
                <li class="nav-header">Labels</li>
                <ul id="idea-hashtags" class="tags">
                </ul>
                <li class="nav-header">People</li>
                <ul id="people-list" class="tags">
                </ul>
            </ul>
          </div><!--/.well -->
        </div>
      </div>
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-12 ml">
            <div id="tableHeaderDiv">
              <div id="numResults"></div>
              <div id="filterBy">
                <a id='sortByHot' class="active"><i class="ion-fireball"></i><span>Hot</span></a>
                <a id='sortByDate'><i class="ion-ios7-lightbulb-outline"></i><span>New</span></a>
                <a id="sortByUpvotes"><i class="ion-ios7-star-outline"></i><span>Top</span></a>
                <a id='sortByStatus'><i class="ion-ios7-checkmark-outline"></i><span>Progress</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="row cp">
          <div class="col-sm-12">
            <div id="currentposts">
              <center><i class="ion-loading-c"></i></center>
            </div>
          </div>
        </div>
      </div>
    </div><!--/row-->
  </div><!--/.fluid-container-->
<?php include('inc/footer.inc.php'); ?>
</body>
</html>