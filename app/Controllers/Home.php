<?php 
namespace App\Controllers;
use CodeIgniter\HTTP\IncomingRequest;

class Home extends BaseController
{
	public function index()
	{
		$this->isChkLogin();
		//return view('templates/loginform',array('message'=>''));
		print_r($_SESSION);
		$this->main();
	}

	public function main() {
		$data = array();
		echo view('templates/header', $data);
        echo view('templates/footer', $data);
	}

	//登入處理
	public function login() {
		$acc = isset($_POST["account"]) ? (string)chop(strtoupper($_POST["account"])) : "";
		$pwd = isset($_POST["password"]) ? (string)$_POST["password"] : "";
		$accArr = explode("/", $acc);
		$user_id = $accArr[0];
		if($this->ldap_check((count($accArr) === 1 ? $accArr[0] : $accArr[1]),$pwd)) {
			$userModel = model('App\Models\UserAuth', true);
			$userdata = $userModel->getUserAuth($user_id);
			if(count($userdata) === 0) {
				return view('templates/loginform',array('message' => "您沒有此系統權限，無法使用！"));
			}
			$_SESSION['USER_DATA'] = $userdata[0];
			$_SESSION['USER_LOGIN'] = 1;
			$this->main();
		} else {
			return view('templates/loginform',array('message' => "帳號或者密碼錯誤！"));
		}
	}

	//登出處理
	public function logout() {
		unset($_SESSION['USER_LOGIN']);
		unset($_SESSION['USER_DATA']);
		return view('templates/loginform',array('message'=>'已成功登出！'));
	}


	public function Vis() {
		echo phpinfo();
	}

	#ldap 認證
	private function ldap_check($username,$password) {
		$dn = ldap_connect($_SERVER["LDAPServer"]);
		$username = $username.$_SERVER['LDAPDomain'];
		@ldap_bind( $dn, $username, $password );
		$code = ldap_errno($dn);
		if($code === 0) {
			return true;
		} else {
			return false;
		}
	}
	
}
