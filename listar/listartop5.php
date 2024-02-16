<?php
include_once('../herramientas/conexion.php');

$consulta = $pdo->prepare("SELECT * FROM `tbl_peliculas` ORDER BY cantidadmegustas DESC LIMIT 5;");
$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

$top5 = array();
$i = 1;
foreach ($resultado as $pelicula) {
    $top5[] = array(
        'posicion' => $i,
        'titulo' => $pelicula['titulo'],
        'portada' => $pelicula['portada']
    );
    $i++;
}

echo json_encode($top5);
?>
