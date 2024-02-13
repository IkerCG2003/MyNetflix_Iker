const buscar_user = document.getElementById("buscar_user");

buscar_user.addEventListener("keyup", () => 
{
    const valor = buscar_user.value;
    if (valor == "") 
    {
        ListarUsers('');
    } 
    
    else 
    {
        ListarUsers(valor);
    }
});

ListarUsers('');

document.addEventListener('click', function (e) 
{
    if (e.target.classList.contains('btn-estado')) 
    {
        var idUsuario = e.target.getAttribute('data-id');
        mostrarSweetAlert(idUsuario);
    }
});

function ListarUsers(valor) 
{
    var resultado = document.getElementById('resultado_usuarios_registrados');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarusuarios.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) 
            {
                tabla += "<tr>";
                    tabla += "<td>" + item.id + "</td>";
                    tabla += "<td>" + item.username + "</td>";
                    tabla += "<td>" + item.email + "</td>";
                    tabla += "<td>" + item.estado + "</td>";
                    tabla += "<td>";
                        tabla += "<div class='icon-container'>";
                            tabla += "<i class='bi bi-pencil-square icon' onclick='EditarUser(" + JSON.stringify(item) + ")'></i>";
                            tabla += "<i class='bi bi-trash icon' onclick='EliminarUser(" + JSON.stringify(item) + ")'></i>";
                        tabla += "</div>";
                    tabla += "</td>";
                    tabla += "<td>";
                        tabla += "<button type='button' class='btn btn-warning btn-estado' data-id='" + item.id + "'>Cambiar Estado</button>";
                    tabla += "</td>";
                tabla += "</tr>";
            });
            resultado.innerHTML = tabla;
        } 
        
        else 
        {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function mostrarSweetAlert(id) 
{
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
    }).then((result) => 
    {
        if (result.isConfirmed) 
        {
            cambiarEstadoUsuario(id);
        }
    });
}

function cambiarEstadoUsuario(id) {
    var formdata = new FormData();
    formdata.append('id', JSON.stringify(id));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/estadouser.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.success) {
                if (json.email === 'admin@gmail.com') {
                    // Si el usuario es admin@gmail.com, no hacer nada
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "No puedes desactivar al administrador",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                } else {
                    // Si el usuario no es admin@gmail.com, cambiar el estado
                    Swal.fire({
                        position: 'top-end',
                        title: '¡Estado cambiado!',
                        icon: 'success'
                    }).then(() => {
                        window.location.href = '?message=estadocambiado&id=' + id;
                    });
                }
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "No puedes desactivar al administrador",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.');
        }
    };

    ajax.send(formdata);
}

function EditarUser(item) {
    if (item.email === 'admin@gmail.com') {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No puedes editar al administrador',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
        return;
    }

    $('#modalEditarUser').modal('show');
    document.getElementById("id_usuario_editar").value = item.id;
    document.getElementById('nombre_user_editar').value = item.username;
    document.getElementById('email_user_editar').value = item.email;
}

function guardarCambios() 
{
    var formdata = new FormData(document.getElementById('frmEditarUsuario')); // Obtener los datos del formulario
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/aplicarcambios/user.php');

    ajax.onload = function () 
    {
        if (ajax.status == 200) 
        {
            var json = JSON.parse(ajax.responseText);
            if (json.success) 
            {
                $('#modalEditarUser').modal('hide'); // Ocultar el modal
                Swal.fire({
                    position: 'top-end',
                    title: 'Usuario editado!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=usuarioeditado');
                    ListarUsers('', document.getElementById('id_usuario_editar').value);
                });
            } 
            
            else 
            {
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al editar el usuario. Mensaje: ' + json.message,
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

function EliminarUser(item) {
    if (item.email === 'admin@gmail.com') {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No puedes eliminar al administrador',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
        return;
    }

    // Mostrar cuadro de diálogo de SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Quieres eliminar este usuario?',
        position: 'top-end',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma la eliminación, enviar solicitud AJAX para eliminar el usuario
            var formdata = new FormData();
            formdata.append('id', item.id);

            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../validaciones/registros/eliminarusuario.php');
            ajax.onload = function () {
                if (ajax.status == 200) {
                    var json = JSON.parse(ajax.responseText);

                    if (json.success) {
                        Swal.fire({
                            position: 'top-end',
                            title: '¡Usuario eliminado!',
                            icon: 'success'
                        }).then(() => {
                            // Recargar la lista de usuarios después de la eliminación
                            ListarUsers('');
                        });
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            title: 'Error',
                            text: 'Error al eliminar el usuario. Mensaje: ' + json.message,
                            icon: 'error'
                        });
                    }
                } else {
                    console.error('Error en la solicitud AJAX.');
                }
            };

            ajax.send(formdata);
        }
    });
}
