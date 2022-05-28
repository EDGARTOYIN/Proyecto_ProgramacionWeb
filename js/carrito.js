const carrito = document.querySelector('.drop-carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contendor_Carrito = document.querySelector('#lista-carrito tbody');
const lista_de_cursos = document.querySelector('.courses-container');

let articulosCarrito = [];

Eventos();
function Eventos(){
    // Evento si compras un curso, lo agregara al carrito
    lista_de_cursos.addEventListener('click',agregarCurso);

    //eliminar cursos
    carrito.addEventListener('click',eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[];
        cleanHtml();
    })
}



function agregarCurso(e){
    if(e.target.classList.contains('btton')){
        const cursoSelected = e.target.parentElement.parentElement
        readContentCard(cursoSelected)
    }
    
}


// Obtener la informacion del curso(card) para que sea agregada al carrito
function readContentCard(curso){


    //se crea un object del curso actual
    const infoCurso = { 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.card_subtitle span').textContent,
        id:curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1

    }

    //Revisar si un elemento ya exsite en el carrito
    const existe = articulosCarrito.some(curso =>curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cant
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //va regresar el objeto actualizado
            }else{
                return curso; //este regresa el normal
            }
        })
        articulosCarrito = [...cursos];
    }else{
        //lo agregamos
        articulosCarrito =[...articulosCarrito,infoCurso];

    }

    //agregando al arreglo (carrito)


    console.log(articulosCarrito);

    carritoHTML();
}


function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso') ) {      
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id');
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}



//cargar el carrito en la pagina

function carritoHTML(){

    //clean
    cleanHtml();

    //Recorre el carrito y crea el html
    articulosCarrito.forEach( curso =>{

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>  
             <img src="${curso.imagen}" width="10">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad} </td>

        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
   `;


        //inyecta el html en con container del dropmenu del carrito
        contendor_Carrito.appendChild(row);

    })
}

function cleanHtml(){
    
    //mientras el contendor tenga un td
    while(contendor_Carrito.firstChild){
        contendor_Carrito.removeChild(contendor_Carrito.firstChild);
    }

}