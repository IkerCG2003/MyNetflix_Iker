// Llamamos a ListarTop5() al cargar la página
ListarTop5();

// Establecemos la función para que se refresque cada 5 segundos
setInterval(ListarTop5, 5000); // 5000 milisegundos = 5 segundos

function ListarTop5() 
{
    var resultado = document.getElementById('resultado_top5');
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listartop5.php');
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
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' grid-item">'; // Calculamos el ancho de la columna
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<div class="movie-info-top">'
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p>' + item.genero + '</p>';
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += '</div>';
                contenido += '</div>';
            });
            contenido += '</div>'; // Cerramos la última fila
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send();
}

