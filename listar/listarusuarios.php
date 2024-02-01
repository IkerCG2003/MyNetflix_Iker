<?php
include_once("../herramientas/conexion.php");

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM tbl_usuarios WHERE id LIKE '%".$data."%' OR username LIKE '%".$data."%' OR email LIKE '%".$data."%'");
} else {
    $consulta = $pdo->prepare("SELECT * FROM tbl_usuarios");
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
?>
