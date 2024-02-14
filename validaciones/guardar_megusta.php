<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit("Usuario no autenticado.");
} else {
    $id_usuario = $_SESSION['user_id'];
    echo "Usuario autenticado. ID de usuario: $id_usuario";
}

if (!isset($_POST["id"])) {
    http_response_code(400);
    exit("ID de película no proporcionado.");
}

$id_peli = $_POST["id"];

require_once "../herramientas/conexion.php";

try {
    // Verifica si el usuario ya ha marcado esta película como "Me gusta"
    $stmt_check = $pdo->prepare("SELECT id FROM tbl_megustas_user WHERE id_user = ? AND id_peli = ?");
    $stmt_check->execute([$id_usuario, $id_peli]);
    $me_gusta_id = $stmt_check->fetchColumn();

    if ($me_gusta_id) {
        // Si el registro existe, elimínalo
        $stmt_delete = $pdo->prepare("DELETE FROM tbl_megustas_user WHERE id_user = ? AND id_peli = ?");
        $stmt_delete->execute([$id_usuario, $id_peli]);

        // Restar uno a la cantidad de megustas en tbl_peliculas
        $stmt_update = $pdo->prepare("UPDATE tbl_peliculas SET cantidadmegustas = cantidadmegustas - 1 WHERE id = ?");
        $stmt_update->execute([$id_peli]);

        // Responde con éxito
        http_response_code(200);
        exit("El 'Me gusta' ha sido eliminado correctamente.");
    } else {
        // Si el registro no existe, inserta uno nuevo
        $stmt_insert = $pdo->prepare("INSERT INTO tbl_megustas_user (id_user, id_peli, estado) VALUES (?, ?, 'SI')");
        $stmt_insert->execute([$id_usuario, $id_peli]);

        // Incrementar la cantidad de megustas en tbl_peliculas
        $stmt_update = $pdo->prepare("UPDATE tbl_peliculas SET cantidadmegustas = cantidadmegustas + 1 WHERE id = ?");
        $stmt_update->execute([$id_peli]);

        // Responde con éxito
        http_response_code(200);
        exit("La película ha sido marcada como 'Me gusta' correctamente.");
    }
} catch (PDOException $e) {
    http_response_code(500);
    exit("Error en el servidor: " . $e->getMessage());
}
