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

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-estado')) {
        var idUsuario = e.target.getAttribute('data-id');
        mostrarSweetAlert(idUsuario);
    }
});

function ListarUsers(valor) {
    var resultado = document.getElementById('resultado_usuarios_registrados');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarusuarios.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) {
                tabla += "<tr><td>" + item.id + "</td>";
                tabla += "<td>" + item.username + "</td>";
                tabla += "<td>" + item.email + "</td>";
                tabla += "<td>" + item.estado + "</td>";
                tabla += "<td><button type='button' class='btn btn-warning' onclick='mostrarSweetAlert(" + item.id + ")'>Cambiar Estado</button></td></tr>";
            });
            resultado.innerHTML = tabla;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function mostrarSweetAlert(id) {
    var formdata = new FormData();
    formdata.append('id', JSON.stringify(id));

    Swal.fire({
        title: '¿Quieres cambiar el estado del usuario?',
        text: 'Esta acción cambiará el estado del usuario.',
        icon: 'warning',
        position: 'top-end',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cambiar estado'
    }).then((result) => {
        if (result.isConfirmed) {
            cambiarEstadoUsuario(id);
        }
    });
}

function cambiarEstadoUsuario(id) {
    var formdata = new FormData();
    formdata.append('id', JSON.stringify(id));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/estado.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.success) {
                Swal.fire({
                    position: 'top-end',
                    title: '¡Estado cambiado!',
                    text: 'El estado del usuario ha sido modificado.',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '?message=estadocambiado&id=' + id;
                });
            } else {
                alert('Error al cambiar el estado del usuario. Mensaje: ' + json.message);
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}
