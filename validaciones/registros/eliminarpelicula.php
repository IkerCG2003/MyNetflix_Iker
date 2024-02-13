<?php
include_once("../../herramientas/conexion.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del usuario desde el formulario
    $item = json_decode($_POST['item'], true);

    try {
        // Eliminar el registro específico de tbl_registros
        $eliminarRegistro = $pdo->prepare("DELETE FROM tbl_peliculas WHERE id = ?");
        $eliminarRegistro->bindParam(1, $item['id'], PDO::PARAM_INT);
        $eliminarRegistro->execute();

        // Respuesta exitosa
        $response = array(
            'success' => true,
            'message' => 'Pelicula eliminada correctamente.'
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
