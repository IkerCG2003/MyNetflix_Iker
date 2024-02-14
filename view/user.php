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
    <!-- Bootstrap icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
    <title>Página del usuario</title>
</head>

<body>
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

    <section class="container" id="seccion_top">
        <h2> TOP 5</h2>
        <div class="grid">
            <div id="resultado_top5"></div>
        </div>
    </section>

    <section class="container" id="seccion_pelis">
        <h2>Catálogo</h2>
        <div class="row align-items-center">
            <div class="col-md-6">
                <form action="" method="post" id="frmbusqueda" class="form-inline">
                    <div class="form-group mr-2">
                        <label for="buscar_peli" class="mr-2">Buscar:</label>
                        <input type="text" name="buscar_peli" id="buscar_peli" placeholder="Buscar por título..." class="form-control">
                    </div>
                    <div class="form-group">
                        <select name="genero_peli" id="genero_peli" class="form-control mr-2" onchange="filtrarPorGenero()" style="color: black;">
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
                </form>
            </div>
        </div>

        <div class="grid">
            <div id="resultado_pelis"></div>
        </div>
    </section>

    <!-- Scripts JS -->
    <script src="../js/pelis_user.js"></script>
    <script src="../js/top5.js"></script>
    <!-- JS LISTAR USUARIOS Y PELIS -->
    <script>
        document.addEventListener("DOMContentLoaded", function() 
        {
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
</body>
</html>
