<?php
// Verificar si se recibieron datos del formulario de edición
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id_pelicula_editar"])) {
    // Conectar a la base de datos (debes incluir tu propio archivo de conexión)
    include_once('../../herramientas/conexion.php');

    // Obtener los datos del formulario de edición
    $id_pelicula = $_POST["id_pelicula_editar"];
    $titulo = $_POST["titulo_peli_editar"]; // Corregir el nombre del campo
    $genero = $_POST["genero_peli_editar"]; // Corregir el nombre del campo

    // Actualizar el usuario en la base de datos
    $consulta = $pdo->prepare("UPDATE tbl_peliculas SET titulo = ?, genero = ? WHERE id = ?");
    $consulta->bindParam(1, $titulo);
    $consulta->bindParam(2, $genero);
    $consulta->bindParam(3, $id_pelicula);

    if ($consulta->execute()) {
        // El usuario se actualizó correctamente
        $response["success"] = true;
        $response["message"] = "¡Pelicula editada correctamente!";
    } else {
        // Ocurrió un error al actualizar el usuario
        $response["success"] = false;
        $response["message"] = "Error al actualizar el usuario: " . $consulta->errorInfo()[2];
    }

    // Cerrar la conexión a la base de datos
    $pdo = null;
} else {
    // No se recibieron datos del formulario de edición
    $response["success"] = false;
    $response["message"] = "No se recibieron datos para editar el usuario";
}

// Enviar la respuesta JSON al cliente
header("Content-type: application/json");
echo json_encode($response);
?>
