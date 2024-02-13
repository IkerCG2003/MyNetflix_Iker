// Llama a la función ListarTop5() para mostrar los primeros 5 elementos inicialmente
ListarTop5();

// Establece un intervalo para llamar periódicamente a la función ListarTop5() cada 5 segundos
setInterval(ListarTop5, 5000);

// Función para listar los primeros 5 elementos
function ListarTop5() {
    var resultado = document.getElementById('resultado_top5');
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listartop5.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var cantidad_peliculas = json.length;
            var columnas_por_fila = Math.min(5, cantidad_peliculas); 
            var contenido = '<div class="row">'; 
            json.forEach(function (item, index) {
                if (index > 0 && index % columnas_por_fila === 0) {
                    contenido += '</div>'; 
                    contenido += '<div class="row">'; 
                }
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' grid-item">';
                contenido += '<img src="../img/' + item.portada + '.jpg" alt="' + item.nombre + '">';
                contenido += '<div class="movie-info-top">'
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p>' + item.genero + '</p>';
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += '</div>';
                contenido += '</div>';
            });
            contenido += '</div>'; 
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send();
}
