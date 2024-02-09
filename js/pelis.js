const buscar_peli = document.getElementById("buscar_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    if (valor == "") 
    {
        ListarPeli('');
    } 
    
    else 
    {
        ListarPeli(valor);
    }
});

function ListarPeli(valor) 
{
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var cantidad_peliculas = json.length;
            var columnas_por_fila = Math.min(5, cantidad_peliculas); // No más de 5 columnas por fila
            var contenido = '<div class="row">'; // Abrimos la fila
            json.forEach(function (item, index) {
                if (index > 0 && index % columnas_por_fila === 0) {
                    contenido += '</div>'; // Cerramos la fila actual
                    contenido += '<div class="row">'; // Abrimos una nueva fila
                }
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' col-lg-' + (12 / columnas_por_fila) + ' grid-item">'; // Calculamos el ancho de la columna
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<div class="movie-info">'
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p>' + item.genero + '</p>';
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += "<div class='btn-container'>";
                contenido += "<button type='button' class='btn btn-warning' onclick='Editar(" + JSON.stringify(item) + ")'>Editar</button>";
                contenido += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + JSON.stringify(item) + ")'>Eliminar</button>";
                contenido += "</div>"; // Cerramos btn-container
                contenido += '</div>'; // Cerramos movie-info
                contenido += '</div>'; // Cerramos grid-item
            });
            contenido += '</div>'; // Cerramos la última fila
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

const btnAnadirPelicula = document.getElementById('btn-insertar');

btnAnadirPelicula.addEventListener('click', () => {
    fetch('../validaciones/inserciones/insertar.php', 
    {
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        ListarPeli('');
    })
    
    .catch(error => 
        {
        console.error('Error:', error);
    });
});

function Eliminar(item) 
{
    EnviarAccion(item, 'eliminar');
}

function EnviarAccion(item, accion) 
{
    Swal.fire({
        title: '¿Estás seguro?',
        position: 'top-end',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar película'
    }).then((result) => 
    {
        if (result.isConfirmed) 
        {
            realizarAccion(item, accion);
        }
    });
}

function realizarAccion(item, accion) 
{
    var formdata = new FormData();
    formdata.append('item', JSON.stringify(item));

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/registros/' + accion + '.php');
    ajax.onload = function () 
    {
        if (ajax.status == 200) 
        {
            var json = JSON.parse(ajax.responseText);

            if (json.success) 
            {
                Swal.fire({
                    position: 'top-end',
                    title: '¡Pelicula eliminada!',
                    icon: 'success'
                }).then(() => {
                    history.pushState({}, null, '?message=peliculaeliminada');
                    if (accion === 'editar' || accion === 'eliminar') 
                    {
                        ListarPeli(''); 
                    }
                });
            } 
            
            else 
            {
                Swal.fire({
                    position: 'top-end',
                    title: 'Error',
                    text: 'Error al ' + accion + ' la película. Mensaje: ' + json.message,
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

function listarPeliculasAutomaticamente() {
    ListarPeli('');
    setInterval(function() 
    {
        ListarPeli('');
    }, 5000);
}

listarPeliculasAutomaticamente();
