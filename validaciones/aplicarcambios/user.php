<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id_usuario_editar"])) {
    include_once('../../herramientas/conexion.php');
    $id_user = $_POST["id_usuario_editar"];
    $nombre = $_POST["nombre_user_editar"];
    $email = $_POST["email_user_editar"];
    $consulta = $pdo->prepare("UPDATE tbl_usuarios SET username = ?, email = ? WHERE id = ?");
    $consulta->bindParam(1, $nombre);
    $consulta->bindParam(2, $email);
    $consulta->bindParam(3, $id_user);
    if ($consulta->execute()) {
        $response["success"] = true;
        $response["message"] = "Usuario actualizado correctamente";
    } else {
        $response["success"] = false;
        $response["message"] = "Error al actualizar el usuario: " . $consulta->errorInfo()[2];
    }
    $pdo = null;
} else {
    $response["success"] = false;
    $response["message"] = "No se recibieron datos para editar el usuario";
}
header("Content-type: application/json");
echo json_encode($response);
?>
