// Obtener el elemento de búsqueda de usuario por su ID
const buscar_user = document.getElementById("buscar_user");

// Agregar un evento de tecla para realizar la búsqueda de usuarios mientras se escribe en el campo de búsqueda
buscar_user.addEventListener("keyup", () => {
    const valor = buscar_user.value;
    if (valor == "") {
        // Si el campo de búsqueda está vacío, listar todos los usuarios
        ListarUsers('');
    } else {
        // Si hay un valor en el campo de búsqueda, listar usuarios que coincidan con ese valor
        ListarUsers(valor);
    }
});

// Iniciar la lista de usuarios al cargar la página
ListarUsers('');

// Agregar un event listener para el clic en cualquier parte del documento
document.addEventListener('click', function (e) {
    // Verificar si el clic se realizó en un botón de cambiar estado de usuario
    if (e.target.classList.contains('btn-estado')) {
        // Obtener el ID del usuario al que se le quiere cambiar el estado y mostrar el mensaje de confirmación
        var idUsuario = e.target.getAttribute('data-id');
        mostrarSweetAlert(idUsuario);
    }
});

// Función para listar usuarios
function ListarUsers(valor) {
    var resultado = document.getElementById('resultado_usuarios_registrados');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarusuarios.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            // Procesar la respuesta y construir la tabla de usuarios
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) {
                tabla += "<tr>";
                tabla += "<td>" + item.id + "</td>";
                tabla += "<td>" + item.username + "</td>";
                tabla += "<td>" + item.email + "</td>";
                tabla += "<td>" + item.estado + "</td>";
                tabla += "<td>";
                tabla += "<div class='icon-container'>";
                // Agregar iconos de editar y eliminar para cada usuario
                tabla += "<i class='bi bi-pencil-square icon' onclick='EditarUser(" + JSON.stringify(item) + ")'></i>";
                tabla += "<i class='bi bi-trash icon' onclick='EliminarUser(" + JSON.stringify(item) + ")'></i>";
                tabla += "</div>";
                tabla += "</td>";
                tabla += "<td>";
                tabla += "<button type='button' class='btn btn-warning btn-estado' data-id='" + item.id + "'>Cambiar Estado</button>";
                tabla += "</td>";
                tabla += "</tr>";
            });
            resultado.innerHTML = tabla; // Mostrar la tabla de usuarios en el resultado
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>'; // Mostrar un mensaje de error si la solicitud no tiene éxito
        }
    };
    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
}

// Función para mostrar el mensaje de confirmación para cambiar el estado del usuario
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

// Función para cambiar el estado del usuario mediante AJAX
function cambiarEstadoUsuario(id) {
    var formdata = new FormData();
    formdata.append('id', JSON.stringify(id));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/estadouser.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            // Procesar la respuesta después de cambiar el estado del usuario
            var json = JSON.parse(ajax.responseText);
            if (json.success) {
                // Mostrar un mensaje de éxito si el estado del usuario se cambió correctamente
                if (json.email === 'admin@gmail.com') {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "No puedes desactivar al administrador",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    });
                } else {
                    Swal.fire({
                        position: 'top-end',
                        title: '¡Estado cambiado!',
                        icon: 'success'
                    }).then(() => {
                        window.location.href = '?message=estadocambiado&id=' + id;
                    });
                }
            } else {
                // Mostrar un mensaje de error si no se pudo cambiar el estado del usuario
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
            console.error('Error en la solicitud AJAX.'); // Mostrar un mensaje de error en la consola si la solicitud AJAX falla
        }
    };

    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
}

// Función para editar un usuario
function EditarUser(item) {
    if (item.email === 'admin@gmail.com') {
        // Mostrar un mensaje de error si se intenta editar al administrador
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

    // Mostrar el modal de edición de usuario y prellenar los campos con la información del usuario seleccionado
    $('#modalEditarUser').modal('show');
    document.getElementById("id_usuario_editar").value = item.id;
    document.getElementById('nombre_user_editar').value = item.username;
    document.getElementById('email_user_editar').value = item.email;
}

// Función para guardar los cambios realizados en la edición de un usuario
function guardarCambios() {
    var formdata = new FormData(document.getElementById('frmEditarUsuario')); // Obtener los datos del formulario
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/aplicarcambios/user.php');

    ajax.onload = function () {
        if (ajax.status == 200) {
            // Procesar la respuesta después de guardar los cambios
            var json = JSON.parse(ajax.responseText);
            if (json.success) {
                // Mostrar un mensaje de éxito si los cambios se guardaron correctamente y recargar la lista de usuarios
                $('#modalEditarUser').modal('hide');
                Swal.fire({
                    position: 'top-end',
                    title: 'Usuario editado!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=usuarioeditado');
                    ListarUsers('', document.getElementById('id_usuario_editar').value);
                });
            } else {
                // Mostrar un mensaje de error si no se pudieron guardar los cambios
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al editar el usuario. Mensaje: ' + json.message,
                    icon: 'error'
                });
            }
        } else {
            console.error('Error en la solicitud AJAX.'); // Mostrar un mensaje de error en la consola si la solicitud AJAX falla
        }
    };
    ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
}

// Función para eliminar un usuario
function EliminarUser(item) {
    if (item.email === 'admin@gmail.com') {
        // Mostrar un mensaje de error si se intenta eliminar al administrador
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

    // Mostrar un mensaje de confirmación para eliminar el usuario
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
            // Si se confirma la eliminación, enviar una solicitud AJAX para eliminar el usuario
            var formdata = new FormData();
            formdata.append('id', item.id);

            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../validaciones/registros/eliminarusuario.php');
            ajax.onload = function () {
                if (ajax.status == 200) {
                    // Procesar la respuesta después de eliminar el usuario
                    var json = JSON.parse(ajax.responseText);
                    if (json.success) {
                        // Mostrar un mensaje de éxito si el usuario se eliminó correctamente y recargar la lista de usuarios
                        Swal.fire({
                            position: 'top-end',
                            title: '¡Usuario eliminado!',
                            icon: 'success'
                        }).then(() => {
                            ListarUsers('');
                        });
                    } else {
                        // Mostrar un mensaje de error si no se pudo eliminar el usuario
                        Swal.fire({
                            position: 'top-end',
                            title: 'Error',
                            text: 'Error al eliminar el usuario. Mensaje: ' + json.message,
                            icon: 'error'
                        });
                    }
                } else {
                    console.error('Error en la solicitud AJAX.'); // Mostrar un mensaje de error en la consola si la solicitud AJAX falla
                }
            };

            ajax.send(formdata); // Enviar la solicitud AJAX con los datos del formulario
        }
    });
}
