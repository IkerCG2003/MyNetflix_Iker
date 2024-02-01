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
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- CSS -->
    <link rel="stylesheet" href="../css/admin.css">
    <title>Página del administrador</title>
</head>

<body>
    <?php
        if (isset($_GET["message"]) && $_GET["message"] === "useraceptar") {
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
        if (isset($_GET["message"]) && $_GET["message"] === "userdenegar") {
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

    <section id="peticiones_usuarios">
        <div>
            <h2>Peticiones de registro de los usuarios</h2>
        </div>

        <div>
            <form action="" method="post" id="frmbusqueda">
                <div class="form-group">
                    <label for="buscar_peticiones">Buscar:</label>
                    <input type="text" name="buscar_peticiones" id="buscar_peticiones" placeholder="Buscar..." class="form-control">
                </div>
            </form>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID de la petición</th>
                        <th>Nombre del usuario</th>
                        <th>Email del usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody id="resultado_registro_usuarios"></tbody>
            </table>
        </div>

        <div>
            <ul id="pagination_peticiones" class="pagination"></ul>
        </div>    
    </section>

    <section id="usuarios_registrados">
        <div>
            <h2>Usuarios registrados</h2>
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
                        <th>ID del usuario</th>
                        <th>Nombre del usuario</th>
                        <th>Email del usuario</th>
                    </tr>
                </thead>

                <tbody id="resultado_usuarios_registrados"></tbody>
            </table>
        </div>

        <div>
            <ul id="pagination_usuarios" class="pagination"></ul>
        </div>
    </section>

    <script src="../js/peticiones.js"></script>
    <script src="../js/usuarios.js"></script>
</body>
</html>
