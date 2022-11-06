let res = document.querySelector('#res');

res.addEventListener('afterprint', traerDatos());

function traerDatos() {
    
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'productos.json', true);

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
                res.innerHTML += `
                <div class="carta-producto">
                    <img class="prod-img" src="${item.imagen}">
                    <div class="text">
                        <p class="prod-nombre">${item.nombre}</p>
                        <p class = "prod-descripcion">${item.descripcion}</p>
                        <p class="precio">$ ${item.precio}</p>
                    </div> 
                </div>
                `
            }
            
        }
    }
}

