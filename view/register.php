<?php
    session_start();
    session_unset();
    session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Script -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Google Fonts Roboto -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <!-- Estilos -->
    <link rel="stylesheet" href="../css/login-register.css">
    <!-- Título -->
    <title>Registrar</title>
</head>
<body>
    <?php
        if (isset($_GET["error"]) && $_GET["error"] === "emailexiste") {
            ?>
                <script>
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Este correo ya está registrado.",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                </script>
            <?php
        }
    ?>  

    <div id="cont-general" class="cont-general">
        <br>

        <div id="cont-texto" class="cont-texto">
            <h2 class="h2-login">Registrarse</h2>
        </div>

        <div id="cont-form" class="cont-form">
            <form action="../validaciones/register/validar-register.php" method="POST" onsubmit="return validateForm()">
                <div class="input-group">
                    <label class="label-input" for="username">Username:</label>
                    <input type="text" name="username" id="username" class="input-text">
                    <span id="error_username" class="error-message"></span>
                </div>

                <br>

                <div class="input-group">
                    <label class="label-input" for="email">Email:</label>
                    <input type="text" name="email" id="email" class="input-text">
                    <span id="error_email" class="error-message"></span>
                </div>

                <br>

                <div class="input-group">
                    <label class="label-input" for="pwd">Contraseña:</label>
                    <input type="password" name="pwd" id="pwd" class="input-text">
                    <span id="error_pwd" class="error-message"></span>
                </div>

                <br><br>

                <div class="input-group">
                    <input type="submit" name="btn_enviar" id="btn_enviar" class="btn-enviar" disabled>                
                </div>
            </form>
        </div>

        <div class="link">
            <a href="./login.php">¿Ya tienes cuenta? Inicia sesión aquí.</a>
        </div>
    </div>

    <script src="login-register.js"></script>
    <script>
        function validateForm() {
            var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var pwd = document.getElementById("pwd").value;
            
            // Validación del username: solo letras, sin espacios al comienzo y al final
            if (!/^[a-zA-Z]+$/.test(username)) {
                document.getElementById("error_username").innerHTML = "El username solo puede contener letras.";
                return false;
            } else {
                document.getElementById("error_username").innerHTML = "";
            }

            // Validación del email: dominio @gmail.com
            if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(email)) {
                document.getElementById("error_email").innerHTML = "El email debe ser del dominio @gmail.com.";
                return false;
            } else {
                document.getElementById("error_email").innerHTML = "";
            }

            // Validación de la contraseña: al menos 9 caracteres
            if (pwd.length < 9) {
                document.getElementById("error_pwd").innerHTML = "La contraseña debe tener al menos 9 caracteres.";
                return false;
            } else {
                document.getElementById("error_pwd").innerHTML = "";
            }

            return true;
        }

        function validarCampos() {
            var username = document.getElementById("username").value;
            var email = document.getElementById("email").value;
            var pwd = document.getElementById("pwd").value;
        
            // Verificar si todos los campos están llenos
            if (username !== "" && email !== "" && pwd !== "" ) 
            {
                document.getElementById("btn_enviar").disabled = false; // Habilitar el botón de envío
            } 
            
            else 
            {
                document.getElementById("btn_enviar").disabled = true; // Deshabilitar el botón de envío
            }
        }

        // Agregar eventos 'input' a los campos para llamar a la función de validación
        document.getElementById("username").addEventListener("input",validarCampos);
        document.getElementById("email").addEventListener("input", validarCampos);
        document.getElementById("pwd").addEventListener("input", validarCampos);

        // Llamar a la función de validación inicialmente
        validarCampos();

    </script>
</body>
</html>
