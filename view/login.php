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
        <title>Iniciar Sesión</title>
    </head>

    <body>
        <div id="cont-general" class="cont-general">
            <br>

            <div id="cont-texto" class="cont-texto">
                <h2 class="h2-login">Incio de sesión</h2>
            </div>

            <div id="cont-form" class="cont-form">
                <form action="../validaciones/login/validar_login.php" method="POST">
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
                        <input type="submit" name="btn_enviar" id="btn_enviar" class="btn-enviar">
                    </div>
                </form>
            </div>

            <div class="link">
                <a href="./register.php">¿No tienes cuenta? Creala aquí.</a>
            </div>
        </div>

        <script src="login-register.js"></script>
    </body>
</html>
