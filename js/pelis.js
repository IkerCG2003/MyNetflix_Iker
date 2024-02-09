const buscar_peli = document.getElementById("buscar_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    if (valor == "") {
        ListarPeli('');
    } else {
        ListarPeli(valor);
    }
});

function ListarPeli(valor, genero = '') {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    formdata.append('genero', genero);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var cantidad_peliculas = json.length;
            var columnas_por_fila = Math.min(5, cantidad_peliculas); // No más de 5 columnas por fila
            var contenido = '<div class="row">'; // Abrimos la fila
            json.forEach(function (item, index) {
                if (index > 0 && index % columnas_por_fila === 0) {
                    contenido += '</div>'; // Cerramos la fila actual
                    contenido += '<div class="row">'; // Abrimos una nueva fila
                }
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' col-lg-' + (12 / columnas_por_fila) + ' grid-item">'; // Calculamos el ancho de la columna
                contenido += '<img src="../img/' + item.portada + '.jpg" alt="' + item.nombre + '">';
                contenido += '<div class="movie-info">';
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p>' + item.genero + '</p>';
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += "<div class='btn-container'>";
                contenido += "<button type='button' class='btn btn-warning' onclick='Editar(" + JSON.stringify(item) + ")'>Editar</button>";
                contenido += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + JSON.stringify(item) + ")'>Eliminar</button>";
                contenido += "</div>"; // Cerramos btn-container
                contenido += '</div>'; // Cerramos movie-info
                contenido += '</div>'; // Cerramos grid-item
            });
            contenido += '</div>'; // Cerramos la última fila
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function Editar(item) {
    $('#modalEditarPelicula').modal('show'); // Mostrar el modal
    document.getElementById("id_pelicula_editar").value = item.id;
    document.getElementById('titulo_peli_editar').value = item.titulo; // Rellenar el campo de título con el título de la película
    document.getElementById('genero_peli_editar').value = item.genero; // Rellenar el campo de género con el género de la película
    document.getElementById('titulo_peli_editar').value = item.nombre; // Rellenar el campo de me gustas con el título de la película
    // Puedes agregar más campos aquí si los tienes en tu formulario
}

function guardarCambios() {
    var formdata = new FormData(document.getElementById('frmEditarPelicula')); // Obtener los datos del formulario
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/editar/editar.php');

    ajax.onload = function () 
    {
        if (ajax.status == 200) 
        {
            var json = JSON.parse(ajax.responseText);
            if (json.success) 
            {
                $('#modalEditarPelicula').modal('hide'); // Ocultar el modal
                Swal.fire({
                    position: 'top-end',
                    title: '¡Pelicula editada!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=peliculaeditada');
                    ListarPeli('', document.getElementById('genero_peli').value); // Actualizar la lista de películas con el género seleccionado
                });
            } 
            
            else 
            {
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al editar la película. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } 
        
        else 
        {
            console.error('Error en la solicitud AJAX.');
        }
    };
    ajax.send(formdata);
}

function Eliminar(item) {
    EnviarAccion(item, 'eliminar');
}

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
            realizarAccion(item, accion);
        }
    });
}

function realizarAccion(item, accion) {
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + '.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            if (json.success) {
                Swal.fire({
                    position: 'top-end',
                    title: '¡Pelicula eliminada!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=peliculaeliminada');
                    if (accion === 'editar' || accion === 'eliminar') {
                        ListarPeli('', document.getElementById('genero_peli').value); // Actualizar la lista de películas con el género seleccionado
                    }
                });
            } else {
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al ' + accion + ' la película. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}

function filtrarPorGenero() {
    var genero = document.getElementById('genero_peli').value;
    ListarPeli('', genero);
}


