<?php
// Verificar si se recibieron datos del formulario de edición
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id_usuario_editar"])) {
    // Conectar a la base de datos (debes incluir tu propio archivo de conexión)
    include_once('../../herramientas/conexion.php');

    // Obtener los datos del formulario de edición
    $id_user = $_POST["id_usuario_editar"];
    $nombre = $_POST["nombre_user_editar"];
    $email = $_POST["email_user_editar"];

    // Actualizar la película en la base de datos
    $consulta = $pdo->prepare("UPDATE tbl_usuarios SET username = ?, email = ? WHERE id = ?");
    $consulta->bindParam(1, $nombre);
    $consulta->bindParam(2, $email);
    $consulta->bindParam(3, $id_user);

    if ($consulta->execute()) {
        // La película se actualizó correctamente
        $response["success"] = true;
        $response["message"] = "Usuario actualizado correctamente";
    } else {
        // Ocurrió un error al actualizar la película
        $response["success"] = false;
        $response["message"] = "Error al actualizar el usuario: " . $consulta->errorInfo()[2];
    }

    // Cerrar la conexión a la base de datos
    $pdo = null;
} else {
    // No se recibieron datos del formulario de edición
    $response["success"] = false;
    $response["message"] = "Usuario actualizado correctamente";
}

// Enviar la respuesta JSON al cliente
header("Content-type: application/json");
echo json_encode($response);
?>
