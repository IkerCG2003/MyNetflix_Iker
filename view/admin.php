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
    <!-- CSS -->
    <link rel="stylesheet" href="../css/admin.css">
    <title>Página del administrador</title>
</head>

<body>
    <div class="container" id="seccion_usuarios">
        <h2>Sección de usuarios</h2>
        <div class="row">
            <div class="coulmn-2">
                <section id="peticiones_usuarios">
                    <div>
                        <h2>Peticiones de registro</h2>
                    </div>

                    <div>
                        <form action="" method="post" id="frmbusqueda">
                            <div class="form-group">
                                <label for="buscar_peticiones">Buscar:</label>
                                <input type="text" name="buscar_peticiones" id="buscar_peticiones" placeholder="Buscar..." class="form-control">
                            </div>
                        </form>
                    </div>

                    <div class="table-container">                        
                        <table class="table-section">                            
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th class="email">Email</th>
                                    <th class="acciones">Acciones</th>
                                </tr>
                            </thead>

                            <tbody id="resultado_registro_usuarios"></tbody>
                        </table>
                    </div>
                </section>
            </div>
        
            <div class="column-2">
                <section id="usuarios_registrados" class="section">
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

                    <div class="table-container">
                        <table class="table-section">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody id="resultado_usuarios_registrados"></tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <div class="container" id="seccion_top">
        <h2>Sección del TOP 5 de películas</h2>
        <div class="grid">
            <div id="resultado_top5"></div>
        </div>
    </div>

    <div class="container" id="seccion_pelis">
        <h2>Sección del catálogo de películas</h2>
        <div class="row">
            <div class="col-md-6">
                <form action="" method="post" id="frmbusqueda">
                    <div class="form-group">
                        <label for="buscar_peli">Buscar:</label>
                        <input type="text" name="buscar_peli" id="buscar_peli"  placeholder="Buscar..." class="form-control">
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <button type="button" class='btn btn-success'>Añadir película</button>
            </div>
        </div>

        <div class="grid">
            <div id="resultado_pelis"></div>
        </div>
    </div>

    <script src="../js/pelis.js"></script>
    <script src="../js/top5.js"></script>
    <script src="../js/peticiones.js"></script>
    <script src="../js/usuarios.js"></script>
</body>
</html>
