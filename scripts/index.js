let res = document.querySelector('#res');

res.addEventListener('afterprint', traerDatos());

function traerDatos() {
    
    const xhttp = new XMLHttpRequest();
    // ruta para github --> ' ../data/productos.json'
    xhttp.open('GET', '/catalogo-productos/data/productos.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function (){

        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            res.innerHTML = '<h3 id="cortesespeciales">Cortes Especiales</h3>';
            let titulo = 'Cortes Especiales';
            let identificador;
            
            for(let item of datos){
                
                if(titulo != item.tipo){
                    titulo = item.tipo
                    identificador = titulo.toLowerCase().split(" ").join("");
                    res.innerHTML += `<h3 id="${identificador}">${titulo}</h3>`
                }
                res.innerHTML += construirProducto(item);
            }
            
        }
    }
}

function construirProducto(datos) {
      if(datos.nuevo) {
          var cuerpo = `<div class="carta-producto">
                            <p class="nuevo-cartel">NUEVO!</p>
                            <img class="prod-img" src="${datos.urlImagen}">
                                <div class="text">
                                    <p class="prod-nombre">${datos.nombre}</p>
                                    <p class = "prod-descripcion">${datos.descripcion}</p>
                                </div> 
                        </div>`
      } else if(!datos.nuevo){
          var cuerpo = `<div class="carta-producto">
                            <img class="prod-img" src="${datos.imagen}">
                            <div class="text">
                                <p class="prod-nombre">${datos.nombre}</p>
                                <p class = "prod-descripcion">${datos.descripcion}</p>
                                <p class="precio">$ ${datos.precio}</p>
                            </div> 
                        </div>`
      }
    return cuerpo;    
}
