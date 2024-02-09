const buscar_peli = document.getElementById("buscar_peli");
const genero_peli = document.getElementById("genero_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value;
    ListarPeli(valor);
});

genero_peli.addEventListener("change", () => {
    const generoSeleccionado = genero_peli.value;
    ListarPeli('', generoSeleccionado);
});

function ListarPeli(valor, generoSeleccionado = '') {
    var resultado = document.getElementById('resultado_pelis');
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    formdata.append('genero', generoSeleccionado);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
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
                contenido += '<div class="col-md-' + (12 / columnas_por_fila) + ' col-lg-' + (12 / columnas_por_fila) + ' grid-item">';
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<div class="movie-info">'
                contenido += '<p>' + item.genero + '</p>';
                contenido += '<p>Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += "<div class='btn-container'>";
                contenido += "<button type='button' class='btn btn-warning' onclick='Editar(" + JSON.stringify(item) + ")'>Editar</button>";
                contenido += "<button type='button' class='btn btn-danger' onclick='Eliminar(" + JSON.stringify(item) + ")'>Eliminar</button>";
                contenido += "</div>";
                contenido += '</div>';
                contenido += '</div>';
            });
            contenido += '</div>';
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}
