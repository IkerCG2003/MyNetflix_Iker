<?php
// Inicia la sesión.
session_start();

include_once('../../herramientas/conexion.php');

$user = $_SESSION['username'];
$email = $_SESSION['email'];
$pwd = $_SESSION['pwd'];

// Comprobar si el email ya existe
$consultaEmailExistente = "SELECT COUNT(*) FROM tbl_usuarios WHERE email = ?";
$stmtEmailExistente = $pdo->prepare($consultaEmailExistente);
$stmtEmailExistente->bindParam(1, $_SESSION['email'], PDO::PARAM_STR);
$stmtEmailExistente->execute();

if ($stmtEmailExistente->fetchColumn() > 0) {
    // El email ya existe, redirecciona con un mensaje de error
    header('Location: ../../view/register.php?error=emailexiste');
    exit();
}

// Si no existe, procede a insertar los datos en la base de datos
$consultaInsertarUser = "INSERT INTO tbl_usuarios (username, email, pwd) VALUES (?, ?, ?)";
$stmtInsertarUser = $pdo->prepare($consultaInsertarUser);

try {
    if ($stmtInsertarUser) {
        // Utiliza password_hash para almacenar de forma segura las contraseñas
        $passEncriptada = password_hash($pwd, PASSWORD_DEFAULT);
        
        $stmtInsertarUser->bindParam(1, $_SESSION['username'], PDO::PARAM_STR);
        $stmtInsertarUser->bindParam(2, $_SESSION['email'], PDO::PARAM_STR);
        $stmtInsertarUser->bindParam(3, $passEncriptada, PDO::PARAM_STR);
        
        $stmtInsertarUser->execute();

        // Redirecciona a una página de éxito o a donde desees una vez que el usuario se haya registrado.
        header('Location: ../../view/login.php?message=usercreado');
        exit();
    } else {
        // Si hubo un error en la preparación de la consulta SQL, puedes manejarlo de la siguiente manera.
        header('Location: ../../view/register.php?error=Error en la preparación de la consulta SQL');
        exit();
    }
} catch (PDOException $e) {
    // Si hubo un error, manejarlo de manera adecuada
    header('Location: ../../view/register.php?error=' . urlencode($e->getMessage()));
    exit();
}
?>
