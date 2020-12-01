<?php 
namespace App\Controllers;
use CodeIgniter\HTTP\IncomingRequest;

class SysManage extends BaseController {
	public function index()	{
        $this->isAuth('ua_auth_sys');
        $data = array();
        echo view('templates/header', $data);
        echo view('managetemplat/list', $data);
        echo view('templates/footer', $data);    
    }

    /**
     * 帳號新增或權限修改
     */
    public function addProcess() {
        $request = \Config\Services::request();

        $data = array(
            'ua_id' => $request->getPost('ua_id'),
            'ua_account' => $request->getPost('ua_account'),
            'ua_name' => $request->getPost('ua_name'),
            'ua_auth_sys' => $request->getPost('ua_auth_sys') == '' ? 0 : 1,
            'ua_case_manage' => $request->getPost('ua_case_manage') == '' ? 0 : 1,
            'ua_counseling_counselor' => $request->getPost('ua_counseling_counselor') == '' ? 0 : 1,
        );
        print_r($data);         
    }

    public function addView() {
        $this->isAuth('ua_auth_sys');
        $data = array();
        echo view('templates/header', $data);
        echo view('managetemplat/add', $data);
        echo view('templates/footer', $data);    
    }
  
}
