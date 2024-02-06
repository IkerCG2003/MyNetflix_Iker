const buscar_peli = document.getElementById("buscar_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    if (valor == "") {
        ListarPeli('');
    } else {
        ListarPeli(valor);
    }
});

ListarPeli('');

function ListarPeli(valor) {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var contenido = '<div class="grid-container">';
            json.forEach(function (item, index) {
                // Abre una nueva fila cada 5 elementos
                if (index % 5 === 0) {
                    contenido += '</div>'; // Cierra la fila anterior (excepto en la primera iteración)
                    contenido += '<div class="grid-container">'; // Inicia una nueva fila
                }
                // Agrega el contenido de cada película
                contenido += '<div class="col-md-2 grid-item">';
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p class="movie-info">' + item.genero + '</p>';
                contenido += '<p class="movie-info">Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += '</div>';
            });
            contenido += '</div>'; // Cierra la última fila
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

// Lógica para añadir película
const btnAnadirPelicula = document.getElementById('btn-insertar');

btnAnadirPelicula.addEventListener('click', () => {
    // Aquí puedes realizar la lógica de inserción, por ejemplo, enviar una solicitud al servidor
    // utilizando AJAX o Fetch para procesar la inserción en el archivo insertar.php
    // Puedes utilizar la función ListarPeli() para actualizar la lista después de la inserción
    // Ejemplo con Fetch:
    fetch('../validaciones/inserciones/insertar.php', {
    })
    .then(response => response.json())
    .then(data => {
        // Puedes manejar la respuesta del servidor después de la inserción
        console.log(data);
        // Actualizar la lista después de la inserción
        ListarPeli('');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
