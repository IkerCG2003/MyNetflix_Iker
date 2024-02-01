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

const itemsPerPage = 5;

function ListarPeticiones(valor, page = 1) {
    var resultado = document.getElementById('resultado_registro_usuarios');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpeticiones.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const itemsForPage = json.slice(startIndex, endIndex);

            if (itemsForPage.length === 0) {
                resultado.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay peticiones nuevas.</td></tr>';
            } else {
                var tabla = '';
                itemsForPage.forEach(function (item) {
                    tabla += "<tr><td>" + item.id + "</td>";
                    tabla += "<td>" + item.nombre_user + "</td>";
                    tabla += "<td>" + item.email_user + "</td>";
                    tabla += "<td>";
                    tabla += "<button type='button' class='btn btn-success' onclick='Aceptar(" + JSON.stringify(item) + ")'>Aceptar</button>";
                    tabla += " <button type='button' class='btn btn-danger' onclick='Denegar(" +  JSON.stringify(item) + ")'>Denegar</button>";
                    tabla += "</td></tr>";
                });
                resultado.innerHTML = tabla;
            }

            updatePaginationControls(json.length, page, 'peticiones');
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function Aceptar(item) {
    EnviarAccion(item, 'aceptar');
}

function Denegar(item) {
    console.log(item);
    EnviarAccion(item, 'denegar');
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

function updatePaginationControls(totalItems, currentPage, section) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationElement = document.getElementById(`pagination_${section}`);
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i;

        if (i === currentPage) {
            a.classList.add('active');
        }

        a.addEventListener('click', () => {
            ListarPeticiones('', i);
        });

        li.appendChild(a);
        paginationElement.appendChild(li);
    }
}
