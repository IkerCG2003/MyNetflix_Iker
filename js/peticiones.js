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
    formdata.append('busqueda', valor); // Añadir la variable de búsqueda al FormData
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listaruser.php');
    ajax.onload = function () {
        var str = "";
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) {
                str = "<tr><td>" + item.nombre_user + "</td>";
                str = str + "<td>" + item.email_user + "</td>";
                str = str + "<td>";
                str = str + "<button type='button' class='btn btn-success' onclick='Aceptar(" + item.id_user + ")'>Aceptar</button>";
                str = str + "<button type='button' class='btn btn-danger' onclick='Denegar(" + item.id_user + ")'>Denegar</button>";
                str = str + "</td> ";
                str = str + "</tr>";
                tabla += str;
            });
            resultado.innerHTML = tabla;
        } else {
            resultado.innerText = 'Error';
        }
    }
    ajax.send(formdata);
}
