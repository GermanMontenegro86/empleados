const nombre=document.querySelector("#nombre");
const apellido=document.querySelector("#apellido");
const btn=document.querySelector('#btn');
const formulario=document.querySelector('#formulario');
const total=document.querySelector('#total');
const sacar = document.getElementById("sacar");

let usuarios=[];

class Usuario{
    constructor(nombre,apellido){
        this.nombre=nombre;
        this.apellido=apellido;
    }
}

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}



function guardarUsiario(element){
    element.preventDefault();

    const nombre=document.querySelector('#nombre').value.toUpperCase();
    const apellido=document.querySelector('#apellido').value.toUpperCase();

    const nuevoUsuario=new Usuario(nombre,apellido);
    usuarios.push(nuevoUsuario);
    redenrizar(usuarios);
    guardarStorage("empleados", usuarios);
    resetear();

}

function redenrizar (array){

    const tbody=document.querySelector('tbody');

    tbody.innerHTML ='';

    array.forEach(({nombre,apellido})=> {

        const tr = document.createElement('tr');
        tr.innerHTML =
            `<td>${nombre}</td>
     <td>${apellido}</td>
     `
        tbody.appendChild(tr);
        
    });


}

function totalEmpleados(array){
    alert(array.length);
}

function resetear(){
    document.querySelector('#nombre').value='';
    document.querySelector('#apellido').value='';
}

function sacarEmpleado() {

   encontrar = document.getElementsByName("prod")[0].value.toUpperCase();

    const index = usuarios.findIndex(x => x.apellido === encontrar);
    if(index >= 0 ){
        usuarios.splice(index, 1);
        guardarStorage("empleados", usuarios);

      
    }
}

formulario.addEventListener('submit', guardarUsiario);

total.addEventListener('click',()=>{
    totalEmpleados(usuarios);
})

sacar.addEventListener("click", () => {
    sacarEmpleado();
    document.location.reload();

})

if (recuperarStorage("empleados")) {
    usuarios= recuperarStorage("empleados");
    redenrizar(usuarios);
}



