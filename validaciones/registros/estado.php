<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = json_decode($_POST['id'], true);

    include_once("../../herramientas/conexion.php");

    try {
        // Obtener el email del usuario
        $sql_email = "SELECT email FROM tbl_usuarios WHERE id = :id";
        $stmt_email = $pdo->prepare($sql_email);
        $stmt_email->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt_email->execute();
        $email = $stmt_email->fetch(PDO::FETCH_ASSOC)['email'];

        // Verificar si el email es admin@gmail.com
        if ($email === 'admin@gmail.com') {
            echo json_encode(["success" => false, "message" => "No puedes desactivar al administrador"]);
            exit; // Detiene la ejecución del script
        }

        // Realiza la actualización del estado en la base de datos
        $sql = "UPDATE tbl_usuarios SET estado = CASE WHEN estado = 'activo' THEN 'inactivo' ELSE 'activo' END WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(["success" => true, "email" => $email]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la ejecución de la consulta: " . $e->getMessage()]);
    }
}
?>
