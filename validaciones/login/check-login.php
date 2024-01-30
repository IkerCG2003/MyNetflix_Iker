<?php
session_start();

$email = $_SESSION['email'];   
$pwd = $_SESSION['pwd'];

$pwdEncript = password_hash($pwd, PASSWORD_BCRYPT);

try 
{
    include("../../herramientas/conexion.php");

    // Utilizamos parámetros con marcadores de posición para prevenir inyecciones SQL
    $sql = "SELECT * FROM tbl_usuarios WHERE email = :email";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) 
    {
        if (password_verify($pwd, $row['pwd'])) 
        {
            $_SESSION["user_id"] = $row["id"];
            $_SESSION['user_rol'] = $row["rol"];                

            header("Location: ../../view/exito.php");
            exit();
        }
        else
        {
            header("Location: ../../view/login.php?error=usermal");
            exit();
        }
    }
    else 
    {
        header("Location: ../../view/login.php?error=usermal");
        exit();
    }
} 
catch(PDOException $e) 
{
    echo "Error al iniciar sesión: " . $e->getMessage();
    die();
}
?>
