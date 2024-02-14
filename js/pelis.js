const buscar_peli_admin = document.getElementById("buscar_peli_admin");

// Evento de tecla para buscar películas
buscar_peli_admin.addEventListener("keyup", () => {
    const valor = buscar_peli_admin.value;
    if (valor == "") {
        // Si el campo de búsqueda está vacío, listar todas las películas
        ListarPeli('', document.getElementById('genero_peli').value);
    } else {
        // Si hay un valor en el campo de búsqueda, listar películas que coincidan con ese valor
        ListarPeli(valor, document.getElementById('genero_peli').value);
    }
});

// Función para listar películas
function ListarPeli(valor, genero = '') {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor); // Agregar el valor de búsqueda al FormData
    formdata.append('genero', genero);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var contenido = ''; // Iniciar contenido vacío
            var contador = 0; // Iniciar contador de películas por fila
            json.forEach(function (item) {
                if (contador % 5 === 0) {
                    // Si es el inicio de una nueva fila, agregar un nuevo div de fila
                    contenido += '<div class="row">';
                }
                contenido += '<div class="col-md-2 col-lg-2 grid-item">'; // Establecer el tamaño de la columna
                contenido += '<div class="movie-container">'; // Contenedor de película
                contenido += '<img src="../img/' + item.portada + '.jpg" alt="' + item.titulo + '">'; // Imagen de la película
                contenido += '<div class="movie-info">'; // Contenedor de información
                contenido += '<p class="movie-name">' + item.titulo + '</p>'; // Nombre de la película
                contenido += '<p>' + item.genero + '</p>'; // Género de la película
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>'; // Cantidad de "Me Gustas"
                contenido += '</div>'; // Cerrar contenedor de información
                contenido += '<div class="btn-container">'; // Contenedor de botones
                contenido += "<button type='button' class='btn btn-warning movie-btn' onclick='EditarPeli(" + JSON.stringify(item) + ")'>Editar</button>"; // Botón de editar
                contenido += "<button type='button' class='btn btn-danger movie-btn' onclick='EliminarPeli(" + JSON.stringify(item) + ")'>Eliminar</button>"; // Botón de eliminar
                contenido += '</div>'; // Cerrar contenedor de botones
                contenido += '</div>'; // Cerrar contenedor de película
                contenido += '</div>'; // Cerrar columna
                contador++; // Incrementar contador de películas
                if (contador % 5 === 0) {
                    // Si se completaron 5 películas en la fila, cerrar el div de fila
                    contenido += '</div>';
                }
            });
            resultado.innerHTML = contenido; // Mostrar contenido en el resultado
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>'; // Mostrar mensaje de error si la solicitud falla
        }
    };
    ajax.send(formdata); // Enviar solicitud AJAX con los datos del formulario
}

// Función para editar una película
function EditarPeli(item) {
    $('#modalEditarPelicula').modal('show'); // Mostrar el modal para editar la película
    document.getElementById("id_pelicula_editar").value = item.id;
    document.getElementById('titulo_peli_editar').value = item.titulo; // Establecer el título de la película en el formulario de edición
    document.getElementById('genero_peli_editar').value = item.genero; // Establecer el género de la película en el formulario de edición
}

// Función para guardar cambios al editar una película
function guardarCambiosPelicula() 
{
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
                    ListarPeli('');
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
