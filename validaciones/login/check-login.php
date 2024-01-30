<?php
    session_start();

    $email = $_SESSION['email'];   
    $pwd = $_SESSION['pwd'];

    try 
    {

        include("../../herramientas/conexion.php");

        // Utilizamos parámetros con marcadores de posición para prevenir inyecciones SQL
        $sql = "SELECT * FROM tbl_usuarios WHERE email = :email AND pwd = :pwd";
        
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':pwd', $pwd);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) 
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
    
    catch(PDOException $e) 
    {
        echo "Error al iniciar sesión: ".$e->getMessage();
        die();
    }
?>
