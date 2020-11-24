<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>諮商系統</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/layout.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js" integrity="sha384-BOsAfwzjNJHrJ8cZidOg56tcQWfp6y72vEJ8xQ9w6Quywb24iOsW913URv1IS4GD" crossorigin="anonymous"></script>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/Home"><img src="/images/logo.jpg" width="30" height="30" class="d-inline-block align-top" alt="回首頁快捷圖案" loading="lazy">輔導系統</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="container">
            <div class="row">
              <div class="col">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="CasemanageDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      個案管理
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="CasemanageDropdown">
                      <li><a class="dropdown-item" href="#">A</a></li>
                      <li><a class="dropdown-item" href="#">B</a></li>
                      <li><a class="dropdown-item" href="#">C</a></li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="SysManageDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                      系統管理
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="SysManageDropdown">
                      <li><a class="dropdown-item" href="/SysManage">人員列表</a></li>
                      <li><a class="dropdown-item" href="/SysManage/addview">新增人員</a></li>
                      <li><a class="dropdown-item" href="#">權限調整</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="col d-none d-lg-block text-right">
                <div class="btn-group">
                  <button type="button" class="btn btn-primary position-relative" id="MessageDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                    通知 <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-secondary">4<span class="visually-hidden">unread messages</span></span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="MessageDropdown">
                    <li><a class="dropdown-item" href="#">12333333333333333333333333333333333333333333333333</a></li>
                    <li><a class="dropdown-item" href="#">1233333333333333sdfsdfsdfsdfsdfsdfsdf3333333333333333333333333333333333</a></li>
                    <li><a class="dropdown-item" href="#">QQQQQQQQQ</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <form class="form-inline my-2 my-lg-0" action="/Home/logout" method="get">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">登出</button>
          </form>
        </div>
      </div>
    </nav>
    
    
    
