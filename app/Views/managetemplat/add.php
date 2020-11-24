<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">系統管理</a></li>
    <li class="breadcrumb-item active" aria-current="page">新增人員</li>
  </ol>
</nav>
<form name="formdata" action="/SysManage/addProcess" method="post"> 
  <input type="hidden" name="ua_id" value="0">
  <div class="container-md">
  <h3>帳號設定</h3>
    <div class="row justify-content-start">
      <div class="mb-3 col-12 col-lg-3">
        <label for="exampleFormControlInput1" class="form-label">請輸入Portal帳號</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" name="ua_account" placeholder="請輸入Portal帳號" maxlength="20">
      </div>
      <div class="mb-3 col-12 col-lg-3">
        <label for="exampleFormControlInput1" class="form-label">請輸入姓名</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" name="ua_name" placeholder="請輸入姓名" maxlength="20">
      </div>
    </div>
    <hr>
    <h3>權限設定</h3>
    <div class="row justify-content-start">
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="1" id="ua_auth_sys" name="ua_auth_sys" >
          <label class="form-check-label" for="ua_auth_sys">
            系統管理者
          </label>
        </div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="1" id="ua_case_manage" name="ua_case_manage" >
          <label class="form-check-label" for="ua_case_manage">
            個案管理員
          </label>
        </div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="1" id="ua_counseling_counselor" name="ua_counseling_counselor" >
          <label class="form-check-label" for="ua_counseling_counselor">
            心理諮商師
          </label>
        </div>
      </div>
    </div>
    <div class="row row justify-content-start">
      <div class="col-12 mt-3 col-lg-3">
        <button type="submit" class="btn btn-primary btn-block">確認新增</button>
      </div>
    </div>
  </div>
</form>
