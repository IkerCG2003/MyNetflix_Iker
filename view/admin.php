<?php
session_start();
include_once('../herramientas/conexion.php');
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Página del administrador</title>
</head>

<body>
    <?php
        if (isset($_GET["message"]) && $_GET["message"] === "useraceptado") {
            ?>
                <script>
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Has aceptado al usuario.",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                </script>
            <?php
        }
    ?>  

    <?php
        if (isset($_GET["message"]) && $_GET["message"] === "userdenegado") {
            ?>
                <script>
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Has denegado al usuario.",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                </script>
            <?php
        }
    ?>  

    <section id="usuarios_registrados">
        <div>
            <h2>Peticiones de registro de los usuarios</h2>
        </div>

        <div>
            <form action="" method="post" id="frmbusqueda">
                <div class="form-group">
                    <label for="buscar_user">Buscar:</label>
                    <input type="text" name="buscar_user" id="buscar_user" placeholder="Buscar..." class="form-control">
                </div>
            </form>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del usuario</th>
                        <th>Email del usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="resultado_registro_usuarios"></tbody>
            </table>
        </div>
    </section>

    <script src="../js/peticiones.js"></script>
</body>
</html>
