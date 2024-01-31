const buscar_user = document.getElementById("buscar_user");

buscar_user.addEventListener("keyup", () => {
    const valor = buscar_user.value;
    if (valor == "") {
        ListarUsers('');
    } else {
        ListarUsers(valor);
    }
});

ListarUsers('');

function ListarUsers(valor) {
    var resultado = document.getElementById('resultado_registro_usuarios');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listaruser.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.length === 0) {
                resultado.innerHTML = '<p>No hay peticiones nuevas.</p>';
            } else {
                var str = "";
                var tabla = '';
                json.forEach(function (item) {
                    str = "<tr><td>" + item.nombre_user + "</td>";
                    str = str + "<td>" + item.email_user + "</td>";
                    str = str + "<td>";
                    str = str + "<button type='button' class='btn btn-success' onclick='Aceptar(" + item.id_user + ")'>Aceptar</button>";
                    str = str + " <button type='button' class='btn btn-danger' onclick='Denegar(" + item.id_user + ")'>Denegar</button>";
                    str = str + "</td> ";
                    str = str + "</tr>";
                    tabla += str;
                });
                resultado.innerHTML = tabla;
            }
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function Aceptar(id_user) {
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/aceptar.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            console.log(json);

            if (json.success) {

                ListarUsers('');

                history.pushState({}, null, '?message=useraceptado');
            } else {
                alert('Error al aceptar el usuario. Mensaje: ' + json.message);
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}

function Denegar(id_user) {
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/denegar.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            console.log(json);

            if (json.success) {

                ListarUsers('');

                history.pushState({}, null, '?message=userdenegado');
            } else {
                alert('Error al denegar el usuario. Mensaje: ' + json.message);
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}
