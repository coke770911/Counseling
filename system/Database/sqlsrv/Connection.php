<?php
//命名空間
namespace CodeIgniter\Database\sqlsrv;
use CodeIgniter\Database\BaseConnection;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Database\Exceptions\DatabaseException;
use PDO;

class Connection extends BaseConnection implements ConnectionInterface {

    public $DBDriver = 'sqlsrv';
    public $sqlsrv;

    public $conn;
    public $stmt;
    public $params = array();
    public $error_msg = array();

    /**
     * init connect
     */
    public function connect(bool $persistent = false) {
        $serverName = $this->hostname;  
        $connectionInfo = array( "UID" => $this->username, "PWD" => $this->password, "Database"=>$this->database); 
        $this->conn = sqlsrv_connect( $serverName, $connectionInfo);  

        if( !$this->conn ) {  
            $this->error_msg['connect'] = sqlsrv_errors();  
        }  
        
    }
    
    /**
     * SQL String Query
     * return 1 or 0 
     */
    public function query( string $tsql = '',array $params = array()):int {
        if(count($params) !== 0) {
            $this->$params = $params;
        }

        $this->stmt = sqlsrv_query( $this->conn, $tsql, $this->$params);
        if ($this->$stmt) {  
            return 1;  
        } else {  
            $this->error_msg['query'] = sqlsrv_errors();  
            return 0;  
            
        }  
    }

    public function execute( string $tsql = '',array $params = array()) {
        $this->stmt = sqlsrv_prepare( $this->conn, $tsql, $this->params);  
        return sqlsrv_execute( $this->stmt);
    }

    /**
     * update or delete is affectedRows
     */
    public function affectedRows(): int {
        $rows_affected = sqlsrv_rows_affected( $stmt);  
        if( $rows_affected === false)  {  
            $this->error_msg['affectedRows_error'] = sqlsrv_errors();  
            return 0;
        }  elseif( $rows_affected == -1)  {  
            $this->error_msg['affectedRows_msg'] = 'No information available';
            return 0;
        }  else {  
            return $rows_affected;  
        }  
    }

    /**
     * fetchAll is array or key => value
     * $fetchType ref sqlsrv_fetch_array PHP
     */
    public function fetchAll($fetchType = SQLSRV_FETCH_ASSOC) {
        $data = array();
        while( $row = sqlsrv_fetch_array( $this->stmt, $fetchType)) {  
            $data[] = $row;
        }  
        $data = $this->setDateTimeToString( $data);
        return $data;
    }

    /**
     * process SQL Server datatime format object to array
     */
    protected function setDateTimeToString($dt = array(), $format = 'Y/m/d H:i:s') {
        if(!is_array($dt)){
            $dt = array();
        }
        foreach ($dt as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $k => $v) {
                    if (is_object($v)) {
                        $value[$k] = date_format($v, $format) == '1900/01/01 00:00:00' ? '' : date_format($v, $format);
                    }
                }
            }
            $dt[$key] = is_object($value) ? (date_format($value, $format) == '1900/01/01 00:00:00' ? '' : date_format($value, $format)) : $value;
        }
        return $dt;
    }

    protected function prepQuery(string $sql): string {}



    public function insertID(): int {

    }

    /**
     * error message to array
     */
    public function error(): array {
        return $this->error_msg;
    }

    
    
    /**
     * get SQL server INFO
     */
    public function getVersion(): string {
        return sqlsrv_server_info( $this->conn);  
    }

        /**
     * Connect reconnect
     */
    public function reconnect() { 
        $this->connect();
    }
    
    /**
     * DB Connect Close
     */
    protected function _close() {
        sqlsrv_close($this->conn);  
    }

    public function setDatabase(string $databaseName): bool {}

    protected function _escapeString(string $str): string {}

    public function escapeLikeStringDirect($str) {}

    protected function _listTables(bool $prefixLimit = false): string {}

    protected function _listColumns(string $table = ''): string {}

    public function _fieldData(string $table): array {}

    public function _indexData(string $table): array {}

    public function _foreignKeyData(string $table): array{}

    protected function _disableForeignKeyChecks() {}

    protected function _enableForeignKeyChecks() {}

    protected function _transBegin(): bool {}

    protected function _transCommit(): bool {}

    protected function _transRollback(): bool {}

}
