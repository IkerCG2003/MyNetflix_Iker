<?php
    session_start();
    include_once('../herramientas/conexion.php');
    $email  = $_SESSION['email'];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Bootstrap icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- Icono -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <!-- Fuente Header -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&family=PT+Sans+Narrow&display=swap" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="../css/admin.css">
    <title>Página del administrador</title>
</head>

<body>
    <!-- ALERTAS -->
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

    <!-- Header -->
    <section id="header">
        <h2>Ñetflix</h2>
    </section>

    <!-- Navbar -->
    <section id="navbar">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">        
            <a class="navbar-brand" href="#">Ñetflix</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#seccion_usuarios">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#seccion_top">Top 5</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#seccion_pelis">Catálogo</a>
                    </li>
                </ul>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <span class="nav-link">¡Hola, <?php echo $email; ?>!</span>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./login.php"><span class='material-symbols-outlined'>logout</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </section>

    <section class="container" id="seccion_usuarios">
        <h2>Sección de usuarios</h2>

        <!-- Menú de navegación -->
        <nav>
            <ul id="menu">            
                <li><a href="#" id="peticiones_link">Peticiones de registro</a></li>
                <li><a href="#" id="usuarios_link">Usuarios registrados</a></li>
            </ul>
        </nav>
    
        <div id="usuarios_contenedor">
            <!-- Contenido de peticiones de registro -->
            <div id="peticiones_usuarios">
                <br>
                <div>
                    <form action="" method="post" id="frmbusqueda_peticiones">
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
            </div>
        </div>

        <!-- Contenido de usuarios registrados -->
        <div id="usuarios_registrados">
            <div>
                <form action="" method="post" id="frmbusqueda_usuarios">
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
                            <th>Operaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="resultado_usuarios_registrados"></tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="container" id="seccion_top">
        <h2>Sección del TOP 5 de películas</h2>
        <!-- Carrusel -->
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" id="resultado_top5">
                <!-- Aquí se añadirán dinámicamente los elementos del carrusel -->
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </section>    

    <section class="container" id="seccion_pelis">
        <h2>Sección del catálogo de películas</h2>
        <div class="row align-items-center">
            <div class="col-md-6">
                <form action="" method="post" id="frmbusqueda" class="form-inline">
                    <div class="form-group mr-2">
                        <label for="buscar_peli_admin" class="mr-2">Buscar:</label>
                        <input type="text" name="buscar_peli_admin" id="buscar_peli_admin" placeholder="Buscar por título..." class="form-control">
                    </div>
                    
                    <div class="form-group mr-2">
                        <select name="genero_peli" id="genero_peli" class="form-control" onchange="filtrarPorGenero()">
                            <option value="">Mostrar todas</option>
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
                    
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAnadirPelicula">Añadir Película</button>
                </form>
            </div>
        </div>

        <div class="grid">
            <div id="resultado_pelis"></div>
        </div>
    </section>

    <!-- Modal para añadir película -->
    <div class="modal fade" id="modalAnadirPelicula" tabindex="-1" role="dialog" aria-labelledby="modalAnadirPeliculaLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAnadirPeliculaLabel">Añadir película</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                            <select name="genero_peli" id="genero_peli_modal" class="form-control">
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

    <!-- Modal para editar película -->
    <div class="modal fade" id="modalEditarPelicula" tabindex="-1" role="dialog" aria-labelledby="modalEditarPeliculaLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditarPeliculaLabel">Editar película</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frmEditarPelicula" enctype="multipart/form-data">
                        <input type="hidden" id="id_pelicula_editar" name="id_pelicula_editar">
                        <div class="form-group">
                            <label for="titulo_peli_editar">Título:</label>
                            <input type="text" class="form-control" id="titulo_peli_editar" name="titulo_peli_editar">
                        </div>
                        <div class="form-group">
                            <label for="genero_peli_editar">Género:</label>
                            <select class="form-control" id="genero_peli_editar" name="genero_peli_editar">
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
                        <button type="button" class="btn btn-primary" onclick="guardarCambiosPelicula()">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para editar usuario -->
    <div class="modal fade" id="modalEditarUser" tabindex="-1" role="dialog" aria-labelledby="modalEditarUser" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditarUser">Editar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="frmEditarUsuario" enctype="multipart/form-data">
                        <input type="hidden" id="id_usuario_editar" name="id_usuario_editar">
                        <div class="form-group">
                            <label for="nombre_user_editar">Nombre:</label>
                            <input type="text" class="form-control" id="nombre_user_editar" name="nombre_user_editar">
                        </div>
                        <div class="form-group">
                            <label for="email_user_editar">Email:</label>
                            <input type="text" class="form-control" id="email_user_editar" name="email_user_editar">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="guardarCambiosUser()">Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>



    <!-- Scripts JS -->
    <script src="../js/pelis.js"></script>
    <script src="../js/top5.js"></script>
    <script src="../js/peticiones.js"></script>
    <script src="../js/usuarios.js"></script>
    <!-- JS LISTAR USUARIOS Y PELOS -->
    <script>
        document.addEventListener("DOMContentLoaded", function() 
        {
            ListarUsers(1); // Inicialmente mostramos la primera página
            ListarPeli(''); // Listamos las películas
        });
    </script>
    <!-- JS HEADER -->
    <script>
        window.addEventListener('scroll', function() 
        {
            var header = document.getElementById('header');
                if (window.scrollY > 0) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
        });
    </script>
    <!-- JS NAVBAR -->
    <script>
        window.addEventListener('scroll', function() 
        {
            var navbar = document.getElementById('navbar');
            var headerHeight = document.getElementById('header').offsetHeight;
            if (window.scrollY > headerHeight) {
                navbar.classList.add('fixed-top');
            } else {
                navbar.classList.remove('fixed-top');
            }
        });

    </script>
    <!-- JS USUARIOS -->
    <script>
        // Obtener los enlaces del menú
        const peticionesLink = document.getElementById("peticiones_link");
        const usuariosLink = document.getElementById("usuarios_link");

        // Obtener los contenedores de las secciones
        const peticionesUsuarios = document.getElementById("peticiones_usuarios");
        const usuariosRegistrados = document.getElementById("usuarios_registrados");

        // Ocultar todas las secciones menos la primera por defecto
        usuariosRegistrados.style.display = "none";

        // Manejar eventos de clic en los enlaces del menú
        peticionesLink.addEventListener("click", function(event) {
            event.preventDefault();
            peticionesUsuarios.style.display = "block";
            usuariosRegistrados.style.display = "none";
        });

        usuariosLink.addEventListener("click", function(event) {
            event.preventDefault();
            usuariosRegistrados.style.display = "block";
            peticionesUsuarios.style.display = "none";
        });
    </script>
</body>
</html>
