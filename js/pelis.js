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
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var contenido = '<div class="row">';
            json.forEach(function (item, index) {
                // Abre una nueva fila cada 5 elementos
                if (index % 5 === 0) {
                    contenido += '</div>'; // Cierra la fila anterior (excepto en la primera iteración)
                    contenido += '<div class="row">'; // Inicia una nueva fila
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
    ajax.send();
}
