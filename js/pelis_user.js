// pelis_user.js

document.addEventListener("DOMContentLoaded", function() {
    // Al cargar la página, restaurar el estado de "Me gusta" desde el almacenamiento local
    restoreMeGustaState();
});

const buscar_peli = document.getElementById("buscar_peli");

buscar_peli.addEventListener("keyup", () => {
    const valor = buscar_peli.value.trim(); // Eliminar espacios en blanco al inicio y al final
    ListarPeli(valor);
});

function ListarPeli(valor, genero = '') {
    const resultado = document.getElementById('resultado_pelis');
    const formdata = new FormData();
    formdata.append('busqueda', valor);
    formdata.append('genero', genero);

    const ajax = new XMLHttpRequest();
    ajax.open('POST', '../listar/listarpelis.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            const json = JSON.parse(ajax.responseText);
            let contenido = '';
            let contador = 0;
            json.forEach(item => {
                if (contador % 5 === 0) {
                    contenido += '<div class="row">';
                }
                contenido += '<div class="col-md-2 col-lg-2 grid-item">';
                contenido += '<div class="movie-container">';
                contenido += `<img src="../img/${item.portada}.jpg" alt="${item.titulo}">`;
                contenido += '<div class="movie-info">';
                contenido += `<p class="movie-name">${item.titulo}</p>`;
                contenido += `<p>${item.genero}</p>`;
                contenido += `<p class="me-gusta" data-id="${item.id}" onclick="toggleMeGusta(this)">${item.me_gusta === 'SI' ? '<i class="bi bi-heart-fill"></i> Quitar de Me Gusta' : '<i class="bi bi-heart"></i> Me Gusta'}</p>`;
                contenido += '</div>';
                contenido += '</div>';
                contenido += '</div>';
                contador++;
                if (contador % 5 === 0) {
                    contenido += '</div>';
                }
            });
            resultado.innerHTML = contenido;
        } else {
            resultado.innerHTML = '<p>Error al cargar los datos.</p>';
        }
    };
    ajax.send(formdata);
}

function toggleMeGusta(elemento) {
    const idPelicula = elemento.dataset.id;
    console.log("ID de la película:", idPelicula);
    const esMeGusta = elemento.innerText.includes('Me Gusta');

    const formData = new FormData();
    formData.append('id', idPelicula);

    const ajax = new XMLHttpRequest();
    ajax.open('POST', '../validaciones/guardar_megusta.php');
    ajax.onload = function () {
        if (ajax.status == 200) {
            const respuesta = ajax.responseText;
            console.log(respuesta);
            
            // Cambiar la clase y el contenido del elemento
            if (esMeGusta) {
                elemento.innerHTML = '<i class="bi bi-heart"></i> Me Gusta'; // Cambia el ícono y el texto a "Me Gusta"
            } else {
                elemento.innerHTML = '<i class="bi bi-heart-fill"></i> Ya no me gusta'; // Cambia el ícono y el texto a "Ya no me gusta"
            }
            
            // Cambiar la clase del elemento para actualizar el estilo
            elemento.classList.toggle('me-gusta-activo');

            // Al hacer clic en "Me gusta", actualizar el estado en el almacenamiento local
            updateMeGustaState(idPelicula, !esMeGusta);
            
        } else {
            console.error('Error al procesar la solicitud.');
        }
    };
    ajax.send(formData);
}

function restoreMeGustaState() {
    // Obtener el estado de "Me gusta" del almacenamiento local
    const meGustaState = JSON.parse(localStorage.getItem('meGustaState')) || {};

    // Recorrer todos los elementos con la clase 'me-gusta'
    const meGustaElements = document.querySelectorAll('.me-gusta');
    meGustaElements.forEach(elemento => {
        const idPelicula = elemento.dataset.id;
        // Si el id de la película está en el estado de "Me gusta", actualizar su estado en la interfaz
        if (meGustaState[idPelicula]) {
            elemento.classList.add('me-gusta-activo');
            elemento.innerHTML = '<i class="bi bi-heart-fill"></i> Ya no me gusta';
        }
    });
}

function updateMeGustaState(idPelicula, meGusta) {
    // Obtener el estado actual de "Me gusta" del almacenamiento local
    const meGustaState = JSON.parse(localStorage.getItem('meGustaState')) || {};

    // Actualizar el estado de "Me gusta" para la película específica
    meGustaState[idPelicula] = meGusta;

    // Guardar el estado actualizado en el almacenamiento local
    localStorage.setItem('meGustaState', JSON.stringify(meGustaState));
}


function filtrarPorGenero() {
    const genero = document.getElementById('genero_peli').value;
    ListarPeli('', genero);
}
