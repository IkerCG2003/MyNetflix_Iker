<?php
include_once("../../herramientas/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener los datos del usuario desde el formulario
        $item = json_decode($_POST['item'], true);

        // Iniciar una transacción
        $pdo->beginTransaction();

        // Obtener el último ID de tbl_usuarios
        $consultaUltimoID = $pdo->query("SELECT MAX(id) AS max_id FROM tbl_usuarios");
        $ultimoID = $consultaUltimoID->fetch(PDO::FETCH_ASSOC)['max_id'];

        // Incrementar el ID antes de insertar en tbl_usuarios
        $nuevoID = $ultimoID + 1;

        // Insertar el registro en tbl_usuarios con el nuevo ID y los datos del formulario
        $insertarUsuario = $pdo->prepare("INSERT INTO tbl_usuarios (id, username, email, pwd, estado) VALUES (?, ?, ?, ?, 'activo')");
        $insertarUsuario->bindParam(1, $nuevoID, PDO::PARAM_INT);
        $insertarUsuario->bindParam(2, $item['nombre_user'], PDO::PARAM_STR);
        $insertarUsuario->bindParam(3, $item['email_user'], PDO::PARAM_STR);
        $insertarUsuario->bindParam(4, $item['pwd_user'], PDO::PARAM_STR);
        $insertarUsuario->execute();

        // Eliminar el registro correspondiente de tbl_registros
        $eliminarRegistro = $pdo->prepare("DELETE FROM tbl_registros WHERE id = ?");
        $eliminarRegistro->bindParam(1, $item['id'], PDO::PARAM_INT);
        $eliminarRegistro->execute();

        // Confirmar la transacción
        $pdo->commit();

        // Respuesta exitosa
        $response = array(
            'success' => true,
            'message' => 'Usuario aceptado correctamente y registro eliminado.'
        );

        // Enviar la respuesta al cliente
        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (PDOException $e) {
        // Si hay un error, deshacer la transacción y devolver un mensaje de error
        $pdo->rollBack();
        $response = array(
            'success' => false,
            'message' => 'Error al procesar la solicitud. ' . $e->getMessage()
        );

        // Enviar la respuesta de error al cliente
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    // Si la solicitud no es POST, devolver un error
    http_response_code(405);
    echo json_encode(array('error' => 'Método no permitido.'));
}
?>
