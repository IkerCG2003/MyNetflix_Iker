<?php
require_once "../../herramientas/conexion.php";
$item = json_decode($_POST['item'], true);

$eliminarRegistro = $pdo->prepare("DELETE FROM tbl_registros WHERE id = ?");
$eliminarRegistro->bindParam(1, $item['id'], PDO::PARAM_INT);
$eliminarRegistro->execute();
echo "ok";
?>
