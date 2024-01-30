<?php
    // Inicia la sesión.
    session_start();
    
    // Obtiene los valores del formulario.
    $user = $_POST['username'];
    $email = $_POST['email'];
    $pwd = $_POST['pwd'];

    $_SESSION['username'] = $user;
    $_SESSION['email'] = $email;
    $_SESSION['pwd'] = $pwd;

    header('Location: ./check-register.php');
    exit();
?>
