const buscar_peli = document.getElementById("buscar_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    if (valor == "") {
        ListarPeli('');
    } else {
        ListarPeli(valor);
    }
});

function ListarPeli(valor) {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var contenido = '<div class="grid-container">';
            json.forEach(function (item, index) {
                // Abre una nueva fila cada 5 elementos
                if (index % 5 === 0) {
                    contenido += '</div>'; 
                    contenido += '<div class="grid-container">'; 
                }
                // Agrega el contenido de cada película
                contenido += '<div class="col-md-2 grid-item">';
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p class="movie-info">' + item.genero + '</p>';
                contenido += '<p class="movie-info">Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += "<div class='btn-container'>";
                contenido += "<button type='button' class='btn btn-warning' onclick='Editar(" + JSON.stringify(item) + ")'>Editar</button>";
                contenido += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + JSON.stringify(item) + ")'>Eliminar</button>";
                contenido += "</div>"; // Cierre de div 'btn-container'
                contenido += '</div>'; // Cierre de div 'col-md-2 grid-item'
            });
            contenido += '</div>'; // Cierre de div 'grid-container'
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

// Lógica para añadir película
const btnAnadirPelicula = document.getElementById('btn-insertar');

btnAnadirPelicula.addEventListener('click', () => {
    fetch('../validaciones/inserciones/insertar.php', {
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Actualizar la lista después de la inserción
        ListarPeli('');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function Eliminar(item) {
    EnviarAccion(item, 'eliminar');
}

function EnviarAccion(item, accion) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cambiará el estado de la película.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, realizar acción'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma, proceder con la acción
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
                    title: '¡Acción realizada!',
                    text: 'La película ha sido ' + accion + 'da.',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=peliculaeliminada');
                    if (accion === 'editar' || accion === 'eliminar') {
                        ListarPeli(''); // Corregido aquí para llamar a ListarPeli
                    }
                });
            } else {
                Swal.fire({
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

// Función para listar películas y actualizar cada 5 segundos
function listarPeliculasAutomaticamente() {
    // Llamar a la función para listar películas
    ListarPeli('');
    // Configurar la actualización cada 5 segundos
    setInterval(function() {
        ListarPeli('');
    }, 5000); // 5000 milisegundos = 5 segundos
}

// Llamar a la función para listar películas automáticamente
listarPeliculasAutomaticamente();
