<?php
include_once("../herramientas/conexion.php");

if (!empty($_POST['busqueda'])) 
{
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas WHERE id LIKE '%".$data."%' OR nombre LIKE '%".$data."%' ORDER BY cantidadmegustas DESC");
} 

else 
{
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas");
    if (!empty($_POST['genero'])) 
    {
        $genero = $_POST['genero'];
        $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas WHERE genero = :genero ORDER BY cantidadmegustas DESC");
        $consulta->bindValue(':genero', $genero, PDO::PARAM_STR);
    }
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
?>
