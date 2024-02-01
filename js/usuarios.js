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

function ListarUsers(valor) 
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
            var tabla = '';
            json.forEach(function (item) 
            {
                tabla += "<tr><td>" + item.id + "</td>";
                tabla += "<td>" + item.username + "</td>";
                tabla += "<td>" + item.email + "</td></tr>";
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
