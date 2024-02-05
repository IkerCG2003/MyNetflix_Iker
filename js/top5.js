ListarTop5();

function ListarTop5() 
{
    var resultado = document.getElementById('resultado_top5');
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listartop5.php');
    ajax.onload = function () 
    {
        if (ajax.status == 200) 
        {
            var json = JSON.parse(ajax.responseText);
            var contenido = '<div class="grid-container">'; 
            json.forEach(function (item) 
            {
                contenido += '<div class="grid-item">';
                contenido += '<img src="../img/' + item.nombre + '.jpg" alt="' + item.nombre + '">';
                contenido += '<p class="movie-name">' + item.nombre + '</p>';
                contenido += '<p class="movie-info">' + item.genero + '</p>';
                contenido += '<p class="movie-info">Me Gustas: ' + item.cantidadmegustas + '</p>';
                contenido += '</div>';
            });
            contenido += '</div>'; 
            resultado.innerHTML = contenido;
        } 
        
        else 
        {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send();
}
