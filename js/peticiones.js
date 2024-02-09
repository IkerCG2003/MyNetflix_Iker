const buscar_peticiones = document.getElementById("buscar_peticiones");

buscar_peticiones.addEventListener("keyup", () => {
    const valor = buscar_peticiones.value;
    ListarPeticiones(valor);
});

// Llamamos a ListarPeticiones() al cargar la página
ListarPeticiones('');

// Establecemos la función para que se refresque cada 5 segundos
setInterval(() => {
    ListarPeticiones(buscar_peticiones.value); // Pasar el valor actual del campo de búsqueda
}, 5000); // 5000 milisegundos = 5 segundos


function ListarPeticiones(valor) {
    var resultado = document.getElementById('resultado_registro_usuarios');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    formdata.append('registrosPorPagina', 5);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpeticiones.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.length === 0) {
                resultado.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay peticiones nuevas.</td></tr>';
            } else {
                var tabla = '';
                json.forEach(function (item) {
                    tabla += "<tr><td>" + item.id + "</td>";
                    tabla += "<td>" + item.nombre_user + "</td>";
                    tabla += "<td>" + item.email_user + "</td>";
                    tabla += "<td>";
                    tabla += "<div class='button-container'>";
                    tabla += "<div class='btn-container'>";
                    tabla += "<button type='button' class='btn btn-success' onclick='AceptarPeticion(" + JSON.stringify(item) + ")'>Aceptar</button>";
                    tabla += "<button type='button' class='btn btn-danger' onclick='DenegarPeticion(" + JSON.stringify(item) + ")'>Denegar</button>";
                    tabla += "</div>";
                    tabla += "</div>";
                    tabla += "</td></tr>";
                });
                resultado.innerHTML = tabla;
            }
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function AceptarPeticion(item) {
    ConfirmarAccion(item, 'aceptar');
}

function DenegarPeticion(item) {
    ConfirmarAccion(item, 'denegar');
}

function ConfirmarAccion(item, accion) {
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí'
    }).then((result) => {
        if (result.isConfirmed) {
            RealizarAccion(item, accion);
        }
    });
}

function RealizarAccion(item, accion) {
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + '.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.success) {
                Swal.fire({
                    title: '¡Hecho!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=user' + accion);
                    if (accion === 'aceptar' || accion === 'denegar') {
                        ListarUsers('');
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al ' + accion + ' la petición. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}
