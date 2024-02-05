<?php
include_once("../herramientas/conexion.php");

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas WHERE id LIKE '%".$data."%' OR nombre LIKE '%".$data."%' OR genero LIKE '%".$data."%'  ORDER BY cantidadmegustas DESC");
} else {
    $consulta = $pdo->prepare("SELECT * FROM tbl_peliculas ORDER BY cantidadmegustas DESC");
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
?>
