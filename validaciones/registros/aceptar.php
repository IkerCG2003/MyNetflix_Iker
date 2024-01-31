<?php
include_once("../../herramientas/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el ID del usuario desde el formulario
    $id_user = $_POST['id_user'];

    try {
        // Obtener los datos del usuario de tbl_registros
        $consulta = $pdo->prepare("SELECT * FROM tbl_registros WHERE id_user = ?");
        $consulta->bindParam(1, $id_user, PDO::PARAM_INT);
        $consulta->execute();
        $usuario = $consulta->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            // Eliminar el registro de tbl_registros para el usuario específico
            $eliminarRegistro = $pdo->prepare("DELETE FROM tbl_registros WHERE id_user = ?");
            $eliminarRegistro->bindParam(1, $id_user, PDO::PARAM_INT);
            $eliminarRegistro->execute();

            // Insertar el registro en tbl_usuarios
            $insertarUsuario = $pdo->prepare("INSERT INTO tbl_usuarios (id, username, email, pwd) VALUES (?, ?, ?, ?)");
            $insertarUsuario->bindParam(1, $usuario['id_user'], PDO::PARAM_INT);
            $insertarUsuario->bindParam(2, $usuario['nombre_user'], PDO::PARAM_STR);
            $insertarUsuario->bindParam(3, $usuario['email_user'], PDO::PARAM_STR);
            $insertarUsuario->bindParam(4, $usuario['pwd_user'], PDO::PARAM_STR);
            $insertarUsuario->execute();

            // Respuesta exitosa
            $response = array(
                'success' => true,
                'message' => 'Usuario aceptado correctamente.'
            );
        } else {
            // Si no se encuentra el usuario en tbl_registros
            $response = array(
                'success' => false,
                'message' => 'Usuario no encontrado en tbl_registros.'
            );
        }
    } catch (PDOException $e) {
        // Si hay un error, devolver un mensaje de error
        $response = array(
            'success' => false,
            'message' => 'Error al procesar la solicitud. ' . $e->getMessage()
        );
    }

    // Enviar la respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Si la solicitud no es POST, devolver un error
    http_response_code(405);
    echo json_encode(array('error' => 'Método no permitido.'));
}
?>
