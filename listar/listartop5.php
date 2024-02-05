<?php
    include_once('../herramientas/conexion.php');

    $consulta = $pdo->prepare("SELECT * FROM `tbl_peliculas` ORDER BY cantidadmegustas DESC LIMIT 5;");

    $consulta->execute();
    $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($resultado);
?>