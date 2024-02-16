function ListarTop5() {
    var carouselInner = document.querySelector('#carouselExampleControls .carousel-inner');
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listartop5.php');
    ajax.onload = function () {
        if (ajax.status === 200) {
            var json = JSON.parse(ajax.responseText);
            carouselInner.innerHTML = ''; // Limpiar contenido existente del carrusel
            json.forEach(function (item, index) {
                var carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active'); // Establecer la primera diapositiva como activa
                }
                var image = document.createElement('img');
                image.classList.add('d-block', 'w-100');
                image.src = '../img/' + item.portada + '.jpg';
                image.alt = item.titulo;
                carouselItem.appendChild(image);
    
                // Crear y agregar el título y la posición de la película
                var caption = document.createElement('div');
                caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
                caption.innerHTML = '<h5>' + item.titulo + '</h5><p>Top ' + item.posicion + '</p>';
                carouselItem.appendChild(caption);
    
                carouselInner.appendChild(carouselItem);
            });
        } else {
            carouselInner.innerHTML = '<div class="carousel-item active"><p>Error al cargar los datos.</p></div>';
        }
    };
    ajax.send(); // Enviar solicitud AJAX
}

// Llamar a la función para cargar el top 5 cuando se cargue la página
window.onload = function () {
    ListarTop5();
};
