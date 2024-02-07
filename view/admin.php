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
        <!-- Agrega estas líneas en la sección <head> de tu HTML -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <!-- CSS -->
        <link rel="stylesheet" href="../css/admin.css">
        <title>Página del administrador</title>
    </head>

    <body>
        <?php
            if (isset($_GET["error"]) && $_GET["error"] === "peliexiste") {
                ?>
                    <script>
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "La pelicula ya existe",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        });
                    </script>
                <?php
            }
        ?> 

        <?php
            if (isset($_GET["error"]) && $_GET["error"] === "extensionmal") {
                ?>
                    <script>
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "La extensión ha de ser .JPG",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        });
                    </script>
                <?php
            }
        ?>  

        <?php
            if (isset($_GET["message"]) && $_GET["message"] === "peliinsertada") {
                ?>
                    <script>
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Se ha insertado la película correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        });
                    </script>
                <?php
            }
        ?>
        
        <?php
            if (isset($_GET["message"]) && $_GET["message"] === "peliculaeliminada") {
                ?>
                    <script>
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Se ha eliminado la película correctamente",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true
                        });
                    </script>
                <?php
            }
        ?>  

        <div class="container" id="seccion_usuarios">
            <h2>Sección de usuarios</h2>
            <div>
                <div>
                    <section id="peticiones_usuarios">
                        <div>
                            <h3>Peticiones de registro</h3>
                        </div>

                        <div>
                            <form action="" method="post" id="frmbusqueda">
                                <div class="form-group">
                                    <label for="buscar_peticiones">Buscar:</label>
                                    <input type="text" name="buscar_peticiones" id="buscar_peticiones" placeholder="Buscar peticiones..." class="form-control">
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
            
                <div>
                    <section id="usuarios_registrados" class="section">
                        <div>
                            <h3>Usuarios registrados</h3>
                        </div>

                        <div>
                            <form action="" method="post" id="frmbusqueda">
                                <div class="form-group">
                                    <label for="buscar_user">Buscar</label>
                                    <input type="text" name="buscar_user" id="buscar_user" placeholder="Buscar usuarios..." class="form-control">
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
            <div class="row align-items-center">
                <div class="col-md-6">
                    <form action="" method="post" id="frmbusqueda" class="form-inline">
                        <div class="form-group">
                            <label for="buscar_peli" class="mr-2">Buscar:</label>
                            <input type="text" name="buscar_peli" id="buscar_peli" placeholder="Buscar por título o género..." class="form-control mr-2">
                        </div>
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAnadirPelicula">Añadir película</button>
                    </form>
                </div>
            </div>

            <div class="grid">
                <div id="resultado_pelis"></div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalAnadirPelicula" tabindex="-1" role="dialog" aria-labelledby="modalAnadirPeliculaLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAnadirPeliculaLabel">Añadir película</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn-insertar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form action="../validaciones/insertar/insertar.php" method="post" id="frmAnadirPelicula" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="titulo_peli">Título:</label>
                            <input type="text" name="titulo_peli" id="titulo_peli" placeholder="Título de la película" class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="genero_peli">Género:</label>
                            <br>
                            <select name="genero_peli" id="genero_peli" class="form-control">
                                <option value="" disabled selected>-- Selecciona una opción --</option>
                                <option value="Animacion">Animación</option>
                                <option value="Acción">Acción</option>
                                <option value="Drama">Drama</option>
                                <option value="Fantasía">Fantasía</option>
                                <option value="Crimen">Crimen</option>
                                <option value="Ciencia Ficción">Ciencia Ficción</option>
                                <option value="Aventura">Aventura</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Romance">Romance</option>
                                <option value="Musical">Musical</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="imagen_peli">Imagen:</label>
                            <input type="file" name="imagen_peli" id="imagen_peli" placeholder="Selecciona una imagen..." class="form-control">
                        </div>

                        <button type="submit" class="btn btn-primary">Guardar película</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="../js/pelis.js"></script>
    <script src="../js/top5.js"></script>
    <script src="../js/peticiones.js"></script>
    <script src="../js/usuarios.js"></script>
</body>
</html>
