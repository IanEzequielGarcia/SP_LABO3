<?php
class AccesoDatos
{
    private $objetoPDO;
    private static $ObjetoAccesoDatos;
 
    private function __construct()
    {
        try 
        { 
            $this -> objetoPDO = new PDO('mysql:host=localhost;dbname=concesionaria_bd;charset=utf8', 'root', '', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this -> objetoPDO -> exec("SET CHARACTER SET utf8");
        } 
        catch (PDOException $e) 
        { 
            print "Error!: " . $e -> getMessage(); 
            die();
        }
    }
 asdasds
    public function RetornarConsulta($sql)
    { 
        return $this -> objetoPDO -> prepare($sql); 
    }

    public function RetornarUltimoIdInsertado()
    { 
        return $this -> objetoPDO -> lastInsertId(); 
    }
 
    public static function dameUnObjetoAcceso()
    { 
        if (!isset(self::$ObjetoAccesoDatos)) 
        {          
            self::$ObjetoAccesoDatos = new AccesoDatos(); 
        } 
        return self::$ObjetoAccesoDatos;        
    }

    public function __clone()
    { 
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR); 
    }
}
?>