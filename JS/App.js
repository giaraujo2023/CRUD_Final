let listaalumnos = [];

const objAlumno = {
    id:"",
    nombre:"",
    carrera:""

}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const carreraImput = document.querySelector('#carrera');
const btnAgregarImput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){ //funcion de validacion de formulario
    e.preventDefault();

    if(nombreImput.value === '' || carreraImput.vaule === '' ){ //si el formulario esta en blaco mandara un Alert.
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando){
        editarAlumno();
        editando = false;
    }else{
        objAlumno.id = Date.now();
        objAlumno.nombre = nombreImput.value;
        objAlumno.carrera = carreraImput.value;

        agregarAlumno();

    }
}

function agregarAlumno(){
    listaalumnos.push({...objAlumno});

    mostrarAlumnos();

    formulario.reset();

    limpiarObejeto();

}

function  limpiarObejeto(){
    objAlumno.id = '';
    objAlumno.nombre = '';
    objAlumno.carrera = ''; 

}

function mostrarAlumnos(){

    limpiarHTML();

    const divAlumnos = document.querySelector('.div-alumnos');

    listaalumnos.forEach(alumno => {
        const {id, nombre, carrera} = alumno;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${carrera} - `;
        parrafo.dataset.id = id;

        const  editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarAlumno(alumno);

        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const  eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarAlumno(id);

        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const  hr = document.createElement('hr');

        divAlumnos.appendChild(parrafo);
        divAlumnos.appendChild(hr);


    }
    );

}

function cargarAlumno(alumno){

    const {id, nombre, carrera} = alumno;

    nombreImput.value = nombre;
    carreraImput.value = carrera;

    objAlumno.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarAlumno(){

    objAlumno.nombre = nombreImput.value;
    objAlumno.carrera = carreraImput.value;

    listaalumnos.map(alumno => {

        if(alumno.id === objAlumno.id){
            alumno.id = objAlumno.id;
            alumno.nombre = objAlumno.nombre;
            alumno.carrera = objAlumno.carrera;

        }
    });

    limpiarHTML();
    mostrarAlumnos();

    formulario.reset();

    formulario.querySelector('button[type="submit"').textContent = 'Agregar';

    editando = false;

}

function eliminarAlumno(id){

    listaalumnos = listaalumnos.filter(alumno => alumno.id !== id);

    limpiarHTML();
    mostrarAlumnos();
    

}

function limpiarHTML(){
    const divAlumnos = document.querySelector('.div-alumnos');
    while(divAlumnos.firstChild){
        divAlumnos.removeChild(divAlumnos.firstChild);

    }
}

