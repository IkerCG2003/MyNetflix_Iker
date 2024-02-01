const buscar_peticiones = document.getElementById("buscar_user");

buscar_peticiones.addEventListener("keyup", () => 
{
    const valor = buscar_peticiones.value;
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

function ListarUsers(valor, page = 1) 
{
    var resultado = document.getElementById('resultado_usuarios_registrados');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarusuarios.php');
    ajax.onload = function () 
    {
        if (ajax.status == 200) 
        {
            var json = JSON.parse(ajax.responseText);

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const itemsForPage = json.slice(startIndex, endIndex);

            var tabla = '';
            itemsForPage.forEach(function (item) 
            {
                tabla += "<tr><td>" + item.id + "</td>";
                tabla += "<td>" + item.username + "</td>";
                tabla += "<td>" + item.email + "</td></tr>";
            });
            resultado.innerHTML = tabla;

            updatePaginationControls(json.length, page, 'usuarios');
        } 
        
        else 
        {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function Aceptar(item) 
{
    EnviarAccion(item, 'aceptar');
}

function Denegar(id) 
{
    EnviarAccion(id, 'denegar');
}

function EnviarAccion(item, accion) 
{
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + '.php');
    ajax.onload = function () 
    {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);

            if (json.success) 
            {
                history.pushState({}, null, '?message=user' + accion);
                if (accion === 'aceptar' || accion === 'denegar') 
                {
                    ListarUsers('');
                }
            } 
            
            else 
            {
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
            ListarUsers('', i);
        });

        li.appendChild(a);
        paginationElement.appendChild(li);
    }
}
