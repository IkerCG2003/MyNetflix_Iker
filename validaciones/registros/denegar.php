<?php
include_once("../../herramientas/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el ID del usuario desde el formulario
    $id_registro = $_POST['id'];

    try {
        // Eliminar el registro específico de tbl_registros
        $eliminarRegistro = $pdo->prepare("DELETE FROM tbl_registros WHERE id = ?");
        $eliminarRegistro->bindParam(1, $id_registro, PDO::PARAM_INT);
        $eliminarRegistro->execute();

        // Respuesta exitosa
        $response = array(
            'success' => true,
            'message' => 'Usuario denegado correctamente.'
        );
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
