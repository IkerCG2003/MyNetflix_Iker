const buscar_user = document.getElementById("buscar_peticiones");

buscar_user.addEventListener("keyup", () => {
    const valor = buscar_user.value;
    if (valor == "") {
        ListarPeticiones('');
    } else {
        ListarPeticiones(valor);
    }
});

ListarPeticiones('');

function ListarPeticiones(valor) {
    var resultado = document.getElementById('resultado_registro_usuarios');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpeticiones.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.length === 0) {
                resultado.innerHTML = '<p>No hay peticiones nuevas.</p>';
            } else {
                var tabla = '';
                json.forEach(function (item) {
                    tabla += "<tr><td>" + item.id + "</td>";
                    tabla += "<td>" + item.nombre_user + "</td>";
                    tabla += "<td>" + item.email_user + "</td>";
                    tabla += "<td>";
                    tabla += "<button type='button' class='btn btn-success' onclick='Aceptar(" + JSON.stringify(item) + ")'>Aceptar</button>";
                    tabla += " <button type='button' class='btn btn-danger' onclick='Denegar(" + item.id + ")'>Denegar</button>";
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
    console.log(id);

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
                    ListarPeticiones('');
                    // Actualiza la página después de realizar la acción con éxito
                    location.reload();
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
