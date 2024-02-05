<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = json_decode($_POST['id'], true);

    include_once("../../herramientas/conexion.php");

    try {
        // Realiza la actualización del estado en la base de datos
        $sql = "UPDATE tbl_usuarios SET estado = CASE WHEN estado = 'activo' THEN 'inactivo' ELSE 'activo' END WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la ejecución de la consulta: " . $e->getMessage()]);
    }
}
?>
