const buscar_peli = document.getElementById("buscar_peli");

// Evento de tecla para buscar películas
buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    if (valor == "") {
        // Si el campo de búsqueda está vacío, listar todas las películas
        ListarPeli('');
    } else {
        // Si hay un valor en el campo de búsqueda, listar películas que coincidan con ese valor
        ListarPeli(valor);
    }
});

// Función para listar películas
function ListarPeli(valor, genero = '') {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    formdata.append('genero', genero);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            // Si la solicitud es exitosa, procesar la respuesta
            var json = JSON.parse(ajax.responseText);
            var cantidad_peliculas = json.length;
            var columnas_por_fila = Math.min(5, cantidad_peliculas); // Establecer el número máximo de columnas por fila
            var contenido = '<div class="row">'; // Iniciar la fila de la cuadrícula de películas
            json.forEach(function (item, index) {
                if (index > 0 && index % columnas_por_fila === 0) {
                    contenido += '</div>'; // Cerrar la fila actual
                    contenido += '<div class="row">'; // Abrir una nueva fila
                }
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' col-lg-' + (12 / columnas_por_fila) + ' grid-item">'; // Agregar la columna con el tamaño calculado
                contenido += '<img src="../img/' + item.portada + '.jpg" alt="' + item.nombre + '">'; // Agregar la imagen de la película
                contenido += '<div class="movie-info">';
                contenido += '<p class="movie-name">' + item.nombre + '</p>'; // Agregar el nombre de la película
                contenido += '<p>' + item.genero + '</p>'; // Agregar el género de la película
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>'; // Agregar la cantidad de "Me Gustas" de la película
                contenido += "<div class='btn-container'>";
                // Agregar botones de editar y eliminar para cada película
                contenido += "<button type='button' class='btn btn-warning' onclick='EditarPeli(" + JSON.stringify(item) + ")'>Editar</button>";
                contenido += "<button type='button' class='btn btn-danger' onclick='EliminarPeli(" + JSON.stringify(item) + ")'>Eliminar</button>";
                contenido += "</div>"; // Cerrar el contenedor de botones
                contenido += '</div>'; // Cerrar el contenedor de información de la película
                contenido += '</div>'; // Cerrar la columna actual
            });
            contenido += '</div>'; // Cerrar la última fila
            resultado.innerHTML = contenido; // Mostrar el contenido en el resultado
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>'; // Mostrar un mensaje de error si la solicitud no tiene éxito
        }
    };
    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
}

// Función para editar una película
function EditarPeli(item) {
    $('#modalEditarPelicula').modal('show'); // Mostrar el modal para editar la película
    document.getElementById("id_pelicula_editar").value = item.id;
    document.getElementById('titulo_peli_editar').value = item.titulo; // Establecer el título de la película en el formulario de edición
    document.getElementById('genero_peli_editar').value = item.genero; // Establecer el género de la película en el formulario de edición
    document.getElementById('titulo_peli_editar').value = item.nombre; // Establecer el nombre de la película en el formulario de edición
}

// Función para guardar cambios al editar una película
function guardarCambios() {
    var formdata = new FormData(document.getElementById('frmEditarPelicula')); // Obtener los datos del formulario de edición
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/aplicarcambios/pelis.php');

    ajax.onload = function () {
        if (ajax.status == 200) {
            // Procesar la respuesta después de guardar los cambios
            var json = JSON.parse(ajax.responseText);
            if (json.success) {
                // Si los cambios se guardaron correctamente, ocultar el modal y mostrar un mensaje de éxito
                $('#modalEditarPelicula').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    title: '¡Pelicula editada!',
                    icon: 'success'
                }).then(() => {
                    // Recargar la lista de películas después de editar
                    history.pushState({}, null, '?message=peliculaeditada');
                    ListarPeli('', document.getElementById('genero_peli').value);
                });
            } else {
                // Si hubo un error al guardar los cambios, mostrar un mensaje de error
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al editar la película. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.'); // Mostrar un mensaje de error en la consola si la solicitud AJAX falla
        }
    };
    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario de edición
}

// Función para eliminar una película
function EliminarPeli(item) {
    EnviarAccion(item, 'eliminar');
}

// Función para enviar una acción (eliminar, editar) de una película
function EnviarAccion(item, accion) {
    Swal.fire({
        title: '¿Estás seguro?',
        position: 'top-end',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar película'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma la acción, realizar la acción correspondiente
            realizarAccion(item, accion);
        }
    });
}

// Función para realizar una acción (eliminar, editar) de una película mediante AJAX
function realizarAccion(item, accion) {
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + 'pelicula.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            // Procesar la respuesta después de realizar la acción
            var json = JSON.parse(ajax.responseText);
            if (json.success) {
                // Si la acción se realizó correctamente, mostrar un mensaje de éxito y recargar la lista de películas si es necesario
                Swal.fire({
                    position: 'top-end',
                    title: '¡Pelicula eliminada!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=peliculaeliminada');
                    if (accion === 'editar' || accion === 'eliminar') {
                        ListarPeli('', document.getElementById('genero_peli').value);
                    }
                });
            } else {
                // Si hubo un error al realizar la acción, mostrar un mensaje de error
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al ' + accion + ' la película. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.'); // Mostrar un mensaje de error en la consola si la solicitud AJAX falla
        }
    };

    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
}

// Función para filtrar películas por género
function filtrarPorGenero() {
    var genero = document.getElementById('genero_peli').value;
    ListarPeli('', genero); // Listar películas filtradas por el género seleccionado
}
