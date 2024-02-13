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
            var contenido = ''; // Iniciar contenido vacío
            var contador = 0; // Iniciar contador de películas por fila
            json.forEach(function (item) {
                if (contador % 5 === 0) {
                    // Si es el inicio de una nueva fila, agregar un nuevo div de fila
                    contenido += '<div class="row">';
                }
                contenido += '<div class="col-md-2 grid-item">'; // Establecer el tamaño de la columna
                contenido += '<div class="movie-container">'; // Contenedor de película
                contenido += '<img src="../img/' + item.portada + '.jpg" alt="' + item.nombre + '">'; // Imagen de la película
                contenido += '<div class="movie-info-top">'; // Contenedor de información
                contenido += '<p class="movie-name">' + item.nombre + '</p>'; // Nombre de la película
                contenido += '<p>' + item.genero + '</p>'; // Género de la película
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>'; // Cantidad de "Me Gustas"
                contenido += '</div>'; // Cerrar contenedor de información
                contenido += '</div>'; // Cerrar contenedor de película
                contenido += '</div>'; // Cerrar columna
                contador++; // Incrementar contador de películas
                if (contador % 5 === 0) {
                    // Si se completaron 5 películas en la fila, cerrar el div de fila
                    contenido += '</div>';
                }
            });
            resultado.innerHTML = contenido; // Mostrar contenido en el resultado
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>'; // Mostrar mensaje de error si la solicitud falla
        }
    };
    ajax.send(); // Enviar solicitud AJAX
}
