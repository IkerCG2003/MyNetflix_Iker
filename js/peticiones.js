const buscar_peticiones = document.getElementById("buscar_peticiones");

buscar_peticiones.addEventListener("keyup", () => {
    const valor = buscar_peticiones.value;
    ListarPeticiones(valor);
});

ListarPeticiones('');

// Llamada a ListarPeticiones cada 5 segundos
setInterval(function () {
    ListarPeticiones(buscar_peticiones.value);
}, 5000);

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
                    tabla += "<button type='button' class='btn btn-success' onclick='Aceptar(" + JSON.stringify(item) + ")'>Aceptar</button>";
                    tabla += "<button type='button' class='btn btn-danger' onclick='Denegar(" + JSON.stringify(item) + ")'>Denegar</button>";
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

function Aceptar(item) {
    EnviarAccion(item, 'aceptar');
}

function Denegar(id) {
    EnviarAccion(id, 'denegar');
}

function EnviarAccion(item, accion) {
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + '.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.success) {
                history.pushState({}, null, '?message=user' + accion);
                if (accion === 'aceptar' || accion === 'denegar') {
                    ListarUsers('');
                }
            } else {
                alert('Error al ' + accion + ' el usuario. Mensaje: ' + json.message);
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}