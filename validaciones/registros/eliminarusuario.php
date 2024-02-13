<?php
// Verificar si se recibieron datos del formulario de eliminación
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    // Incluir el archivo de conexión a la base de datos
    include_once('../../herramientas/conexion.php');

    // Obtener el ID del usuario a eliminar desde el formulario
    $idUsuario = $_POST["id"];

    // Eliminar usuario
    $consulta = $pdo->prepare("DELETE FROM tbl_usuarios WHERE id = ?");
    $consulta->bindParam(1, $idUsuario);

    // Ejecutar la consulta preparada
    if ($consulta->execute()) {
        // El usuario se eliminó correctamente
        $respuesta["success"] = true;
        $respuesta["message"] = "Usuario eliminado correctamente";
    } else {
        // Hubo un error al eliminar el usuario
        $respuesta["success"] = false;
        $respuesta["message"] = "Error al eliminar el usuario: " . $consulta->errorInfo()[2];
    }

    // Cerrar la conexión a la base de datos
    $pdo = null;

    // Enviar respuesta como JSON
    echo json_encode($respuesta);
} else {
    // Si no se recibieron datos del formulario de eliminación, enviar una respuesta de error
    $respuesta["success"] = false;
    $respuesta["message"] = "No se recibieron datos del formulario de eliminación";
    echo json_encode($respuesta);
}
?>
