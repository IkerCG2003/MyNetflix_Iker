<?php
    include_once('../../herramientas/conexion.php');

    $titulo = $_POST['titulo_peli'];
    $genero = $_POST['genero_peli'];
    $img = $_POST['imagen_peli'];

    // Verificar si la película ya existe en la base de datos
    $consulta_existencia = $pdo->prepare('SELECT COUNT(*) FROM tbl_peliculas WHERE nombre = ?');
    $consulta_existencia->execute([$titulo]);
    $existe_pelicula = $consulta_existencia->fetchColumn();

    if ($existe_pelicula) {
        header('Location: ../../view/admin.php?error=peliexiste');
        exit; // Detener la ejecución si la película ya existe
    }

    // Obtener la extensión del archivo
    $extension = pathinfo($_FILES['imagen_peli']['name'], PATHINFO_EXTENSION);

    // Verificar si la extensión del archivo es ".jpg"
    if ($extension !== 'jpg') {
        header('Location: ../../view/admin.php?error=extensionmal');
        exit; // Detener la ejecución si la extensión no es .jpg
    }

    // Crear un nombre único para la imagen usando el título de la película y la extensión del archivo
    $nombreImagen = $titulo . '.' . $extension;

    // Ruta de destino para la imagen
    $rutaImagen = "../../img/" . $nombreImagen;

    // Mover la imagen cargada a la ruta de destino con el nuevo nombre
    move_uploaded_file($_FILES['imagen_peli']['tmp_name'], $rutaImagen);

    // Preparar la consulta SQL para insertar los datos
    $consulta = $pdo->prepare('INSERT INTO tbl_peliculas (nombre, genero, cantidadmegustas) VALUES (?,?,0)');

    // Ejecutar la consulta con los datos proporcionados
    $consulta->execute([$titulo, $genero]);

    // Verificar si la consulta fue exitosa
    if ($consulta) {
        header('Location: ../../view/admin.php?message=peliinsertada');
    } else {
        header('Location: ../../view/admin.php?error=pelinoinsertada');
    }
?>
