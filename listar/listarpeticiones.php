<?php
include_once("../herramientas/conexion.php");

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM tbl_registros WHERE id_user LIKE '%".$data."%' OR nombre_user LIKE '%".$data."%' OR email_user LIKE '%".$data."%'");
} else {
    $consulta = $pdo->prepare("SELECT * FROM tbl_registros");
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
?>
