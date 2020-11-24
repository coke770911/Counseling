<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>系統登入</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
      }
    </style>
    <link href="/css/signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    <form class="form-signin" name="loginform" action="/Home/login" method="post" >
      <h1 class="h3 mb-3 font-weight-normal">系統登入</h1>
      <label for="inputAccount" class="visually-hidden">請輸入Portal帳號</label>
      <input name="account" type="text" id="inputAccount" class="form-control" placeholder="請輸入Portal帳號" required autofocus>
      <label for="inputPassword" class="visually-hidden">請輸入Portal密碼</label>
      <input name="password" type="password" id="inputPassword" class="form-control" placeholder="請輸入Portal密碼" required>
      <p class="text-danger"><?=$message;?></p>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">&copy;諮商系統 2020</p>
    </form>
  </body>
</html>
