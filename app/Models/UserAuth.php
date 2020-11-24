<?php 
namespace App\Models;
use CodeIgniter\Model;

class UserAuth extends Model
{
  protected $table = 'UserAuth';
  protected $db ;



  function __construct() {
    $this->db = db_connect();
    $this->db->connect();
  }

  public function  getUserAuth($ua_id = '') {
    $sql = "SELECT * FROM [Counseling].[dbo].[tb_user_auth] WHERE ua_account = ?";
    $this->db->query($sql,array($ua_id));
    $data = $this->db->fetchAll();
    return $data;
  }


  public function update($ua_id = 0) {
    
  }


  public function getUserAuthList() {
    
  }

}