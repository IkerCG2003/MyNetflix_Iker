<?php
include_once("../herramientas/conexion.php");

if (isset($_POST['busqueda']) && !empty($_POST['busqueda'])) 
{
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas WHERE titulo LIKE :titulo ORDER BY cantidadmegustas DESC");
    $consulta->bindValue(':titulo', '%' . $data . '%', PDO::PARAM_STR);
} 

else 
{
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas");
    if (isset($_POST['genero']) && !empty($_POST['genero'])) 
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
