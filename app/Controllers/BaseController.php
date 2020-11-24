<?php
namespace App\Controllers;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 *
 * @package CodeIgniter
 */

use CodeIgniter\Controller;

class BaseController extends Controller
{

	/**
	 * An array of helpers to be loaded automatically upon
	 * class instantiation. These helpers will be available
	 * to all other controllers that extend BaseController.
	 *
	 * @var array
	 */
	protected $helpers = [];

	/**
	 * Constructor.
	 */
	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		// Do Not Edit This Line
		parent::initController($request, $response, $logger);

		//--------------------------------------------------------------------
		// Preload any models, libraries, etc, here.
		//--------------------------------------------------------------------
		// E.g.:
		$this->session = \Config\Services::session();
	}

	/**
	 * 判斷SESSION連線過期 
	 */
	public function isChkLogin() {
		if(isset($_SESSION['USER_LOGIN'])) {
			if($_SESSION['USER_LOGIN'] !== 1){
				die(view('templates/loginform',array('message'=>'尚未登入系統！')));
			}
		} else {		
			die(view('templates/loginform',array('message'=>'連線逾時，系統登出！')));
		}
	}
	/**
	 * 判斷權限
	 */
	public function isAuth($auth) {
		if(isset($_SESSION['USER_DATA'][$auth])) {
			if($_SESSION['USER_DATA'][$auth] !== 1) {
				die(view('templates/loginform',array('message'=>'沒有此權限已被系統登出！')));
			}
		} else {
			die(view('templates/loginform',array('message'=>'尚未登入系統！')));
		}

	}
}
