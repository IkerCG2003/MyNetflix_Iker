<?php
// Verificar si se recibieron datos del formulario de edición
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id_pelicula_editar"])) {
    // Conectar a la base de datos (debes incluir tu propio archivo de conexión)
    include_once('../../herramientas/conexion.php');

    // Obtener los datos del formulario de edición
    $id_pelicula = $_POST["id_pelicula_editar"];
    $titulo = $_POST["titulo_peli_editar"];
    $genero = $_POST["genero_peli_editar"];

    // Actualizar la película en la base de datos
    $consulta = $pdo->prepare("UPDATE tbl_peliculas SET nombre = ?, genero = ? WHERE id = ?");
    $consulta->bindParam(1, $titulo);
    $consulta->bindParam(2, $genero);
    $consulta->bindParam(3, $id_pelicula);

    if ($consulta->execute()) {
        // La película se actualizó correctamente
        $response["success"] = true;
        $response["message"] = "Película actualizada correctamente";
    } else {
        // Ocurrió un error al actualizar la película
        $response["success"] = false;
        $response["message"] = "Error al actualizar la película: " . $consulta->errorInfo()[2];
    }

    // Cerrar la conexión a la base de datos
    $pdo = null;
} else {
    // No se recibieron datos del formulario de edición
    $response["success"] = false;
    $response["message"] = "No se recibieron datos para editar la película";
}

// Enviar la respuesta JSON al cliente
header("Content-type: application/json");
echo json_encode($response);
?>
